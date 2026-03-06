import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-card">
        <h1 className="home-title">TRINETRA – Anonymous Workplace Reporting System</h1>
        <p className="home-subtitle">
          Use this platform to submit incidents confidentially. Your identity
          stays private while you make your voice heard.
        </p>
        <div className="home-buttons">
          <Link className="card-btn" to="/submit">
            Submit Anonymous Report
          </Link>
          <Link className="card-btn" to="/track">
            Track Report Status
          </Link>
          <Link className="card-btn" to="/admin-login">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
