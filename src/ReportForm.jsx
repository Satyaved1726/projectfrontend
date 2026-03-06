import React, { useState } from "react";
import api from "./api";

export default function ReportForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Harassment");
  const [severity, setSeverity] = useState("Low");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await api.post("/report", {
        title,
        category,
        severity,
        description,
      });
      setToken(resp.data.trackingToken);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    return (
      <div className="page">
        <div className="container">
          <div className="left-col">
            <h2 className="title">Report submitted successfully</h2>
            <p className="subtitle">
              Please save your tracking token to check on the status later.
            </p>
            <div className="field-group">
              <strong>{token}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="left-col">
          <h2 className="title">Submit Anonymous Report</h2>
          <p className="subtitle">
            Fill out the form below. Your submission is completely anonymous.
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="lbl">Issue Title</label>
              <input
                className="inp"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label className="lbl">Category</label>
              <select
                className="inp"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Harassment</option>
                <option>Bullying</option>
                <option>Discrimination</option>
                <option>Ethical Violation</option>
                <option>Workplace Safety</option>
                <option>Other</option>
              </select>
            </div>

            <div className="field-group">
              <label className="lbl">Severity</label>
              <select
                className="inp"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div className="field-group">
              <label className="lbl">Description</label>
              <textarea
                className="inp"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {error && <p className="error">{error}</p>}
            <button className="card-btn" type="submit" disabled={loading}>
              {loading ? "Submitting…" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
