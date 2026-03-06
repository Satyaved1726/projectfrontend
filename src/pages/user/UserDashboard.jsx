import React, { useState, useEffect } from 'react';
import UserLayout from '../../shared/layouts/UserLayout';
import api from '../../api';
import './UserDashboard.css';

export default function UserDashboard() {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    averageResponseTime: '2-3 days'
  });
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await api.get(`/user/dashboard/${userId}`);
      setStats(response.data.stats);
      setRecentReports(response.data.recentReports);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      // Mock data for demo
      setStats({
        totalReports: 5,
        pendingReports: 2,
        resolvedReports: 3,
        averageResponseTime: '2-3 days'
      });
      setRecentReports([
        { id: 1, title: 'Workplace Safety Issue', status: 'Investigating', date: '2026-03-05' },
        { id: 2, title: 'Team Conflict Report', status: 'Resolved', date: '2026-02-28' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="dashboard-container">
        <div className="page-header">
          <h1>Welcome Back!</h1>
          <p>Here's your reporting activity overview</p>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon">📊</div>
            <div className="kpi-content">
              <h3>{stats.totalReports}</h3>
              <p>Total Reports</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon">⏳</div>
            <div className="kpi-content">
              <h3>{stats.pendingReports}</h3>
              <p>Pending Review</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon">✅</div>
            <div className="kpi-content">
              <h3>{stats.resolvedReports}</h3>
              <p>Resolved</p>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon">⏱️</div>
            <div className="kpi-content">
              <h3>{stats.averageResponseTime}</h3>
              <p>Avg Response Time</p>
            </div>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Reports</h2>
            <a href="/my-reports" className="view-all-link">View All →</a>
          </div>

          {recentReports.length > 0 ? (
            <div className="reports-list">
              {recentReports.map(report => (
                <div key={report.id} className="report-item">
                  <div className="report-info">
                    <h4>{report.title}</h4>
                    <p className="report-date">Submitted: {new Date(report.date).toLocaleDateString()}</p>
                  </div>
                  <div className="report-status">
                    <span className={`badge badge-${report.status === 'Resolved' ? 'success' : 'pending'}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No reports yet</p>
              <a href="/submit-report" className="btn btn-primary">Submit Your First Report</a>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/submit-report" className="action-button">
              <span className="action-icon">📝</span>
              <div>
                <h4>Submit New Report</h4>
                <p>Report a workplace issue anonymously</p>
              </div>
            </a>
            <a href="/track-report" className="action-button">
              <span className="action-icon">🔍</span>
              <div>
                <h4>Track Your Report</h4>
                <p>Check status using tracking token</p>
              </div>
            </a>
            <a href="/my-reports" className="action-button">
              <span className="action-icon">📋</span>
              <div>
                <h4>View All Reports</h4>
                <p>See your complete report history</p>
              </div>
            </a>
          </div>
        </div>

        {/* Info Section */}
        <div className="dashboard-section info-section">
          <h3>💡 Did You Know?</h3>
          <p>Your anonymity is our priority. We never share your personal information with anyone, including administrators. 
          Only a unique tracking token connects you to your report, and you control when to use it for status updates.</p>
        </div>
      </div>
    </UserLayout>
  );
}
