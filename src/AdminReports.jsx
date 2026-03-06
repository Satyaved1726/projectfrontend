import React, { useEffect, useState } from "react";
import api from "./api";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, report: null });
  const [statusUpdate, setStatusUpdate] = useState("");
  const [responseText, setResponseText] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const resp = await api.get("/admin/reports");
      setReports(resp.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const openModal = (report) => {
    setModal({ open: true, report });
    setStatusUpdate(report.status);
    setResponseText(report.adminResponse || "");
  };
  const closeModal = () => setModal({ open: false, report: null });

  const handleStatusChange = async () => {
    const id = modal.report.id;
    try {
      await api.put(`/admin/report/${id}/status`, { status: statusUpdate });
      closeModal();
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResponseSave = async () => {
    const id = modal.report.id;
    try {
      await api.put(`/admin/report/${id}/response`, { adminResponse: responseText });
      closeModal();
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <AdminSidebar />
      <main className="admin-content">
        <div className="container">
          <h2 className="title">Manage Reports</h2>
        {loading ? (
          <p className="subtitle">Loading…</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "rgba(255,255,255,0.75)",
                borderRadius: "12px",
              }}
            >
              <thead>
                <tr>
                  {[
                    "Token",
                    "Title",
                    "Category",
                    "Severity",
                    "Status",
                    "Created Date",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        borderBottom: "1px solid #d0d8e3",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td style={{ padding: "0.75rem" }}>{r.token}</td>
                    <td style={{ padding: "0.75rem" }}>{r.title}</td>
                    <td style={{ padding: "0.75rem" }}>{r.category}</td>
                    <td style={{ padding: "0.75rem" }}>{r.severity}</td>
                    <td style={{ padding: "0.75rem" }}>{r.status}</td>
                    <td style={{ padding: "0.75rem" }}>
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td style={{ padding: "0.75rem", whiteSpace: "nowrap" }}>
                      <button
                        className="card-btn"
                        style={{ marginRight: "0.5rem" }}
                        onClick={() => openModal(r)}
                      >
                        View
                      </button>
                      <button
                        className="card-btn"
                        style={{ marginRight: "0.5rem" }}
                        onClick={() => openModal(r)}
                      >
                        Update Status
                      </button>
                      <button
                        className="card-btn"
                        onClick={() => openModal(r)}
                      >
                        Add Response
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </main>

      {modal.open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              width: "90%",
              maxWidth: "600px",
              padding: "2rem",
              boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
            }}
          >
            <h3>{modal.report.title}</h3>
            <p>Category: {modal.report.category}</p>
            <p>Severity: {modal.report.severity}</p>
            <p>Description: {modal.report.description}</p>
            <p>Status: {modal.report.status}</p>
            <p>Admin Response: {modal.report.adminResponse || "(none)"}</p>

            <div className="field-group">
              <label className="lbl">Change status</label>
              <select
                className="inp"
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
              >
                <option>Pending</option>
                <option>Investigating</option>
                <option>Resolved</option>
              </select>
              <button
                className="card-btn"
                style={{ marginTop: "0.75rem" }}
                onClick={handleStatusChange}
              >
                Save Status
              </button>
            </div>

            <div className="field-group" style={{ marginTop: "1rem" }}>
              <label className="lbl">Admin response</label>
              <textarea
                className="inp"
                rows={3}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
              <button
                className="card-btn"
                style={{ marginTop: "0.75rem" }}
                onClick={handleResponseSave}
              >
                Save Response
              </button>
            </div>

            <button
              className="card-btn"
              style={{ marginTop: "1rem", background: "#ccc", color: "#333" }}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
