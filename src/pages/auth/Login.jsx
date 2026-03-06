import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import api from '../../api';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, role } = response.data;
      
      localStorage.setItem('jwt', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', response.data.userId);

      // Redirect based on role
      if (role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
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
              Don't have an account? <a href="/signup" className="auth-link">Sign up</a>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <a href="/track-report" className="auth-link">Track existing report?</a>
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
