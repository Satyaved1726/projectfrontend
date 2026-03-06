import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout({ children }) {
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
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">🔐 TRINETRA</div>
          <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Admin Portal</small>
        </div>

        <nav>
          <ul className="sidebar-nav">
            <li className="nav-section">
              <span className="nav-section-label">MANAGEMENT</span>
            </li>
            <li>
              <Link
                to="/admin-dashboard"
                className={`sidebar-link ${isActive('/admin-dashboard') ? 'active' : ''}`}
              >
                <span>📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className={`sidebar-link ${isActive('/admin/reports') ? 'active' : ''}`}
              >
                <span>📋</span>
                <span>All Reports</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/assign"
                className={`sidebar-link ${isActive('/admin/assign') ? 'active' : ''}`}
              >
                <span>🏢</span>
                <span>Assign Department</span>
              </Link>
            </li>

            <li className="nav-section">
              <span className="nav-section-label">INSIGHTS</span>
            </li>
            <li>
              <Link
                to="/admin/analytics"
                className={`sidebar-link ${isActive('/admin/analytics') ? 'active' : ''}`}
              >
                <span>📈</span>
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/audit-logs"
                className={`sidebar-link ${isActive('/admin/audit-logs') ? 'active' : ''}`}
              >
                <span>📜</span>
                <span>Audit Logs</span>
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

      <main className="main-content admin-content">
        {children}
      </main>
    </div>
  );
}
