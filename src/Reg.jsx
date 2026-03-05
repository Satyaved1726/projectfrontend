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
    {/* SHADOW */}
    <ellipse cx="155" cy="368" rx="75" ry="10" fill="rgba(0,0,0,0.25)" />

    {/* LEFT LEG behind */}
    <path d="M120 230 Q100 260 85 285 Q75 300 90 310 Q105 320 115 305 Q130 280 140 255 Z" fill="#2255CC" />
    <ellipse cx="92" cy="312" rx="18" ry="8" fill="#F0EEE8" transform="rotate(-10,92,312)" />
    <path d="M78 310 Q90 305 108 310 Q112 318 100 320 Q82 318 78 310Z" fill="#E8E6E0" />
    <rect x="107" y="248" width="28" height="8" rx="4" fill="#FFD000" transform="rotate(-20,107,248)" />

    {/* RIGHT LEG front cross */}
    <path d="M160 235 Q185 255 210 265 Q230 272 235 255 Q238 240 220 232 Q195 222 170 225 Z" fill="#1E44BB" />
    <path d="M228 248 Q242 240 252 248 Q258 258 248 265 Q234 268 225 260 Z" fill="#F0EEE8" />
    <ellipse cx="240" cy="256" rx="14" ry="7" fill="#E8E6E0" />
    <rect x="195" y="257" width="30" height="8" rx="4" fill="#FFD000" transform="rotate(15,195,257)" />

    {/* TORSO / SHIRT */}
    <path d="M115 165 Q110 200 112 235 Q125 255 155 258 Q185 258 195 238 Q200 210 195 170 Z" fill="#E82255" />
    <path d="M115 165 Q108 200 110 235 Q118 245 128 248 Q122 220 120 180 Z" fill="#FFD000" opacity="0.85" />
    <path d="M195 170 Q200 210 195 238 Q185 248 175 250 Q178 220 178 180 Z" fill="#FFD000" opacity="0.85" />
    <path d="M140 165 L155 185 L170 165 Q165 158 155 155 Q145 158 140 165Z" fill="#CC1144" />
    <line x1="155" y1="168" x2="155" y2="240" stroke="#CC1144" strokeWidth="1.5" opacity="0.4" />

    {/* LEFT ARM */}
    <path d="M115 175 Q98 190 88 210 Q84 225 95 230 Q106 232 112 218 Q120 200 125 182 Z" fill="#E82255" />
    <circle cx="93" cy="232" r="11" fill="#FFCEA0" />

    {/* RIGHT ARM holding phone */}
    <path d="M192 178 Q208 195 218 215 Q224 228 215 235 Q206 240 200 228 Q192 210 185 190 Z" fill="#E82255" />
    <circle cx="217" cy="237" r="11" fill="#FFCEA0" />

    {/* PHONE */}
    <rect x="207" y="215" width="26" height="44" rx="5" fill="#DDE0F0" stroke="white" strokeWidth="1.5" />
    <rect x="210" y="219" width="20" height="32" rx="3" fill="url(#phoneScreen)" />
    <circle cx="220" cy="254" r="4" fill="rgba(255,255,255,0.4)" />
    <defs>
      <linearGradient id="phoneScreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5577FF" />
        <stop offset="100%" stopColor="#9944FF" />
      </linearGradient>
    </defs>
    <rect x="212" y="223" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.7)" />
    <rect x="212" y="229" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />

    {/* NECK */}
    <rect x="147" y="145" width="18" height="22" rx="9" fill="#FFCEA0" />

    {/* HEAD */}
    <ellipse cx="155" cy="120" rx="40" ry="42" fill="#FFCEA0" />
    <ellipse cx="116" cy="122" rx="7" ry="10" fill="#FFBF8A" />
    <ellipse cx="116" cy="122" rx="4" ry="6" fill="#F0A870" opacity="0.6" />
    <ellipse cx="194" cy="122" rx="7" ry="10" fill="#FFBF8A" />
    <ellipse cx="194" cy="122" rx="4" ry="6" fill="#F0A870" opacity="0.6" />

    {/* HAIR blue spiky */}
    <path d="M115 110 Q112 85 125 72 Q138 60 155 58 Q172 60 185 72 Q198 85 195 110 Z" fill="#1133AA" />
    <path d="M130 72 Q128 52 135 42 Q138 58 140 68 Z" fill="#1133AA" />
    <path d="M142 65 Q143 44 150 36 Q154 52 155 64 Z" fill="#1133AA" />
    <path d="M155 64 Q158 43 165 36 Q167 52 168 65 Z" fill="#1133AA" />
    <path d="M167 68 Q172 50 180 42 Q180 58 178 70 Z" fill="#1133AA" />
    <path d="M128 80 Q132 70 138 74 Q134 82 128 80Z" fill="rgba(255,255,255,0.15)" />

    {/* FACE */}
    <path d="M135 105 Q142 100 148 103" stroke="#7A4010" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M162 103 Q168 100 175 105" stroke="#7A4010" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <ellipse cx="141" cy="113" rx="7" ry="7.5" fill="white" />
    <ellipse cx="169" cy="113" rx="7" ry="7.5" fill="white" />
    <ellipse cx="142" cy="114" rx="4.5" ry="5" fill="#2244AA" />
    <ellipse cx="170" cy="114" rx="4.5" ry="5" fill="#2244AA" />
    <ellipse cx="143" cy="112" rx="2" ry="2" fill="#111" />
    <ellipse cx="171" cy="112" rx="2" ry="2" fill="#111" />
    <circle cx="144" cy="111" r="1.2" fill="white" />
    <circle cx="172" cy="111" r="1.2" fill="white" />
    <path d="M152 120 Q155 124 158 120" stroke="#D4906A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M143 130 Q155 140 167 130" stroke="#C07040" strokeWidth="2" strokeLinecap="round" fill="none" />
    <ellipse cx="133" cy="127" rx="8" ry="5" fill="rgba(255,120,120,0.22)" />
    <ellipse cx="177" cy="127" rx="8" ry="5" fill="rgba(255,120,120,0.22)" />

    {/* shading */}
    <path d="M140 165 L135 240 Q155 248 155 248 Q155 248 175 240 L170 165 Q165 158 155 155 Q145 158 140 165Z" fill="rgba(0,0,0,0.06)" />
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
    if (password !== confirm) { alert("Passwords do not match!"); return; }
    setLoading(true);
    try {
      await fetch("https://project1-xpif.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      setSuccess(true);
    } catch {
      alert("Error registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BG */}
      <div className="blob blob1" /><div className="blob blob2" /><div className="blob blob3" />
      <div className="wave wave1" /><div className="wave wave2" />
      {STAR_DOTS.map((s) => (
        <div key={s.id} className="sd" style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDuration: s.dur, animationDelay: s.delay }} />
      ))}

      {success && (
        <div className="sov">
          <div className="si">🎉</div>
          <div className="st">Welcome aboard!</div>
          <div className="ss">Account created successfully ✦</div>
        </div>
      )}

      <div className="page">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">YOUR LOGO HERE</div>
          <div className="nav-links">
            <span className="nav-link">About</span>
            <span className="nav-link">News</span>
            <span className="nav-link">Contact us</span>
            <div className="hamburger"><span /><span /><span /></div>
          </div>
        </nav>

        {/* MAIN */}
        <div className="main">
          {/* FORM */}
          <div className="form-side">
            <p className="form-title">Create <span>your account</span></p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="fw">
                <span className="fi">☺</span>
                <input className="finput" type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="fw">
                <span className="fi">✉</span>
                <input className="finput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="fw">
                <span className="fi">🔒</span>
                <input className="finput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="fw">
                <span className="fi">🔒</span>
                <input className="finput" type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
              </div>
              <div className="terms-row">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span>I agree to the <a href="#">Terms & Conditions</a></span>
              </div>
              <button className="reg-btn" type="submit" disabled={loading || !agreed}>
                {loading ? "CREATING..." : "REGISTER"}
              </button>
              <p className="link-text">Already have an account? <a href="#">Login here</a></p>
            </form>
          </div>

          {/* CHARACTER */}
          <div className="char-side">
            <div className="fl-notif">
              <div className="fl-line" /><div className="fl-line" />
            </div>
            <span className="fl-heart">❤️</span>
            <div className="fl-planet" />
            <span className="fl-star" style={{ position: "absolute", top: "8%", right: "18%" }}>✦</span>
            <span className="fl-star" style={{ position: "absolute", bottom: "22%", right: "8%", fontSize: "12px", animationDuration: "7s" }}>✦</span>
            <span className="fl-star" style={{ position: "absolute", top: "50%", left: "8%", fontSize: "11px", animationDuration: "6s" }}>✦</span>

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