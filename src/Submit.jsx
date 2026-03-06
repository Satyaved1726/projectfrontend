import React, { useState } from "react";
import api from "./api";

export default function Submit() {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const resp = await api.post("/reports", { description, severity });
      setToken(resp.data.trackingToken);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left-col">
          <h2 className="title">Submit Anonymous Report</h2>
          <p className="subtitle">
            Describe the incident below. You will receive a tracking token to
            check status later.
          </p>
          {!token ? (
            <form className="form" onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="lbl">Description</label>
                <textarea
                  className="inp"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="field-group">
                <label className="lbl">Severity</label>
                <select
                  className="inp"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              {error && <p className="error">{error}</p>}
              <button className="card-btn" type="submit">
                Submit
              </button>
            </form>
          ) : (
            <div className="field-group">
              <p>Your report has been submitted.</p>
              <p>
                Your tracking token:<br />
                <strong>{token}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
