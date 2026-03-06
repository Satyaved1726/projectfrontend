import React from "react";
import API_BASE_URL from "./config/api";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminExport() {
  const download = (type) => {
    const url = `${API_BASE_URL}/api/admin/export/${type}`;
    // simply navigate to url to trigger download
    window.location.href = url;
  };

  return (
    <div className="page">
      <AdminSidebar />
      <main className="admin-content">
        <div className="container">
          <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.75)",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2 className="title">Export Reports</h2>
          <p className="subtitle">
            Download report data for compliance audits and investigations.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1.5rem" }}>
            <button className="card-btn" onClick={() => download("csv")}>Download CSV</button>
            <button classity="card-btn" onClick={() => download("pdf")}>Download PDF</button>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}
