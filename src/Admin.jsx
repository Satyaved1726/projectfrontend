import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { saveToken } from "./auth";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const resp = await api.post("/auth/login", { username, password });
      saveToken(resp.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left-col">
          <h2 className="title">Administrator Login</h2>
          <p className="subtitle">Enter your credentials to continue.</p>
          <form className="form" onSubmit={handleLogin}>
            <div className="field-group">
              <label className="lbl">Username</label>
              <input
                className="inp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="field-group">
              <label className="lbl">Password</label>
              <input
                className="inp"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="card-btn" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
