import React, { useEffect, useState } from "react";
import api from "./api";
import AdminNotifications from "./components/AdminNotifications";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const resp = await api.get("/admin/reports");
        setReports(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "Pending").length,
    investigating: reports.filter((r) => r.status === "Investigating").length,
    resolved: reports.filter((r) => r.status === "Resolved").length,
  };

  const navigate = useNavigate();

  return (
    <div className="page">
      <AdminSidebar />
      <main className="admin-content">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <h2 className="title">Admin Dashboard</h2>
            <AdminNotifications />
          </div>
        {loading ? (
          <p className="subtitle">Loading reports…</p>
        ) : stats.total === 0 ? (
          <p className="subtitle">No reports available.</p>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Total Reports", value: stats.total },
                { label: "Pending", value: stats.pending },
                { label: "Investigating", value: stats.investigating },
                { label: "Resolved", value: stats.resolved },
              ].map((card) => (
                <div
                  key={card.label}
                  style={{
                    flex: "1 1 180px",
                    background: "rgba(255,255,255,0.75)",
                    borderRadius: "16px",
                    padding: "1rem 1.5rem",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ fontSize: "0.85rem", color: "#6080a0" }}>
                    {card.label}
                  </p>
                  <p style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

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
                      "Assigned Department",
                      "Created Date",
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
                    <tr key={r.token}>
                      <td style={{ padding: "0.75rem" }}>{r.token}</td>
                      <td
                        style={{ padding: "0.75rem", cursor: "pointer", color: "#2a7abf" }}
                        onClick={() => navigate(`/admin/report/${r.id}`)}
                      >
                        {r.title}
                      </td>
                      <td style={{ padding: "0.75rem" }}>{r.category}</td>
                      <td style={{ padding: "0.75rem" }}>{r.severity}</td>
                      <td style={{ padding: "0.75rem" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "0.75rem",
                            background:
                              r.assignedDepartment === "HR"
                                ? "#5aaae8"
                                : r.assignedDepartment === "Compliance"
                                ? "#9c27b0"
                                : "#757575",
                          }}
                        >
                          {r.assignedDepartment || "-"}
                        </span>
                      </td>
                      <td style={{ padding: "0.75rem" }}>{r.status}</td>
                      <td style={{ padding: "0.75rem" }}>
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      </main>
    </div>
  );
}