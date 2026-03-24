"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

/* ══════════════════════════════════════════════════
   AURORA CANVAS — flowing color mesh background
══════════════════════════════════════════════════ */
function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.15, y: 0.2,  r: 0.45, h: 200, s: 80, l: 35, a: 0.18, spx: 0.00018, spy: 0.00012 },
      { x: 0.80, y: 0.75, r: 0.40, h: 185, s: 70, l: 30, a: 0.14, spx: -0.00013, spy: 0.00009 },
      { x: 0.50, y: 0.50, r: 0.35, h: 220, s: 75, l: 28, a: 0.10, spx: 0.00021, spy: -0.00015 },
      { x: 0.85, y: 0.15, r: 0.30, h: 170, s: 65, l: 32, a: 0.09, spx: -0.00017, spy: 0.00011 },
      { x: 0.20, y: 0.80, r: 0.32, h: 240, s: 60, l: 30, a: 0.08, spx: 0.00015, spy: -0.00013 },
    ];

    let t = 0;
    const draw = () => {
      t += 16;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#03030a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b) => {
        const px = (b.x + Math.sin(t * b.spx) * 0.12) * canvas.width;
        const py = (b.y + Math.cos(t * b.spy) * 0.10) * canvas.height;
        const r  = b.r * Math.max(canvas.width, canvas.height);
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r);
        grad.addColorStop(0,   `hsla(${b.h}, ${b.s}%, ${b.l}%, ${b.a})`);
        grad.addColorStop(0.5, `hsla(${b.h + 20}, ${b.s - 10}%, ${b.l - 8}%, ${b.a * 0.4})`);
        grad.addColorStop(1,   `hsla(${b.h}, ${b.s}%, ${b.l}%, 0)`);
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      const scanY = ((t * 0.00008) % 1) * canvas.height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      scanGrad.addColorStop(0,   "rgba(120,80,255,0)");
      scanGrad.addColorStop(0.5, "rgba(120,80,255,0.018)");
      scanGrad.addColorStop(1,   "rgba(120,80,255,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 80, canvas.width, 160);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ══════════════════════════════════════════════════
   TYPEWRITER HOOK
══════════════════════════════════════════════════ */
function useTypewriter(text: string, speed = 38, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) timer = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => { clearTimeout(start); clearTimeout(timer); };
  }, [text, speed, startDelay]);

  return displayed;
}

/* ══════════════════════════════════════════════════
   BIOMETRIC RING CANVAS
══════════════════════════════════════════════════ */
type BioPhase = "idle" | "scanning" | "success" | "error";

function BiometricRing({ phase }: { phase: BioPhase }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const phaseRef  = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const S = 120;
    canvas.width = S; canvas.height = S;
    const cx = S / 2, cy = S / 2, R = 46;

    let t = 0;
    const draw = () => {
      t += 16;
      ctx.clearRect(0, 0, S, S);
      const ph = phaseRef.current;

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle =
        ph === "success" ? "rgba(80,220,130,0.18)" :
        ph === "error"   ? "rgba(255,80,80,0.18)"  :
                           "rgba(120,80,255,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2 - Math.PI / 2;
        const isMajor = i % 9 === 0;
        const r1 = R + 2, r2 = R + (isMajor ? 8 : 4);
        const col = ph === "success" ? `rgba(80,220,130,${isMajor ? 0.7 : 0.3})`
                  : ph === "error"   ? `rgba(255,80,80,${isMajor ? 0.7 : 0.3})`
                                     : `rgba(160,120,255,${isMajor ? 0.6 : 0.2})`;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        ctx.strokeStyle = col;
        ctx.lineWidth = isMajor ? 1.5 : 0.8;
        ctx.stroke();
      }

      if (ph === "scanning") {
        const angle = (t * 0.0018) % (Math.PI * 2) - Math.PI / 2;
        const arcLen = Math.PI * 0.9;
        ctx.beginPath();
        ctx.arc(cx, cy, R, angle, angle + arcLen);
        ctx.strokeStyle = "rgba(160,100,255,0.9)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();

        const hx = cx + Math.cos(angle + arcLen) * R;
        const hy = cy + Math.sin(angle + arcLen) * R;
        ctx.beginPath();
        ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#c87eff";
        ctx.shadowColor = "#c87eff";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        const pulse = 0.5 + 0.5 * Math.sin(t * 0.004);
        ctx.beginPath();
        ctx.arc(cx, cy, 14 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(160,100,255,${0.2 + pulse * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (ph === "success") {
        ctx.beginPath();
        ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2);
        ctx.strokeStyle = "rgba(80,220,130,0.85)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 12, cy + 1);
        ctx.lineTo(cx - 3,  cy + 10);
        ctx.lineTo(cx + 14, cy - 9);
        ctx.strokeStyle = "#50dc82";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      if (ph === "error") {
        ctx.beginPath();
        ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2);
        ctx.strokeStyle = "rgba(255,80,80,0.7)";
        ctx.lineWidth = 2;
        ctx.stroke();
        [[-10,-10,10,10],[10,-10,-10,10]].forEach(([x1,y1,x2,y2]) => {
          ctx.beginPath();
          ctx.moveTo(cx+x1, cy+y1);
          ctx.lineTo(cx+x2, cy+y2);
          ctx.strokeStyle = "#ff5050";
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.stroke();
        });
      }

      if (ph === "idle") {
        [16,24,32].forEach((r, i) => {
          const breathe = 0.5 + 0.5 * Math.sin(t * 0.0015 + i * 1.2);
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(120,80,255,${0.08 + breathe * 0.07})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
        const b2 = 0.5 + 0.5 * Math.sin(t * 0.002);
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,100,255,${0.4 + b2 * 0.3})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} style={{ width: 120, height: 120, display: "block" }} />;
}



/* ══════════════════════════════════════════════════
   GLITCH TEXT
══════════════════════════════════════════════════ */
function GlitchText({ text, active, className }: { text: string; active: boolean; className?: string }) {
  return (
    <span className={`glitch-wrap ${active ? "glitch-on" : ""} ${className ?? ""}`} data-text={text}>
      {text}
    </span>
  );
}


/* ══════════════════════════════════════════════════
   FIELD
══════════════════════════════════════════════════ */
interface FieldProps {
  label: string; id: string; type: string;
  value: string; onChange: (v: string) => void;
  delay: string; icon: React.ReactNode;
}
function Field({ label, id, type, value, onChange, delay, icon }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  return (
    <div
      className={`nv-field${focused ? " nv-f-focused" : ""}${filled ? " nv-f-filled" : ""}`}
      style={{ "--fd": delay } as React.CSSProperties}
    >
      <div className="nv-f-icon">{icon}</div>
      <div className="nv-f-body">
        <label htmlFor={id} className="nv-f-label">{label}</label>
        <input
          id={id} type={type} value={value} autoComplete="off"
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      <div className="nv-f-br nv-f-tl" />
      <div className="nv-f-br nv-f-tr" />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════ */
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phase, setPhase] = useState<BioPhase>("idle");
  const [mounted, setMounted] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const router = useRouter();
  const leftRef = useRef<HTMLDivElement>(null);
const rightRef = useRef<HTMLDivElement>(null);

//new addition
const handleTilt = (
  e: React.MouseEvent,
  element: HTMLDivElement | null
) => {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const isLeft = element === leftRef.current;
  const intensity = isLeft ? 5 : 8;

  const rotateX = ((y / rect.height) - 0.5) * -intensity;
  const rotateY = ((x / rect.width) - 0.5) * intensity;

  element.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.02)
  `;
};

const resetTilt = (element: HTMLDivElement | null) => {
  if (!element) return;

  element.style.transform = `
    perspective(1000px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
  `;
};
//new addition over 

  const sysMsg = useTypewriter(
    phase === "idle"     ? "READY · AWAITING AUTHORIZATION"   :
    phase === "scanning" ? "SCANNING · VERIFYING CREDENTIALS" :
    phase === "success"  ? "ACCESS GRANTED · REDIRECTING"     :
                           "ACCESS DENIED · RETRY",
    40, 200
  );

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fire = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 380);
    };
    let tid: ReturnType<typeof setTimeout>;
    const sched = () => { tid = setTimeout(() => { fire(); sched(); }, 4000 + Math.random() * 9000); };
    sched();
    return () => clearTimeout(tid);
  }, []);

  const handleLogin = useCallback(async () => {
    if (phase === "scanning" || phase === "success") return;
    setPhase("scanning");
    try {
      const res  = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setTimeout(() => {
          setPhase("success");
          localStorage.setItem("admin-auth", "true");
          setTimeout(() => router.push("/admin"), 1400);
        }, 1600);
      } else {
        setTimeout(() => { setPhase("error"); setTimeout(() => setPhase("idle"), 2000); }, 1600);
      }
    } catch {
      setTimeout(() => { setPhase("error"); setTimeout(() => setPhase("idle"), 2000); }, 1600);
    }
  }, [username, password, phase, router]);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  }, [handleLogin]);

  if (!mounted) return null;

  const pwStrength = password.length >= 10 ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

        :root {
          --bg:#03030a; --panel:rgba(6,4,16,0.88);
          --pb:rgba(120,80,255,0.2); --pbh:rgba(120,80,255,0.45);
          --ac:#8b5cf6; --acb:#a78bfa; --acg:rgba(139,92,246,0.45);
          --cy:#22d3ee; --gr:#4ade80; --rd:#f87171; --am:#fbbf24;
          --t1:#e8e0ff; --t2:rgba(232,224,255,0.44); --t3:rgba(232,224,255,0.2);
          --fd:'Orbitron',sans-serif; --fm:'Space Mono',monospace;
          cursor:none;
        }
        html,body{height:100%;overflow:hidden;}

        /* CURSOR */
        .cur-dot{position:fixed;z-index:9999;pointer-events:none;width:8px;height:8px;
          border-radius:50%;background:var(--acb);box-shadow:0 0 10px var(--acg);will-change:transform;}
        .cur-ring{position:fixed;z-index:9998;pointer-events:none;width:40px;height:40px;
          border-radius:50%;border:1px solid rgba(167,139,250,0.45);will-change:transform;
          transition:width .2s,height .2s,border-color .2s;}
        .cur-ring.cur-hover{width:56px;height:56px;border-color:rgba(167,139,250,0.9);}
        .cur-ring.cur-click{border-color:var(--acb);transform:scale(0.82) !important;}

        /* ROOT */
        .nv-root{min-height:100vh;height:100vh;display:flex;align-items:center;
          justify-content:center;background:var(--bg);font-family:var(--fm);
          overflow:hidden;position:relative;}

        /* BG LAYERS */
        .nv-grid{position:fixed;inset:0;z-index:1;pointer-events:none;
          background-image:linear-gradient(rgba(120,80,255,0.038) 1px,transparent 1px),
            linear-gradient(90deg,rgba(120,80,255,0.038) 1px,transparent 1px);
          background-size:60px 60px;
          mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%);}
        .nv-vig{position:fixed;inset:0;z-index:1;pointer-events:none;
          background:radial-gradient(ellipse 85% 85% at 50% 50%,transparent 40%,rgba(3,3,10,.88) 100%);}
        .nv-crt{position:fixed;inset:0;z-index:1;pointer-events:none;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.045) 2px,rgba(0,0,0,.045) 4px);}

        /* SHELL */
        .nv-shell{position:relative;z-index:2;display:flex;gap:2px;
          animation:shellIn 1.1s cubic-bezier(.22,1,.36,1) both;}
        @keyframes shellIn{
          from{opacity:0;transform:translateY(40px) scale(.96);filter:blur(8px);}
          to{opacity:1;transform:translateY(0) scale(1);filter:blur(0);}}

        /* LEFT PANEL */
        .nv-left{width:242px;background:var(--panel);border:1px solid var(--pb);
          border-radius:20px 0 0 20px;padding:30px 22px 28px;
          display:flex;flex-direction:column;gap:26px;
          backdrop-filter:blur(40px);border-right:1px solid rgba(120,80,255,0.1);
          position:relative;overflow:hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            will-change: transform;
  transform-style: preserve-3d;
}
          .nv-left:hover {
  

  border-color: rgba(139,92,246,0.4);

  box-shadow:
    0 0 30px rgba(139,92,246,0.15),
    0 10px 40px rgba(0,0,0,0.5);
}
        .nv-left::before{content:'';position:absolute;top:0;left:28%;right:28%;height:1px;
          background:linear-gradient(90deg,transparent,var(--ac),transparent);opacity:.55;}

        .nv-left::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;

  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(139,92,246,0.08) 50%,
    transparent 70%
  );

  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.3s ease;
}
  .nv-left:hover::after {
  opacity: 1;
  transform: translateX(100%);
  transition: transform 0.7s ease;
}

        /* LOGO */
        .nv-logo{display:flex;align-items:center;gap:10px;}
        .nv-logo-hex{width:34px;height:34px;flex-shrink:0;}
        .nv-logo-hex svg{width:100%;height:100%;}
        .nv-logo-name{font-family:var(--fd);font-size:11px;font-weight:700;
          letter-spacing:.2em;color:var(--t1);line-height:1.3;}
        .nv-logo-name small{display:block;font-size:8px;font-weight:400;color:var(--t3);letter-spacing:.15em;}

        /* BIOMETRIC */
        .nv-bio{display:flex;flex-direction:column;align-items:center;gap:8px;}
        .bio-lbl{font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--t3);}
        .bio-ph{font-size:9px;letter-spacing:.12em;text-transform:uppercase;
          color:var(--acb);animation:blk 1.2s ease-in-out infinite;}
        .bio-ph.sc{color:var(--am);}
        .bio-ph.ok{color:var(--gr);animation:none;}
        .bio-ph.er{color:var(--rd);animation:none;}

        /* STATS */
        .nv-stats{display:flex;flex-direction:column;gap:11px;}
        .stat-item{display:flex;flex-direction:column;gap:5px;}
        .stat-lbl{font-size:8px;letter-spacing:.18em;text-transform:uppercase;
          color:var(--t3);display:flex;justify-content:space-between;}
        .stat-bar{height:2px;background:rgba(120,80,255,0.12);border-radius:2px;overflow:hidden;}
        .stat-fill{height:100%;border-radius:2px;
          background:linear-gradient(90deg,var(--ac),var(--cy));
          animation:stLoad 1.5s cubic-bezier(.22,1,.36,1) var(--sd) both;}
        @keyframes stLoad{from{width:0}to{width:var(--sw)}}

        /* SYSLOG */
        .syslog{flex:1;display:flex;flex-direction:column;gap:8px;min-height:0;}
        .syslog-header{display:flex;justify-content:space-between;align-items:center;}
        .syslog-title{font-size:8px;letter-spacing:.22em;color:var(--t3);}
        .syslog-live{font-size:8px;letter-spacing:.1em;color:var(--gr);animation:blk 2s ease-in-out infinite;}
        .syslog-lines{display:flex;flex-direction:column;gap:5px;font-size:8.5px;}
        .syslog-line{display:flex;gap:8px;opacity:0;transform:translateX(-8px);
          transition:opacity .35s,transform .35s;}
        .syslog-line.sll-vis{opacity:1;transform:translateX(0);}
        .syslog-ts{color:var(--t3);flex-shrink:0;}

        /* RIGHT PANEL */
        .nv-right{width:424px;background:var(--panel);border:1px solid var(--pb);
          border-radius:0 20px 20px 0;padding:44px 44px 38px;
          display:flex;flex-direction:column;backdrop-filter:blur(40px);
          position:relative;overflow:hidden;
          transition:
    transform 0.35s cubic-bezier(.22,1,.36,1),
    border-color 0.35s ease,
    box-shadow 0.35s ease;
     will-change: transform;
  transform-style: preserve-3d;
      }
          .nv-right:hover {
  

  border-color: rgba(167,139,250,0.6);

  box-shadow:
    0 0 60px rgba(139,92,246,0.25),
    0 0 120px rgba(34,211,238,0.12),
    0 30px 80px rgba(0,0,0,0.6);
}
    
        .nv-right::before{content:'';position:absolute;top:0;left:18%;right:18%;height:1px;
          background:linear-gradient(90deg,transparent,rgba(167,139,250,.75),transparent);}
          .nv-right::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;

  background: linear-gradient(
    120deg,
    transparent 20%,
    rgba(255,255,255,0.08) 50%,
    transparent 80%
  );

  opacity: 0;
  transform: translateX(-120%);
  transition: opacity 0.3s ease;
}

.nv-right:hover::after {
  opacity: 1;
  transform: translateX(120%);
  transition: transform 0.8s ease;
}
        .nv-right.nv-err{border-color:rgba(248,113,113,.45);
          box-shadow:0 0 40px rgba(248,113,113,.18);}
        .nv-right.nv-ok{border-color:rgba(74,222,128,.35);
          box-shadow:0 0 50px rgba(74,222,128,.15);}

          .nv-left > *,
.nv-right > * {
  transform: translateZ(25px);
}
  .nv-left > *,
.nv-right > * {
  backface-visibility: hidden;
}

        /* BRACKETS */
        .nv-bk{position:absolute;width:16px;height:16px;pointer-events:none;}
        .nv-bk.tl{top:12px;left:12px;border-top:1.5px solid rgba(167,139,250,.4);border-left:1.5px solid rgba(167,139,250,.4);}
        .nv-bk.tr{top:12px;right:12px;border-top:1.5px solid rgba(167,139,250,.4);border-right:1.5px solid rgba(167,139,250,.4);}
        .nv-bk.bl{bottom:12px;left:12px;border-bottom:1.5px solid rgba(167,139,250,.4);border-left:1.5px solid rgba(167,139,250,.4);}
        .nv-bk.br{bottom:12px;right:12px;border-bottom:1.5px solid rgba(167,139,250,.4);border-right:1.5px solid rgba(167,139,250,.4);}

        /* HEADER */
        .nv-hdr{margin-bottom:34px;}
        .nv-sys{font-size:9px;letter-spacing:.22em;text-transform:uppercase;
          color:var(--acb);margin-bottom:18px;display:flex;align-items:center;gap:8px;
          animation:fu .5s ease .3s both;min-height:14px;}
        .sys-bar{width:22px;height:1px;background:var(--ac);flex-shrink:0;}
        .sys-cur{display:inline-block;width:6px;height:10px;background:var(--acb);
          margin-left:2px;vertical-align:middle;animation:blk .8s step-end infinite;}

        .nv-title{font-family:var(--fd);font-size:48px;font-weight:900;
          letter-spacing:-.02em;line-height:1;color:var(--t1);margin-bottom:10px;
          animation:fu .5s ease .4s both;}
        .nv-t2{background:linear-gradient(135deg,var(--acb) 0%,var(--cy) 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

        .glitch-wrap{position:relative;display:inline-block;}
        .glitch-wrap.glitch-on::before,.glitch-wrap.glitch-on::after{
          content:attr(data-text);position:absolute;top:0;left:0;
          font-family:inherit;font-size:inherit;font-weight:inherit;color:inherit;}
        .glitch-wrap.glitch-on::before{
          color:var(--cy);clip-path:polygon(0 0,100% 0,100% 42%,0 42%);
          animation:gl1 .35s steps(1) both;}
        .glitch-wrap.glitch-on::after{
          color:var(--rd);clip-path:polygon(0 60%,100% 60%,100% 100%,0 100%);
          animation:gl2 .35s steps(1) .05s both;}
        @keyframes gl1{0%,100%{transform:translateX(-3px) skewX(-1deg)}
          25%{transform:translateX(3px) skewX(2deg)}50%{transform:translateX(-2px)}75%{transform:translateX(1px)}}
        @keyframes gl2{0%,100%{transform:translateX(3px) skewX(1deg)}
          25%{transform:translateX(-3px)}50%{transform:translateX(2px)}75%{transform:translateX(-1px)}}

        .nv-sub{font-size:11px;color:var(--t2);letter-spacing:.04em;line-height:1.75;
          animation:fu .5s ease .5s both;}

        /* FIELDS */
        .nv-fields{display:flex;flex-direction:column;gap:13px;margin-bottom:22px;}
        .nv-field{position:relative;display:flex;align-items:center;gap:14px;
          padding:0 16px;height:60px;background:rgba(120,80,255,.04);
          border:1px solid rgba(120,80,255,.18);border-radius:12px;
          animation:fu .5s ease var(--fd) both;cursor:text;
          transition:border-color .25s,box-shadow .25s,background .25s;}
        .nv-field.nv-f-focused{border-color:var(--ac);background:rgba(120,80,255,.07);
          box-shadow:0 0 0 3px rgba(139,92,246,.12),0 0 20px rgba(139,92,246,.1);}
        .nv-field.nv-f-filled{border-color:rgba(120,80,255,.32);}

        .nv-f-br{position:absolute;width:7px;height:7px;pointer-events:none;opacity:0;
          transition:opacity .25s;}
        .nv-f-tl{top:-1px;left:-1px;border-top:1.5px solid var(--ac);border-left:1.5px solid var(--ac);border-radius:2px 0 0 0;}
        .nv-f-tr{top:-1px;right:-1px;border-top:1.5px solid var(--ac);border-right:1.5px solid var(--ac);border-radius:0 2px 0 0;}
        .nv-field.nv-f-focused .nv-f-br{opacity:1;}

        .nv-f-icon{flex-shrink:0;width:18px;height:18px;color:var(--t3);
          transition:color .25s;display:flex;align-items:center;justify-content:center;}
        .nv-field.nv-f-focused .nv-f-icon,.nv-field.nv-f-filled .nv-f-icon{color:var(--acb);}

        .nv-f-body{flex:1;display:flex;flex-direction:column;gap:3px;}
        .nv-f-label{font-size:8.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
          color:var(--t3);transition:color .25s;cursor:pointer;}
        .nv-field.nv-f-focused .nv-f-label,.nv-field.nv-f-filled .nv-f-label{color:rgba(167,139,250,.8);}

        input{background:transparent;border:none;outline:none;color:var(--t1);
          font-family:var(--fm);font-size:13px;width:100%;padding:0;
          caret-color:var(--acb);letter-spacing:.04em;}
        input::placeholder{color:var(--t3);font-size:12px;}
        input[type="password"]:not(:placeholder-shown){letter-spacing:.22em;}

        /* STATUS ROW */
        .nv-srow{display:flex;align-items:center;justify-content:space-between;
          margin-bottom:26px;animation:fu .5s ease .72s both;}
        .nv-str{display:flex;align-items:center;gap:7px;}
        .str-lbl{font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--t3);}
        .str-bars{display:flex;gap:3px;}
        .str-bar{width:22px;height:3px;border-radius:2px;background:rgba(255,255,255,.07);transition:background .3s;}
        .str-bar.s1{background:var(--rd);}
        .str-bar.s2{background:var(--am);}
        .str-bar.s3{background:var(--gr);}
        .nv-forgot{font-size:10px;color:rgba(167,139,250,.5);text-decoration:none;
          letter-spacing:.04em;transition:color .2s;cursor:pointer;}
        .nv-forgot:hover{color:var(--acb);}

        /* DIVIDER */
        .nv-div{display:flex;align-items:center;gap:12px;margin-bottom:22px;animation:fu .5s ease .78s both;}
        .div-l{flex:1;height:1px;background:rgba(120,80,255,.12);}
        .div-t{font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--t3);white-space:nowrap;}

        /* BUTTON */
        .nv-bw{animation:fu .5s ease .84s both;}
        .nv-btn{width:100%;height:56px;border:none;border-radius:12px;cursor:none;
          font-family:var(--fd);font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
          position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:12px;
          background:linear-gradient(135deg,#6d28d9 0%,#8b5cf6 50%,#22d3ee 100%);color:#fff;
          box-shadow:0 0 0 1px rgba(139,92,246,.4),0 0 40px rgba(139,92,246,.28),0 16px 48px rgba(0,0,0,.4);
          transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s;
          -webkit-font-smoothing:antialiased;}
        .nv-btn::before{content:'';position:absolute;inset:0;
          background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.2) 50%,transparent 70%);
          transform:translateX(-120%);transition:transform .6s ease;}
        .nv-btn:hover:not(:disabled){transform:translateY(-3px);
          box-shadow:0 0 0 1px rgba(139,92,246,.6),0 0 60px rgba(139,92,246,.5),
            0 0 120px rgba(34,211,238,.15),0 20px 60px rgba(0,0,0,.45);}
        .nv-btn:hover:not(:disabled)::before{transform:translateX(120%);}
        .nv-btn:active:not(:disabled){transform:translateY(0);}
        .nv-btn:disabled{cursor:not-allowed;opacity:.8;}

        .btn-ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.22);
          transform:scale(0);animation:rip .6s ease-out forwards;pointer-events:none;}
        @keyframes rip{to{transform:scale(4);opacity:0;}}

        .scan-dots{display:flex;gap:6px;align-items:center;}
        .scan-dot{width:6px;height:6px;border-radius:50%;background:white;
          animation:sdp .9s ease-in-out infinite;}
        .scan-dot:nth-child(2){animation-delay:.15s;}
        .scan-dot:nth-child(3){animation-delay:.3s;}
        @keyframes sdp{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1.2);opacity:1}}

        /* FOOTER */
        .nv-ft{margin-top:22px;display:flex;align-items:center;justify-content:space-between;
          animation:fu .5s ease .96s both;}
        .ft-enc{display:flex;align-items:center;gap:6px;font-size:9px;color:var(--t3);letter-spacing:.1em;}
        .ft-enc svg{width:10px;height:10px;}
        .ft-tags{display:flex;gap:6px;}
        .ft-tag{font-size:8px;letter-spacing:.12em;text-transform:uppercase;
          padding:3px 8px;border-radius:100px;border:1px solid rgba(120,80,255,.2);
          color:var(--t3);background:rgba(120,80,255,.05);}
        .ft-tag.ftg{border-color:rgba(74,222,128,.25);color:rgba(74,222,128,.7);background:rgba(74,222,128,.05);}

        /* UTILITIES */
        @keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blk{0%,100%{opacity:1}50%{opacity:.35}}
      `}</style>

      <div className="nv-root" onKeyDown={onKey}>
        <AuroraCanvas />
        <div className="nv-grid" />
        <div className="nv-vig" />
        <div className="nv-crt" />
        

        <div className="nv-shell">
          {/* ─── LEFT ─── */}
          <div
  ref={leftRef}
  onMouseMove={(e) => handleTilt(e, leftRef.current)}
  onMouseLeave={() => resetTilt(leftRef.current)}
  className="nv-left"
>
            {/* Logo */}
            <div className="nv-logo">
              <div className="nv-logo-hex">
                <svg viewBox="0 0 40 46" fill="none">
                  <path d="M20 2 L36 11 L36 35 L20 44 L4 35 L4 11 Z"
                    stroke="rgba(139,92,246,0.6)" strokeWidth="1" fill="rgba(139,92,246,0.06)"/>
                  <path d="M20 10 L28 15 L28 31 L20 36 L12 31 L12 15 Z"
                    stroke="rgba(34,211,238,0.4)" strokeWidth="0.8" fill="none"/>
                  <circle cx="20" cy="23" r="3" fill="rgba(167,139,250,0.85)"
                    style={{filter:"drop-shadow(0 0 5px #a78bfa)"}}/>
                </svg>
              </div>
              <div className="nv-logo-name">
                VAULT
                <small>NEURAL OS · v4.2</small>
              </div>
            </div>

            {/* Biometric */}
            <div className="nv-bio">
              <span className="bio-lbl">Identity Scan</span>
              <BiometricRing phase={phase} />
              <span className={`bio-ph ${phase==="scanning"?"sc":phase==="success"?"ok":phase==="error"?"er":""}`}>
                {phase==="idle"?"STANDBY":phase==="scanning"?"SCANNING":phase==="success"?"VERIFIED":"REJECTED"}
              </span>
            </div>

            {/* Stats */}
            <div className="nv-stats">
              {[
                {label:"CPU",val:"42%",w:"42%",d:"0.8s"},
                {label:"ENC",val:"100%",w:"100%",d:"1.0s"},
                {label:"NET",val:"78%",w:"78%",d:"1.2s"},
              ].map(s => (
                <div className="stat-item" key={s.label}>
                  <div className="stat-lbl"><span>{s.label}</span><span>{s.val}</span></div>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{"--sw":s.w,"--sd":s.d} as React.CSSProperties}/>
                  </div>
                </div>
              ))}
            </div>

            
          </div>

          {/* ─── RIGHT ─── */}
          <div
  ref={rightRef}
  onMouseMove={(e) => handleTilt(e, rightRef.current)}
  onMouseLeave={() => resetTilt(rightRef.current)}
  className={`nv-right${phase==="error"?" nv-err":phase==="success"?" nv-ok":""}`}
>
            {(["tl","tr","bl","br"] as const).map(p => <div key={p} className={`nv-bk ${p}`}/>)}

            {/* Header */}
            <div className="nv-hdr">
              <div className="nv-sys">
                <div className="sys-bar"/>
                {sysMsg}<span className="sys-cur"/>
              </div>
              <div className="nv-title">
                <GlitchText text="NEURAL" active={glitch}/><br/>
                <span className="nv-t2">VAULT</span>
              </div>
              <p className="nv-sub">
                Maximum-clearance restricted zone.<br/>
                All access attempts are logged &amp; monitored.
              </p>
            </div>

            {/* Fields */}
            <div className="nv-fields">
              <Field label="Identifier" id="nv-user" type="text"
                value={username} onChange={setUsername} delay="0.55s"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>}/>
              <Field label="Auth Key" id="nv-pass" type="password"
                value={password} onChange={setPassword} delay="0.65s"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>}/>
            </div>

            {/* Status row */}
            <div className="nv-srow">
              <div className="nv-str">
                <span className="str-lbl">Strength</span>
                <div className="str-bars">
                  {[1,2,3].map(i => (
                    <div key={i} className={`str-bar${pwStrength>=i?` s${pwStrength}`:""}`}/>
                  ))}
                </div>
              </div>
              <a href="#" className="nv-forgot">Forgot key?</a>
            </div>

            {/* Divider */}
            <div className="nv-div">
              <div className="div-l"/>
              <span className="div-t">Neural Auth Protocol</span>
              <div className="div-l"/>
            </div>

            {/* Button */}
            <div className="nv-bw">
              <button
                className="nv-btn"
                disabled={phase==="scanning"||phase==="success"}
                onClick={e => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  const rect = btn.getBoundingClientRect();
                  const r = document.createElement("span");
                  r.className = "btn-ripple";
                  const sz = Math.max(rect.width, rect.height);
                  r.style.cssText = `width:${sz}px;height:${sz}px;top:${e.clientY-rect.top-sz/2}px;left:${e.clientX-rect.left-sz/2}px`;
                  btn.appendChild(r);
                  setTimeout(()=>r.remove(),600);
                  handleLogin();
                }}
              >
                {phase==="scanning"&&<div className="scan-dots"><div className="scan-dot"/><div className="scan-dot"/><div className="scan-dot"/></div>}
                {phase==="success"&&<><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>ACCESS GRANTED</>}
                {phase==="error"&&<><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>DENIED — RETRY</>}
                {phase==="idle"&&<>INITIALIZE ACCESS<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>}
              </button>
            </div>

            {/* Footer */}
            <div className="nv-ft">
              <div className="ft-enc">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                AES-256 · Zero-knowledge
              </div>
              <div className="ft-tags">
                <span className="ft-tag ftg">SOC 2</span>
                <span className="ft-tag">TLS 1.3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}