import React, { useState } from "react";
import api from "./api";

export default function Track() {
  const [token, setToken] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const handleLookup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const resp = await api.get(`/reports/${encodeURIComponent(token)}`);
      setReport(resp.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setReport(null);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left-col">
          <h2 className="title">Track Report Status</h2>
          <p className="subtitle">
            Use the token you received after submitting a report.
          </p>
          <form className="form" onSubmit={handleLookup}>
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
            <button className="card-btn" type="submit">
              Look Up
            </button>
          </form>
          {report && (
            <div className="field-group">
              <h3>Status: {report.status}</h3>
              <p>Severity: {report.severity}</p>
              <p>Description: {report.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
