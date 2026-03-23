"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="bg-white/[0.05] border border-white/10 p-8 rounded-2xl w-[320px]">
        <h2 className="text-2xl mb-6">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 bg-transparent border border-white/20 rounded-lg"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-transparent border border-white/20 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-white text-black rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}