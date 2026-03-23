"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  // 🔐 AUTH CHECK
  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");

    if (!auth) {
      router.push("/login");
    } else {
      setIsAuth(true);
    }
  }, []);

  // 🚀 Real-time polling
  useEffect(() => {
    if (!isAuth) return;

    const fetchData = () => {
      fetch("/api/admin")
        .then((res) => res.json())
        .then((res) => setData(res));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [isAuth]);

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    router.push("/login");
  };

  // ⏳ Auth check loading
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        Checking access...
      </div>
    );
  }

  // ⏳ Data loading
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-8 py-12">

      {/* 🌌 Glow Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* 🔐 Logout Button */}
      <div className="flex justify-end mb-6 relative z-10">
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-full bg-white/[0.05] border border-white/10 text-sm text-zinc-300 hover:text-white hover:border-red-400/40 hover:bg-red-500/10 transition-all duration-300 backdrop-blur-xl"
        >
          Logout
        </button>
      </div>

      {/* 🔥 Hero */}
      <div className="mb-16 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extralight tracking-tight leading-tight">
          Here is the <span className="italic text-white/80">dashboard</span> of your portfolio
        </h1>
        <p className="text-zinc-500 mt-4 text-lg">
          Live insights into user behavior & engagement
        </p>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
        <StatCard title="Total Visits" value={data.visits} />
        <StatCard title="GitHub Clicks" value={data.github} />
        <StatCard title="LinkedIn Clicks" value={data.linkedin} />
        <StatCard title="CV Downloads" value={data.cv} />
        <StatCard title="Messages" value={data.messages} />
      </div>

      {/* 🔁 Flow */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 backdrop-blur-xl mb-16 relative z-10">
        <h2 className="text-2xl font-light mb-8 text-white/80">
          User Interaction Flow
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center">
          <FlowItem label="Visitor" value={data.visits} />
          <Arrow />
          <FlowItem label="GitHub" value={data.github} />
          <Arrow />
          <FlowItem label="LinkedIn" value={data.linkedin} />
          <Arrow />
          <FlowItem label="CV Download" value={data.cv} />
        </div>
      </div>

      {/* 📈 Chart */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 backdrop-blur-xl relative z-10">
        <h2 className="text-2xl font-light mb-8 text-white/80">
          Engagement Overview
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: "Visits", value: data.visits },
                { name: "GitHub", value: data.github },
                { name: "LinkedIn", value: data.linkedin },
                { name: "CV", value: data.cv },
              ]}
            >
              <XAxis dataKey="name" stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }: { title: string; value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 500;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(counter);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-cyan-400/30 transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 blur-xl transition" />
      <p className="text-zinc-500 text-sm mb-2">{title}</p>
      <h3 className="text-3xl font-semibold tracking-tight">{display}</h3>
    </div>
  );
}

function FlowItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-xl font-semibold shadow-[0_0_30px_rgba(56,189,248,0.1)]">
        {value}
      </div>
      <p className="mt-3 text-sm text-zinc-400">{label}</p>
    </div>
  );
}

function Arrow() {
  return <div className="text-white/20 text-2xl">→</div>;
}