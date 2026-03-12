import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-card">
        <h1 className="home-title">🔐 TRINETRA</h1>
        <p className="home-subtitle">
          Anonymous Workplace Reporting System
        </p>
        <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem' }}>
          Use this platform to submit incidents confidentially. Your identity stays private while you make your voice heard.
        </p>
        <div className="home-buttons">
          <Link className="card-btn" to="/report">
            📝 Submit Report
          </Link>
          <Link className="card-btn" to="/track">
            📊 Track Report Status
          </Link>
          <Link className="card-btn" to="/signup">
            👤 Employee Sign Up
          </Link>
          <Link className="card-btn" style={{ backgroundColor: '#6366f1' }} to="/login">
            🔐 Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
