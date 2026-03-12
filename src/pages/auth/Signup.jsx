import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import api from '../../api';
import { logError, logInfo, logDebug } from '../../utils/logger';
import './Auth.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    logInfo('SIGNUP_PAGE', 'Signup page loaded');
    
    // Check if user is already logged in
    const token = localStorage.getItem('jwt');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole === 'EMPLOYEE') {
      logDebug('SIGNUP_PAGE', 'User already logged in, redirecting to dashboard');
      navigate('/dashboard');
    }

    return () => {
      logDebug('SIGNUP_PAGE', 'Signup page unmounted');
    };
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    logDebug('SIGNUP_PAGE', 'Signup form submitted', { email: formData.email, name: formData.name });

    // Validation: Check for empty fields
    if (!formData.name.trim()) {
      const errorMsg = 'Full name is required';
      logError('SIGNUP_PAGE', new Error(errorMsg), { field: 'name' });
      setError(errorMsg);
      return;
    }

    if (!formData.email.trim()) {
      const errorMsg = 'Email is required';
      logError('SIGNUP_PAGE', new Error(errorMsg), { field: 'email' });
      setError(errorMsg);
      return;
    }

    if (!formData.email.includes('@')) {
      const errorMsg = 'Please enter a valid email address';
      logError('SIGNUP_PAGE', new Error(errorMsg), { field: 'email', value: formData.email });
      setError(errorMsg);
      return;
    }

    if (!formData.password) {
      const errorMsg = 'Password is required';
      logError('SIGNUP_PAGE', new Error(errorMsg), { field: 'password' });
      setError(errorMsg);
      return;
    }

    if (!formData.confirmPassword) {
      const errorMsg = 'Please confirm your password';
      logError('SIGNUP_PAGE', new Error(errorMsg), { field: 'confirmPassword' });
      setError(errorMsg);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const errorMsg = 'Passwords do not match';
      logError('SIGNUP_PAGE', new Error(errorMsg), { 
        field: 'passwordMatch',
        passwordLength: formData.password.length,
        confirmPasswordLength: formData.confirmPassword.length
      });
      setError(errorMsg);
      return;
    }

    if (formData.password.length < 6) {
      const errorMsg = 'Password must be at least 6 characters';
      logError('SIGNUP_PAGE', new Error(errorMsg), { 
        field: 'passwordLength',
        providedLength: formData.password.length,
        minRequired: 6
      });
      setError(errorMsg);
      return;
    }

    setLoading(true);
    
    logInfo('SIGNUP_PAGE', 'Starting signup process', { 
      email: formData.email, 
      name: formData.name,
      role: 'EMPLOYEE'
    });

    try {
      logDebug('SIGNUP_PAGE', 'Sending signup request to server');
      
      const response = await api.post('/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'EMPLOYEE'
      });

      logDebug('SIGNUP_PAGE', 'Signup response received', { 
        userId: response.data?.userId,
        role: response.data?.role 
      });

      const { token, role } = response.data;
      
      if (!token) {
        const errorMsg = 'No authentication token received from server';
        logError('SIGNUP_PAGE', new Error(errorMsg), { 
          errorType: 'MISSING_TOKEN',
          responseData: response.data
        });
        setError('Signup failed: No authentication token received. Please try again.');
        setLoading(false);
        return;
      }

      try {
        localStorage.setItem('jwt', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', response.data.userId);
        
        logInfo('SIGNUP_PAGE', 'Signup successful and credentials stored', { 
          userId: response.data.userId, 
          role 
        });
      } catch (storageError) {
        logError('SIGNUP_PAGE', storageError, { 
          errorType: 'STORAGE_ERROR',
          context: 'Failed to store signup token in localStorage'
        });
        setError('Failed to save session. Please check browser storage settings.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      logInfo('SIGNUP_PAGE', 'Signup successful, redirecting to dashboard');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      
      logError('SIGNUP_PAGE', err, {
        errorType: 'SIGNUP_FAILED',
        email: formData.email,
        statusCode: err.response?.status,
        responseData: err.response?.data,
        errorMessage,
        isNetworkError: !err.response,
        requestPath: '/auth/signup'
      });
      
      setError(errorMessage);
    } finally {
      setLoading(false);
      logDebug('SIGNUP_PAGE', 'Signup attempt completed');
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Employee Registration</h2>
            <p>Sign up to submit and track reports securely.</p>
          </div>

          {success && <div className="alert alert-success">Account created successfully! Redirecting...</div>}
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
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
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <a href="/login" className="auth-link">Log in as Administrator</a>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <h3>Why Choose TRINETRA?</h3>
          <p>The most secure workplace reporting platform.</p>
          <ul>
            <li>✓ Complete anonymity guaranteed</li>
            <li>✓ Zero personal data collection</li>
            <li>✓ Military-grade encryption</li>
            <li>✓ Instant tracking support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
