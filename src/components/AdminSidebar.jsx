import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => setCollapsed((c) => !c);

  const linkStyle = (path) => ({
    display: "block",
    padding: "0.75rem 1rem",
    color: location.pathname === path ? "#5aaae8" : "#fff",
    textDecoration: "none",
    background: location.pathname === path ? "rgba(255,255,255,0.1)" : "transparent",
  });

  if (collapsed) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
        <button
          onClick={toggle}
          style={{
            background: "#333",
            color: "#fff",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "220px",
        background: "#222",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "1rem",
        zIndex: 1000,
      }}
    >
      <div>
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "1rem" }}>
          TRINETRA Admin
        </h2>
        <nav>
          <Link to="/admin/dashboard" style={linkStyle("/admin/dashboard")}>Dashboard</Link>
          <Link to="/admin/complaints" style={linkStyle("/admin/complaints")}>Manage Reports</Link>
          <Link to="/admin/analytics" style={linkStyle("/admin/analytics")}>Analytics</Link>
          <Link to="/admin/export" style={linkStyle("/admin/export")}>Export Reports</Link>
        </nav>
      </div>
      <div style={{ padding: "1rem" }}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/admin-login";
          }}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#5aaae8",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
