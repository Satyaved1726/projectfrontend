import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await api.post("/admin/login", { username, password });
      const { token, role } = resp.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      switch (role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;
        case "HR":
          navigate("/hr/dashboard");
          break;
        case "COMPLIANCE":
          navigate("/compliance/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left-col">
          <h2 className="title">Admin Portal Login</h2>
          <form className="form" onSubmit={handleSubmit}>
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
                type="password"
                className="inp"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="card-btn" type="submit" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
