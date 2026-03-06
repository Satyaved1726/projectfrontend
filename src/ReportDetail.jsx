import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import AdminSidebar from "./components/AdminSidebar";

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const resp = await api.get(`/admin/report/${id}`);
        setReport(resp.data);
        setStatus(resp.data.status);
        setResponse(resp.data.adminResponse || "");
      } catch (err) {
        setError("Unable to load report");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

  const saveStatus = async () => {
    try {
      await api.put(`/admin/report/${id}/status`, { status });
      setReport((r) => ({ ...r, status }));
    } catch (err) {
      console.error(err);
    }
  };
  const saveResponse = async () => {
    try {
      await api.put(`/admin/report/${id}/response`, { adminResponse: response });
      setReport((r) => ({ ...r, adminResponse: response }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <AdminSidebar />
        <main className="admin-content">
          <div className="container">
            <p className="subtitle">Loading report…</p>
          </div>
        </main>
      </div>
    );
  }
  if (error) {
    return (
      <div className="page">
        <AdminSidebar />
        <main className="admin-content">
          <div className="container">
            <p className="subtitle">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <AdminSidebar />
      <main className="admin-content">
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2 className="title">Report Investigation</h2>
          <div style={{ marginBottom: "1.5rem" }}>
            <p>
              <strong>Token:</strong> {report.token}
            </p>
            <p>
              <strong>Title:</strong> {report.title}
            </p>
            <p>
              <strong>Category:</strong> {report.category}
            </p>
            <p>
              <strong>Severity:</strong> {report.severity}
            </p>
            <p>
              <strong>Assigned Department:</strong> {report.assignedDepartment || "-"}
            </p>
            <p>
              <strong>Status:</strong> {report.status}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(report.createdAt).toLocaleString()}
            </p>
            <p style={{ marginTop: "1rem" }}>
              <strong>Description:</strong>
            </p>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
              {report.description}
            </p>
            <p style={{ marginTop: "1rem" }}>
              <strong>Admin Response:</strong>
            </p>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
              {report.adminResponse || "(none)"}
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid #d0d8e3",
              paddingTop: "1.5rem",
            }}
          >
            <h3>Actions</h3>
            <div className="field-group">
              <label className="lbl">Update Status</label>
              <select
                className="inp"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>Investigating</option>
                <option>Resolved</option>
              </select>
              <button
                className="card-btn"
                style={{ marginTop: "0.75rem" }}
                onClick={saveStatus}
              >
                Save Status
              </button>
            </div>

            <div className="field-group" style={{ marginTop: "1.5rem" }}>
              <label className="lbl">Add Admin Response</label>
              <textarea
                className="inp"
                rows={4}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <button
                className="card-btn"
                style={{ marginTop: "0.75rem" }}
                onClick={saveResponse}
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
