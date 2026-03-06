import React, { useState } from "react";
import api from "./api";

export default function TrackReport() {
  const [token, setToken] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookup = async (e) => {
    e.preventDefault();
    setError(null);
    setReport(null);
    setLoading(true);
    try {
      const resp = await api.get(`/report/${encodeURIComponent(token)}`);
      setReport(resp.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Report not found. Please check your tracking token.");
      } else {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStatusBadge = (status) => {
    let color = "#f0a040"; // yellow
    if (status === "Investigating") color = "#5aaae8";
    if (status === "Resolved") color = "#48d88a";
    return (
      <span
        style={{
          background: color,
          color: "#fff",
          borderRadius: "12px",
          padding: "0.25rem 0.75rem",
          fontWeight: 700,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left-col">
          <h2 className="title">Track Your Report</h2>
          <form className="form" onSubmit={lookup}>
            <div className="field-group">
              <label className="lbl">Tracking Token</label>
              <input
                className="inp"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="card-btn" type="submit" disabled={loading}>
              {loading ? "Checking…" : "Check Status"}
            </button>
          </form>

          {report && (
            <div className="field-group" style={{ marginTop: "2rem" }}>
              <h3>{report.title}</h3>
              <p>Category: {report.category}</p>
              <p>Severity: {report.severity}</p>
              <p>
                Status: {renderStatusBadge(report.status)}
              </p>
              <p>Created: {new Date(report.createdAt).toLocaleString()}</p>
              {report.adminResponse && (
                <p>Admin Response: {report.adminResponse}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}