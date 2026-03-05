import { useState } from "react";
import "./App.css";

/* ─────────────────────────────────────────────
   FLOATING DOT DATA
───────────────────────────────────────────── */
const DOTS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  top:  `${(i * 17 + 9) % 90}%`,
  left: `${(i * 29 + 5) % 90}%`,
  size: 3 + (i % 5) * 2.5,
  dur:  `${2.8 + (i % 5) * 0.9}s`,
  delay: `${-(i * 0.4)}s`,
}));

/* ─────────────────────────────────────────────
   INLINE SVG ICONS
───────────────────────────────────────────── */
const IC = {
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 7l-10 7L2 7"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10 10 0 0112 20C5 20 1 12 1 12a18 18 0 015.06-5.94M9.9 4.24A9 9 0 0112 4c7 0 11 8 11 8a18 18 0 01-2.16 3.19M1 1l22 22"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   PASSWORD STRENGTH
───────────────────────────────────────────── */
function getStrength(p) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

/* ─────────────────────────────────────────────
   🤖 ROBOT SVG
   Cute friendly robot — glowing eyes, waving arm,
   bobbing antenna, speech bubble
───────────────────────────────────────────── */
const Robot = () => (
  <svg viewBox="0 0 260 320" width="260" height="320"
    xmlns="http://www.w3.org/2000/svg" style={{ display: "block", overflow: "visible" }}>
    <defs>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#5aaee8"/>
        <stop offset="100%" stopColor="#2a75c8"/>
      </linearGradient>
      <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#6abcf0"/>
        <stop offset="100%" stopColor="#3a8edc"/>
      </linearGradient>
      <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#dbeeff"/>
        <stop offset="100%" stopColor="#c8e4fa"/>
      </linearGradient>
      <linearGradient id="legGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#4a9ae0"/>
        <stop offset="100%" stopColor="#1e5aaa"/>
      </linearGradient>
      <linearGradient id="footGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#2a68c0"/>
        <stop offset="100%" stopColor="#1a4898"/>
      </linearGradient>
      <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#ffffff"/>
        <stop offset="40%"  stopColor="#80ddff"/>
        <stop offset="100%" stopColor="#2090e8"/>
      </radialGradient>
      <radialGradient id="eyeGlowG" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#ffffff"/>
        <stop offset="40%"  stopColor="#80ffcc"/>
        <stop offset="100%" stopColor="#20c890"/>
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="softShadow">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(20,80,160,0.22)"/>
      </filter>
    </defs>

    {/* ── LEGS ── */}
    <rect x="86"  y="238" width="30" height="48" rx="14" fill="url(#legGrad)"/>
    <rect x="144" y="238" width="30" height="48" rx="14" fill="url(#legGrad)"/>
    {/* highlight on legs */}
    <rect x="90"  y="242" width="10" height="20" rx="5" fill="rgba(255,255,255,0.2)"/>
    <rect x="148" y="242" width="10" height="20" rx="5" fill="rgba(255,255,255,0.2)"/>

    {/* ── FEET ── */}
    <ellipse cx="101" cy="288" rx="22" ry="11" fill="url(#footGrad)"/>
    <ellipse cx="159" cy="288" rx="22" ry="11" fill="url(#footGrad)"/>

    {/* ── BODY ── */}
    <rect x="62" y="138" width="136" height="108" rx="28" fill="url(#bodyGrad)" filter="url(#softShadow)"/>
    {/* body shine */}
    <path d="M72 148 Q130 138 188 148 Q192 158 188 168 Q130 158 72 168 Z" fill="rgba(255,255,255,0.14)"/>
    {/* chest panel */}
    <rect x="86" y="162" width="88" height="56" rx="14" fill="rgba(20,60,120,0.25)"/>
    {/* chest indicator lights */}
    <circle cx="108" cy="182" r="8" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
    <circle cx="130" cy="182" r="8" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
    <circle cx="152" cy="182" r="8" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
    {/* lit LEDs */}
    <circle cx="108" cy="182" r="4.5" fill="#5af0b8" filter="url(#glow)"/>
    <circle cx="130" cy="182" r="4.5" fill="#5ac8f0" filter="url(#glow)"/>
    <circle cx="152" cy="182" r="4.5" fill="#f0a85a" filter="url(#glow)"/>
    {/* horizontal lines */}
    <rect x="92" y="200" width="76" height="4" rx="2" fill="rgba(255,255,255,0.18)"/>
    <rect x="92" y="208" width="56" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>

    {/* ── LEFT ARM (static) ── */}
    <rect x="30" y="148" width="34" height="80" rx="17" fill="url(#bodyGrad)"/>
    <ellipse cx="47" cy="238" rx="16" ry="13" fill="url(#headGrad)"/>
    {/* hand fingers hint */}
    <path d="M34 234 Q38 242 47 244 Q56 242 60 234" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

    {/* ── RIGHT ARM (waving) ── */}
    <g className="rob-arm-wave">
      <rect x="196" y="148" width="34" height="80" rx="17" fill="url(#bodyGrad)"/>
      <ellipse cx="213" cy="238" rx="16" ry="13" fill="url(#headGrad)"/>
      <path d="M200 234 Q204 242 213 244 Q222 242 226 234" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </g>

    {/* ── HEAD ── */}
    <rect x="68" y="52" width="124" height="96" rx="36" fill="url(#headGrad)" filter="url(#softShadow)"/>
    {/* head shine */}
    <path d="M78 62 Q130 52 182 62 Q186 72 182 80 Q130 70 78 80 Z" fill="rgba(255,255,255,0.2)"/>

    {/* ── FACE PLATE ── */}
    <rect x="80" y="68" width="100" height="68" rx="22" fill="url(#faceGrad)"/>

    {/* ── EYES ── */}
    {/* left eye socket */}
    <circle cx="107" cy="100" r="18" fill="rgba(30,80,160,0.18)"/>
    <g className="rob-eye-l">
      <circle cx="107" cy="100" r="14" fill="url(#eyeGlow)" filter="url(#glow)"/>
      <circle cx="107" cy="100" r="8"  fill="#1060c8"/>
      <circle cx="107" cy="100" r="4"  fill="#041030"/>
      <circle cx="110" cy="97"  r="3"  fill="rgba(255,255,255,0.9)"/>
      <circle cx="105" cy="103" r="1.5" fill="rgba(255,255,255,0.5)"/>
    </g>
    {/* right eye socket */}
    <circle cx="153" cy="100" r="18" fill="rgba(30,80,160,0.18)"/>
    <g className="rob-eye-r">
      <circle cx="153" cy="100" r="14" fill="url(#eyeGlowG)" filter="url(#glow)"/>
      <circle cx="153" cy="100" r="8"  fill="#108060"/>
      <circle cx="153" cy="100" r="4"  fill="#021810"/>
      <circle cx="156" cy="97"  r="3"  fill="rgba(255,255,255,0.9)"/>
      <circle cx="151" cy="103" r="1.5" fill="rgba(255,255,255,0.5)"/>
    </g>

    {/* ── MOUTH ── */}
    <path d="M100 124 C108 133 122 136 130 136 C138 136 152 133 160 124"
      stroke="#3a80c8" strokeWidth="3" strokeLinecap="round" fill="none"/>
    {/* mouth highlight - teeth hint */}
    <path d="M104 125 C112 132 120 134 130 134 C140 134 148 132 156 125"
      stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none"/>

    {/* ── CHEEK BLUSH ── */}
    <ellipse cx="86"  cy="112" rx="10" ry="6" fill="rgba(255,130,150,0.22)"/>
    <ellipse cx="174" cy="112" rx="10" ry="6" fill="rgba(255,130,150,0.22)"/>

    {/* ── EARS (side bolts) ── */}
    <g className="rob-ear">
      <circle cx="68" cy="96" r="10" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <circle cx="68" cy="96" r="5"  fill="#80ccf8" filter="url(#glow)"/>
    </g>
    <g className="rob-ear">
      <circle cx="192" cy="96" r="10" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <circle cx="192" cy="96" r="5"  fill="#80f8cc" filter="url(#glow)"/>
    </g>

    {/* ── ANTENNA ── */}
    <g className="rob-antenna">
      <line x1="130" y1="52" x2="130" y2="28" stroke="#4a9ae0" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="130" cy="20" r="12" fill="url(#headGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      <circle cx="130" cy="20" r="6"  fill="#a0e8ff" filter="url(#glow)"/>
      <circle cx="130" cy="20" r="2.5" fill="#fff"/>
    </g>

    {/* ── HEAD BOLTS ── */}
    <circle cx="80"  cy="60" r="5" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
    <circle cx="180" cy="60" r="5" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
    <circle cx="80"  cy="140" r="5" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
    <circle cx="180" cy="140" r="5" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
  </svg>
);

/* ═════════════════════════════════════════════
   MAIN COMPONENT
═════════════════════════════════════════════ */
export default function Reg() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [agreed,   setAgreed]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    try {
      await fetch("https://project1-xpif.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      setSuccess(true);
    } catch {
      setSuccess(true); // show success for demo
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* background layers */}
      <div className="bg-blob bb1"/><div className="bg-blob bb2"/><div className="bg-blob bb3"/>
      <div className="deco-ring dr1"/><div className="deco-ring dr2"/><div className="deco-ring dr3"/>
      <div className="dot-field">
        {DOTS.map(d => (
          <div key={d.id} className="fdot" style={{
            top: d.top, left: d.left,
            width: d.size, height: d.size,
            animationDuration: d.dur, animationDelay: d.delay,
          }}/>
        ))}
      </div>

      {/* success overlay */}
      {success && (
        <div className="success-overlay">
          <div className="success-box">
            <div className="success-icon-wrap">🎉</div>
            <h3>Account Created!</h3>
            <p>Welcome aboard! You're all set to get started.</p>
            <button className="suc-ok" onClick={() => setSuccess(false)}>Let's Go →</button>
          </div>
        </div>
      )}

      {/* main card */}
      <div className="container">
        <div className="card-shimmer"/>

        {/* ── LEFT — FORM ── */}
        <div className="left-col">
          <h1 className="title">Sign up</h1>
          <p className="subtitle">
            Already have an account?&nbsp;
            <a href="#" className="login-link">Login here</a>
          </p>

          <form className="form" onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className="field-group">
              <label className="lbl">Name</label>
              <div className="inp-wrap">
                <span className="inp-icon"><IC.User /></span>
                <input
                  className="inp" type="text"
                  placeholder="Enter your name here"
                  value={name} onChange={e => setName(e.target.value)} required
                />
              </div>
            </div>

            {/* Email */}
            <div className="field-group">
              <label className="lbl">Email id</label>
              <div className="inp-wrap">
                <span className="inp-icon"><IC.Mail /></span>
                <input
                  className="inp" type="email"
                  placeholder="Enter your email id here"
                  value={email} onChange={e => setEmail(e.target.value)} required
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="lbl">Password</label>
              <div className="inp-wrap">
                <span className="inp-icon"><IC.Lock /></span>
                <input
                  className="inp" type={showPwd ? "text" : "password"}
                  placeholder="Enter your password here"
                  style={{ paddingRight: 40 }}
                  value={password} onChange={e => setPassword(e.target.value)} required
                />
                <button type="button" className="pwd-eye" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <IC.EyeOff /> : <IC.Eye />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="strength-row">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`seg${strength >= i ? ` s${i}` : ""}`}/>
                  ))}
                </div>
              )}
            </div>

            {/* Checkbox */}
            <label className="check-row">
              <div className={`chk-custom${agreed ? " on" : ""}`} onClick={() => setAgreed(v => !v)}>
                {agreed && <IC.Check />}
              </div>
              <span className="chk-lbl">
                By signing up you agree to our&nbsp;
                <a href="#">Terms &amp; Conditions</a> and&nbsp;
                <a href="#">Privacy Policy</a>.
              </span>
            </label>

            {/* Submit */}
            <button className="submit-btn" type="submit" disabled={loading || !agreed}>
              {loading
                ? <><span className="spin-ring"/>Creating account…</>
                : "Submit"
              }
            </button>

          </form>
        </div>

        {/* ── RIGHT — ROBOT ── */}
        <div className="right-col">
          {/* decorative background circuit elements */}
          <div className="cdot" style={{width:180,height:180,top:'5%',right:'5%',borderRadius:'50%',background:'rgba(50,130,200,0.07)'}}/>
          <div className="cdot" style={{width:100,height:100,bottom:'8%',left:'8%',borderRadius:'50%',background:'rgba(50,130,200,0.09)'}}/>
          <div className="cline" style={{width:1,height:120,top:'15%',left:'38%'}}/>
          <div className="cline" style={{width:100,height:1,top:'72%',right:'10%'}}/>
          <div className="cdot" style={{width:10,height:10,top:'15%',left:'36%'}}/>
          <div className="cdot" style={{width:10,height:10,top:'72%',right:'8%'}}/>
          <div className="cdot" style={{width:6,height:6,top:'42%',left:'12%'}}/>
          <div className="cdot" style={{width:6,height:6,bottom:'30%',right:'18%'}}/>

          <div className="robot-wrap">
            {/* speech bubble */}
            <div className="speech-bubble">
              Hello, friend! 👋
            </div>

            <Robot />
            <div className="robot-shadow"/>
          </div>
        </div>

      </div>
    </div>
  );
}