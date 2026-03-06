import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './UserLayout.css';

export default function UserLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout-with-sidebar">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">🔐 TRINETRA</div>
          <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>User Portal</small>
        </div>

        <nav>
          <ul className="sidebar-nav">
            <li>
              <Link
                to="/dashboard"
                className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                <span>📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/submit-report"
                className={`sidebar-link ${isActive('/submit-report') ? 'active' : ''}`}
              >
                <span>📝</span>
                <span>Submit Report</span>
              </Link>
            </li>
            <li>
              <Link
                to="/track-report"
                className={`sidebar-link ${isActive('/track-report') ? 'active' : ''}`}
              >
                <span>🔍</span>
                <span>Track Report</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-reports"
                className={`sidebar-link ${isActive('/my-reports') ? 'active' : ''}`}
              >
                <span>📋</span>
                <span>My Reports</span>
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className={`sidebar-link ${isActive('/notifications') ? 'active' : ''}`}
              >
                <span>🔔</span>
                <span>Notifications</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`sidebar-link ${isActive('/profile') ? 'active' : ''}`}
              >
                <span>👤</span>
                <span>Profile</span>
              </Link>
            </li>
            <li style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
              <button
                onClick={handleLogout}
                className="sidebar-link"
                style={{ width: '100%', textAlign: 'left', background: 'none' }}
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
