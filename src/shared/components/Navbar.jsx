import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('jwt');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  const isPublicPage = ['/'].includes(location.pathname);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          🔐 TRINETRA
        </Link>

        {isPublicPage && !isLoggedIn && (
          <ul className="navbar-nav">
            <li><a href="#about" className="navbar-link">About</a></li>
            <li><a href="#features" className="navbar-link">Features</a></li>
            <li><a href="#how-it-works" className="navbar-link">How It Works</a></li>
            <li><a href="#security" className="navbar-link">Security</a></li>
            <li><Link to="/login" className="navbar-link">Login</Link></li>
            <li><Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link></li>
          </ul>
        )}

        {isLoggedIn && (
          <ul className="navbar-nav">
            <li>
              {userRole === 'ADMIN' ? (
                <Link to="/admin-dashboard" className="navbar-link">Dashboard</Link>
              ) : (
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              )}
            </li>
            <li><span className="navbar-link" style={{ color: 'var(--text-muted)' }}>({userRole})</span></li>
            <li><button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button></li>
          </ul>
        )}
      </div>
    </nav>
  );
}
