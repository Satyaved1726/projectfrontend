import React, { useEffect, useState, useRef } from "react";
import api from "../api";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const resp = await api.get("/admin/notifications");
        setNotifications(resp.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNotes();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = async (id) => {
    try {
      await api.put(`/admin/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "relative",
          fontSize: "1.5rem",
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "#f44336",
              color: "#fff",
              borderRadius: "50%",
              padding: "0 5px",
              fontSize: "0.75rem",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "0.5rem",
            width: "300px",
            maxHeight: "400px",
            background: "#fff",
            boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
            borderRadius: "12px",
            overflowY: "auto",
            zIndex: 10000,
          }}
        >
          {notifications.length === 0 ? (
            <p style={{ padding: "1rem" }}>No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                style={{
                  padding: "0.75rem 1rem",
                  borderBottom: "1px solid #eee",
                  background: n.read ? "#fafafa" : "#fff",
                  cursor: "pointer",
                }}
              >
                <p style={{ margin: 0, fontWeight: n.read ? 400 : 600 }}>
                  {n.title}
                </p>
                <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#555" }}>
                  {n.message}
                </p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#999" }}>
                  {new Date(n.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
