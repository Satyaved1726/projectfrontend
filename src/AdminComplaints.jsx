import React, { useEffect, useState } from "react";
import api from "./api";

export default function AdminComplaints() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      const resp = await api.get("/admin/reports");
      setReports(resp.data);
    }
    fetchReports().catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="left-col">
          <h2 className="title">Complaint Management</h2>
          <ul>
            {reports.map((r) => (
              <li key={r.id}>
                [{r.status}] {r.severity} - {r.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}