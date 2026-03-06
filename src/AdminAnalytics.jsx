import React, { useEffect, useState } from "react";
import api from "./api";
import AdminSidebar from "./components/AdminSidebar";
// using react-chartjs-2 and chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminAnalytics() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await api.get("/admin/reports");
        setReports(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const severityLevels = ["Low", "Medium", "High", "Critical"];
  const categoryList = [
    "Harassment",
    "Bullying",
    "Discrimination",
    "Ethical Violation",
    "Workplace Safety",
    "Other",
  ];

  const severityCounts = severityLevels.map(
    (lvl) => reports.filter((r) => r.severity === lvl).length
  );
  const categoryCounts = categoryList.map(
    (cat) => reports.filter((r) => r.category === cat).length
  );

  const total = reports.length;
  const highSeverity = reports.filter((r) => r.severity === "High").length;
  const openReports = reports.filter(
    (r) => r.status === "Pending" || r.status === "Investigating"
  ).length;

  const severityData = {
    labels: severityLevels,
    datasets: [
      {
        label: "Count",
        data: severityCounts,
        backgroundColor: ["#4caf50", "#ffeb3b", "#ff9800", "#f44336"],
      },
    ],
  };

  const categoryData = {
    labels: categoryList,
    datasets: [
      {
        label: "Count",
        data: categoryCounts,
        backgroundColor: "#5aaae8",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  return (
    <div className="page">
      <AdminSidebar />
      <main className="admin-content">
        <div className="container">
          <h2 className="title">Report Analytics</h2>
        {loading ? (
          <p className="subtitle">Loading data…</p>
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
                { label: "Total Reports", value: total },
                { label: "High Severity", value: highSeverity },
                { label: "Open Reports", value: openReports },
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

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                justifyContent: "space-around",
              }}
            >
              <div style={{ flex: "1 1 300px" }}>
                <h3>Severity Distribution</h3>
                <Bar options={options} data={severityData} />
              </div>
              <div style={{ flex: "1 1 300px" }}>
                <h3>Category Distribution</h3>
                <Bar options={options} data={categoryData} />
              </div>
            </div>
          </>
        )}
      </div>
      </main>
    </div>
  );
}
