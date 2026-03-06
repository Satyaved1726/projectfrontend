import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../shared/components/Navbar';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>TRINETRA – Anonymous Workplace Reporting System</h1>
          <p>
            Securely report workplace issues while keeping your identity protected. 
            Create a culture of transparency and accountability in your organization.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/submit-report')}
            >
              📝 Submit Anonymous Report
            </button>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="text-center">About TRINETRA</h2>
          <p className="text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
            TRINETRA is a comprehensive anonymous workplace reporting system designed to help organizations 
            maintain ethics, safety, and accountability. Our platform allows employees to report concerns 
            confidentially without fear of retaliation, while giving management the tools to investigate 
            and resolve issues swiftly.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section section-light">
        <div className="container">
          <h2 className="text-center">Key Features</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h4>Complete Anonymity</h4>
              <p>Your identity is completely protected. Only admins can see reports, and your personal information is never revealed.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h4>Real-time Analytics</h4>
              <p>Dashboard analytics help management understand workplace issues at a glance with intuitive visualizations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h4>Organized Categories</h4>
              <p>Categorize issues by type: Harassment, Safety, Corruption, and more. Easy organization for quick resolution.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h4>Instant Notifications</h4>
              <p>Admins receive real-time notifications when new reports are submitted and need attention.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👁️</div>
              <h4>Report Tracking</h4>
              <p>Track your report status using a unique tracking token. Stay informed about investigation progress.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h4>Quick Response</h4>
              <p>Admins can respond directly to reports with updates and resolutions without revealing complainant identity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="text-center">How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Submit Report</h4>
              <p>Fill out the anonymous report form with details about the issue you want to report.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Get Tracking Token</h4>
              <p>Receive a unique tracking token to monitor your report status anytime.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Admin Investigation</h4>
              <p>Admins review, categorize, and investigate the report confidentially.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Resolution & Response</h4>
              <p>Admins provide updates and resolutions while maintaining your anonymity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section id="security" className="section section-light">
        <div className="container">
          <h2 className="text-center">Security & Privacy</h2>
          <div className="grid grid-2">
            <div className="security-item">
              <h4>🛡️ Data Encryption</h4>
              <p>All data is encrypted in transit and at rest using industry-standard protocols.</p>
            </div>
            <div className="security-item">
              <h4>🔒 No IP Logging</h4>
              <p>We don't store IP addresses or device information that could identify you.</p>
            </div>
            <div className="security-item">
              <h4>✅ Compliance</h4>
              <p>Compliant with data protection regulations including GDPR and local privacy laws.</p>
            </div>
            <div className="security-item">
              <h4>🚀 Secure Infrastructure</h4>
              <p>Enterprise-grade infrastructure with regular security audits and penetration testing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>Ready to Create a Culture of Accountability?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Join hundreds of organizations using TRINETRA to maintain workplace integrity.
          </p>
          <div className="flex flex-center gap-4" style={{ justifyContent: 'center' }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/signup')}
            >
              Start Free Trial
            </button>
            <button 
              className="btn btn-outline btn-lg"
              onClick={() => navigate('/track-report')}
            >
              Track Existing Report
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>TRINETRA</h4>
              <p>Anonymous Workplace Reporting System</p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="/">Contact</a></li>
                <li><a href="/">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Get Started</h4>
              <ul>
                <li><a href="/signup">Sign Up</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/submit-report">Submit Report</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 TRINETRA. All rights reserved. | Privacy & Security First</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
