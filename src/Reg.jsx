import { useState } from "react";
import "./App.css";

const STAR_DOTS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: `${(i * 23 + 4) % 94}%`,
  left: `${(i * 37 + 6) % 94}%`,
  size: 1 + (i % 3),
  dur: `${2 + (i % 4)}s`,
  delay: `${-(i * 0.45)}s`,
}));

const CharacterSVG = () => (
  <svg width="300" height="380" viewBox="0 0 300 380" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="155" cy="368" rx="75" ry="10" fill="rgba(0,0,0,0.25)" />
  </svg>
);

export default function Reg() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "https://project1-xpif.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        }
      );

      const data = await response.text();
      console.log(data);

      if (response.ok) {
        setSuccess(true);
        alert("User registered successfully");
      } else {
        alert("Registration failed");
      }

    } catch (error) {

      console.error(error);
      alert("Error registering user");

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background blobs */}
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />

      <div className="wave wave1" />
      <div className="wave wave2" />

      {STAR_DOTS.map((s) => (
        <div
          key={s.id}
          className="sd"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: s.dur,
            animationDelay: s.delay
          }}
        />
      ))}

      {success && (
        <div className="sov">
          <div className="si">🎉</div>
          <div className="st">Welcome aboard!</div>
          <div className="ss">Account created successfully ✦</div>
        </div>
      )}

      <div className="page">

        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">YOUR LOGO HERE</div>

          <div className="nav-links">
            <span className="nav-link">About</span>
            <span className="nav-link">News</span>
            <span className="nav-link">Contact us</span>

            <div className="hamburger">
              <span />
              <span />
              <span />
            </div>
          </div>
        </nav>

        <div className="main">

          {/* FORM */}
          <div className="form-side">

            <p className="form-title">
              Create <span>your account</span>
            </p>

            <form className="form" onSubmit={handleSubmit}>

              <div className="fw">
                <span className="fi">☺</span>
                <input
                  className="finput"
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="fw">
                <span className="fi">✉</span>
                <input
                  className="finput"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="fw">
                <span className="fi">🔒</span>
                <input
                  className="finput"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="fw">
                <span className="fi">🔒</span>
                <input
                  className="finput"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>

              <div className="terms-row">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />

                <span>
                  I agree to the <a href="#">Terms & Conditions</a>
                </span>
              </div>

              <button
                className="reg-btn"
                type="submit"
                disabled={loading || !agreed}
              >
                {loading ? "CREATING..." : "REGISTER"}
              </button>

              <p className="link-text">
                Already have an account? <a href="#">Login here</a>
              </p>

            </form>
          </div>

          {/* Character Side */}
          <div className="char-side">
            <div className="char-float">
              <CharacterSVG />
              <div className="char-shadow-outer" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}