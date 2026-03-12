import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import api from '../../api';
import { logError, logInfo, logDebug } from '../../utils/logger';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    logInfo('LOGIN_PAGE', 'Login page loaded');
    
    // Check if user is already logged in
    const token = localStorage.getItem('jwt');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole === 'ADMIN') {
      logDebug('LOGIN_PAGE', 'User already logged in, redirecting to admin dashboard');
      navigate('/admin-dashboard');
    }

    return () => {
      logDebug('LOGIN_PAGE', 'Login page unmounted');
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    logDebug('LOGIN_PAGE', 'Login form submitted', { email });
    
    // Validate inputs
    if (!email.trim()) {
      const errorMsg = 'Email is required';
      logError('LOGIN_PAGE', new Error(errorMsg), { field: 'email' });
      setError(errorMsg);
      return;
    }

    if (!password) {
      const errorMsg = 'Password is required';
      logError('LOGIN_PAGE', new Error(errorMsg), { field: 'password' });
      setError(errorMsg);
      return;
    }

    if (!email.includes('@')) {
      const errorMsg = 'Please enter a valid email address';
      logError('LOGIN_PAGE', new Error(errorMsg), { field: 'email', value: email });
      setError(errorMsg);
      return;
    }

    setError('');
    setLoading(true);
    
    logInfo('LOGIN_PAGE', 'Attempting authentication', { email, role: 'ADMIN' });

    try {
      logDebug('LOGIN_PAGE', 'Sending login request', { email });
      
      const response = await api.post('/auth/login', { email, password, role: 'ADMIN' });
      const { token, role } = response.data;
      
      logDebug('LOGIN_PAGE', 'Login response received', { role, userId: response.data?.userId });
      
      // Verify that only ADMIN role can login
      if (role !== 'ADMIN') {
        const errorMsg = 'Only administrators can login here. Employees should use the track report feature.';
        logError('LOGIN_PAGE', new Error(errorMsg), { 
          receivedRole: role, 
          expectedRole: 'ADMIN' 
        });
        setError(errorMsg);
        setLoading(false);
        return;
      }
      
      try {
        localStorage.setItem('jwt', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', response.data.userId);
        
        logInfo('LOGIN_PAGE', 'Login successful and token stored', { 
          userId: response.data.userId, 
          role 
        });
      } catch (storageError) {
        logError('LOGIN_PAGE', storageError, { 
          errorType: 'STORAGE_ERROR',
          context: 'Failed to store login token in localStorage'
        });
        setError('Failed to save session. Please check browser storage settings.');
        setLoading(false);
        return;
      }

      navigate('/admin-dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Only administrators can access this page.';
      
      logError('LOGIN_PAGE', err, {
        errorType: 'LOGIN_FAILED',
        email,
        statusCode: err.response?.status,
        responseData: err.response?.data,
        errorMessage,
        isNetworkError: !err.response
      });
      
      setError(errorMessage);
    } finally {
      setLoading(false);
      logDebug('LOGIN_PAGE', 'Login attempt completed');
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Administrator Login</h2>
            <p>Enter your credentials to continue.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              <a href="/track-report" className="auth-link">Track report as employee</a>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <a href="/signup" className="auth-link">Register as employee</a>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <h3>Welcome to TRINETRA</h3>
          <p>Secure anonymous workplace reporting system for modern organizations.</p>
          <ul>
            <li>✓ Complete anonymity protected</li>
            <li>✓ Enterprise-grade security</li>
            <li>✓ Real-time analytics</li>
            <li>✓ 24/7 access & support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
