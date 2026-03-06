import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../shared/layouts/AdminLayout';
import api from '../../api';
import './AdminReports.css';

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [responseText, setResponseText] = useState('');

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/reports?status=${filter}`);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Mock data for demo
      setReports([
        { id: 1, title: 'Harassment Incident', category: 'Harassment', severity: 'High', status: 'Pending', submittedDate: '2026-03-06', token: 'TRN-2026-001' },
        { id: 2, title: 'Safety Concern', category: 'Safety', severity: 'Medium', status: 'Investigating', submittedDate: '2026-03-05', token: 'TRN-2026-002' },
        { id: 3, title: 'Ethical Violation', category: 'Corruption', severity: 'Critical', status: 'Pending', submittedDate: '2026-03-04', token: 'TRN-2026-003' },
        { id: 4, title: 'Workplace Dispute', category: 'Other', severity: 'Low', status: 'Investigating', submittedDate: '2026-03-03', token: 'TRN-2026-004' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'info';
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

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await api.put(`/admin/report/${reportId}/status`, { status: newStatus });
      fetchReports();
      alert('Status updated successfully');
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  const handleAddResponse = async (reportId) => {
    if (!responseText.trim()) {
      alert('Please enter a response');
      return;
    }

    try {
      await api.put(`/admin/report/${reportId}/response`, { response: responseText });
      setResponseText('');
      setSelectedReport(null);
      fetchReports();
      alert('Response added successfully');
    } catch (error) {
      alert('Error adding response: ' + error.message);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading reports...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="reports-container">
        <div className="page-header">
          <h1>Report Management</h1>
          <p>Review and manage all submitted reports</p>
        </div>

        {/* Filters */}
        <div className="reports-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Reports
          </button>
          <button
            className={`filter-btn ${filter === 'Pending' ? 'active' : ''}`}
            onClick={() => setFilter('Pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'Investigating' ? 'active' : ''}`}
            onClick={() => setFilter('Investigating')}
          >
            Investigating
          </button>
          <button
            className={`filter-btn ${filter === 'Resolved' ? 'active' : ''}`}
            onClick={() => setFilter('Resolved')}
          >
            Resolved
          </button>
        </div>

        {/* Reports Grid */}
        {reports.length > 0 ? (
          <div className="reports-grid">
            {reports.map(report => (
              <div key={report.id} className={`report-card status-${report.status.toLowerCase()}`}>
                <div className="report-header">
                  <h3>{report.title}</h3>
                  <span className={`badge badge-${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>

                <div className="report-details">
                  <div className="detail-item">
                    <span className="label">Category:</span>
                    <span className="value">{report.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Severity:</span>
                    <span className={`badge badge-${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Token:</span>
                    <code>{report.token}</code>
                  </div>
                  <div className="detail-item">
                    <span className="label">Submitted:</span>
                    <span className="value">{new Date(report.submittedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="report-actions">
                  <select
                    className="form-select"
                    value={report.status}
                    onChange={(e) => handleStatusUpdate(report.id, e.target.value)}
                    style={{ marginBottom: '0.75rem' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                  >
                    {selectedReport?.id === report.id ? 'Close' : 'Add Response'}
                  </button>
                </div>

                {selectedReport?.id === report.id && (
                  <div className="response-form">
                    <textarea
                      className="form-textarea"
                      placeholder="Enter your response (will be sent to reporter with anonymity maintained)..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={4}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddResponse(report.id)}
                    >
                      Submit Response
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No reports found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
