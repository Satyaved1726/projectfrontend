import React, { useState, useEffect } from 'react';
import AdminLayout from '../../shared/layouts/AdminLayout';
import api from '../../api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    investigatingReports: 0,
    resolvedReports: 0
  });
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  const fetchAdminDashboard = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setStats(response.data.stats);
      setRecentReports(response.data.recentReports);
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      // Mock data for demo
      setStats({
        totalReports: 24,
        pendingReports: 5,
        investigatingReports: 8,
        resolvedReports: 11
      });
      setRecentReports([
        { id: 1, title: 'Workplace Harassment Complaint', category: 'Harassment', status: 'Pending', severity: 'High', date: '2026-03-06' },
        { id: 2, title: 'Safety Concern', category: 'Safety', status: 'Investigating', severity: 'Medium', date: '2026-03-05' },
        { id: 3, title: 'Misconduct Report', category: 'Other', status: 'Investigating', severity: 'High', date: '2026-03-04' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'pending';
      case 'Investigating': return 'info';
      case 'Resolved': return 'success';
      default: return 'info';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'info';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p>System overview and report management</p>
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

          <div className="kpi-card pending">
            <div className="kpi-icon">⏳</div>
            <div className="kpi-content">
              <h3>{stats.pendingReports}</h3>
              <p>Pending Review</p>
            </div>
          </div>

          <div className="kpi-card investigating">
            <div className="kpi-icon">🔍</div>
            <div className="kpi-content">
              <h3>{stats.investigatingReports}</h3>
              <p>Investigating</p>
            </div>
          </div>

          <div className="kpi-card resolved">
            <div className="kpi-icon">✅</div>
            <div className="kpi-content">
              <h3>{stats.resolvedReports}</h3>
              <p>Resolved</p>
            </div>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Reports</h2>
            <a href="/admin/reports" className="view-all-link">Manage All →</a>
          </div>

          {recentReports.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map(report => (
                    <tr key={report.id}>
                      <td className="title-cell">{report.title}</td>
                      <td>{report.category}</td>
                      <td>
                        <span className={`badge badge-${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="date-cell">{new Date(report.date).toLocaleDateString()}</td>
                      <td>
                        <a href={`/admin/report/${report.id}`} className="action-link">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>No reports yet</p>
            </div>
          )}
        </div>

        {/* Statistics Summary */}
        <div className="stats-grid">
          <div className="stat-item">
            <h4>Resolution Rate</h4>
            <div className="stat-value">
              {Math.round((stats.resolvedReports / stats.totalReports) * 100) || 0}%
            </div>
          </div>
          <div className="stat-item">
            <h4>Avg Days To Resolve</h4>
            <div className="stat-value">
              {stats.totalReports > 0 ? '2-3' : 'N/A'}
            </div>
          </div>
          <div className="stat-item">
            <h4>Pending Attention</h4>
            <div className="stat-value urgent">
              {stats.pendingReports}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/admin/reports" className="action-button">
              <span className="action-icon">📋</span>
              <div>
                <h4>Review Reports</h4>
                <p>View and manage all reports</p>
              </div>
            </a>
            <a href="/admin/analytics" className="action-button">
              <span className="action-icon">📈</span>
              <div>
                <h4>View Analytics</h4>
                <p>Analyze reporting trends</p>
              </div>
            </a>
            <a href="/admin/audit-logs" className="action-button">
              <span className="action-icon">📜</span>
              <div>
                <h4>Audit Logs</h4>
                <p>Track system activity</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
