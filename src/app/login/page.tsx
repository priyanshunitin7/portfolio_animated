"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("admin-auth", "true");
      router.push("/admin");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #08080c;
          position: relative;
          overflow: hidden;
          font-family: 'DM Mono', monospace;
        }

        /* Grain overlay */
        .login-root::before {
          content: '';
          position: fixed;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          z-index: 0;
          animation: grain 0.8s steps(2) infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2%, -3%); }
          50% { transform: translate(3%, 2%); }
          75% { transform: translate(-1%, 4%); }
        }

        /* Ambient glow blobs */
        .glow-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 480px; height: 480px;
          top: -120px; left: -160px;
          background: radial-gradient(circle, rgba(160,120,255,0.10) 0%, transparent 70%);
          animation: blobFloat 12s ease-in-out infinite;
        }
        .blob-2 {
          width: 360px; height: 360px;
          bottom: -80px; right: -100px;
          background: radial-gradient(circle, rgba(80,180,255,0.08) 0%, transparent 70%);
          animation: blobFloat 16s ease-in-out infinite reverse;
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.08); }
        }

        /* Card */
        .card {
          position: relative;
          z-index: 1;
          width: 380px;
          padding: 52px 44px 48px;
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 0.5px rgba(255,255,255,0.04),
            0 32px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.07);

          opacity: 0;
          transform: translateY(28px);
          animation: cardIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
        }
        @keyframes cardIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Corner accent line */
        .card::after {
          content: '';
          position: absolute;
          top: -1px; left: 48px; right: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,140,255,0.5), transparent);
        }

        /* Header */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(180,140,255,0.7);
          margin-bottom: 22px;
          opacity: 0;
          animation: fadeUp 0.7s ease 0.4s forwards;
        }
        .badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(180,140,255,0.8);
          box-shadow: 0 0 8px rgba(180,140,255,0.6);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 300;
          color: #f0ede8;
          letter-spacing: -0.01em;
          line-height: 1.1;
          margin-bottom: 6px;
          opacity: 0;
          animation: fadeUp 0.7s ease 0.5s forwards;
        }
        h2 em {
          font-style: italic;
          color: rgba(240,237,232,0.55);
        }

        .subtitle {
          font-size: 11px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.04em;
          margin-bottom: 40px;
          opacity: 0;
          animation: fadeUp 0.7s ease 0.6s forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Fields */
        .field-wrap {
          position: relative;
          margin-bottom: 16px;
          opacity: 0;
          animation: fadeUp 0.7s ease var(--delay) forwards;
        }
        .field-label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .field-wrap.is-focused .field-label {
          color: rgba(180,140,255,0.75);
        }

        .field-inner {
          position: relative;
        }
        input {
          width: 100%;
          padding: 13px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #f0ede8;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.04em;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        input::placeholder { color: rgba(255,255,255,0.18); }
        input:focus {
          border-color: rgba(180,140,255,0.45);
          background: rgba(180,140,255,0.05);
          box-shadow: 0 0 0 3px rgba(180,140,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04);
        }

        /* Focus line sweep */
        .field-line {
          position: absolute;
          bottom: 0; left: 50%;
          width: 0; height: 1px;
          background: linear-gradient(90deg, rgba(180,140,255,0.6), rgba(100,160,255,0.4));
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.22,1,0.36,1), left 0.4s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .field-wrap.is-focused .field-line {
          width: 100%;
          left: 0;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 32px 0 28px;
          opacity: 0;
          animation: fadeUp 0.7s ease 0.9s forwards;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider-text { font-size: 10px; color: rgba(255,255,255,0.2); letter-spacing: 0.12em; }

        /* Button */
        .btn-wrap {
          opacity: 0;
          animation: fadeUp 0.7s ease 1s forwards;
        }
        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #c4a8ff 0%, #8ab4ff 100%);
          color: #0a080f;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 32px rgba(180,140,255,0.22), 0 8px 24px rgba(0,0,0,0.3);
        }
        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 48px rgba(180,140,255,0.35), 0 12px 32px rgba(0,0,0,0.35);
        }
        button:active { transform: translateY(0); }

        /* Shimmer sweep on hover */
        button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        button:hover::before { transform: translateX(100%); }

        /* Footer */
        .footer-note {
          margin-top: 24px;
          text-align: center;
          font-size: 10px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.08em;
          opacity: 0;
          animation: fadeUp 0.7s ease 1.1s forwards;
        }

        /* Decorative corner marks */
        .corner {
          position: absolute;
          width: 12px; height: 12px;
          border-color: rgba(255,255,255,0.12);
          border-style: solid;
        }
        .corner-tl { top: 14px; left: 14px; border-width: 1px 0 0 1px; }
        .corner-tr { top: 14px; right: 14px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: 14px; left: 14px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: 14px; right: 14px; border-width: 0 1px 1px 0; }
      `}</style>

      <div className="login-root">
        <div className="glow-blob blob-1" />
        <div className="glow-blob blob-2" />

        <div className="card">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          <div className="badge">
            <span className="badge-dot" />
            Secure Portal
          </div>

          <h2>Admin <em>Access</em></h2>
          <p className="subtitle">Restricted — authorized personnel only</p>

          {/* Username */}
          <div
            className={`field-wrap ${focused === "username" ? "is-focused" : ""}`}
            style={{ "--delay": "0.7s" } as React.CSSProperties}
          >
            <label className="field-label">Username</label>
            <div className="field-inner">
              <input
                type="text"
                placeholder="Enter username"
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="field-line" />
            </div>
          </div>

          {/* Password */}
          <div
            className={`field-wrap ${focused === "password" ? "is-focused" : ""}`}
            style={{ "--delay": "0.8s" } as React.CSSProperties}
          >
            <label className="field-label">Password</label>
            <div className="field-inner">
              <input
                type="password"
                placeholder="Enter password"
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="field-line" />
            </div>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">authenticate</span>
            <div className="divider-line" />
          </div>

          <div className="btn-wrap">
            <button onClick={handleLogin}>
              Sign In
            </button>
          </div>

          <p className="footer-note">All sessions are monitored &amp; encrypted</p>
        </div>
      </div>
    </>
  );
}