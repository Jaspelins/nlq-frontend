"use client";
import { useState } from "react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@teste.com");
  const [password, setPassword] = useState("123");
  const [token, setToken] = useState<string | null>(null);
  const [org, setOrg] = useState("nassautec");
  const [error, setError] = useState("");

  const doLogin = async () => {
    setError("");
    try {
      const res = await login(email, password);
      setToken(res.token);
    } catch (e:any) {
      setError(e.message || "Erro ao logar");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">NLQ Front</h1>
      {!token ? (
        <div className="space-y-3">
          <input className="border p-2 w-full" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
          <input className="border p-2 w-full" value={password} type="password" onChange={e=>setPassword(e.target.value)} placeholder="senha" />
          <button onClick={doLogin} className="px-4 py-2 bg-black text-white">Entrar</button>
          {error && <p className="text-red-600">{error}</p>}
          <p className="text-sm text-slate-600">Dica: qualquer email funciona; se contiver <code>admin@</code> vira admin.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-green-700">Logado ✅</p>
          <div className="space-y-2">
            <label className="text-sm">Empresa (orgId)</label>
            <input className="border p-2 w-full" value={org} onChange={e=>setOrg(e.target.value)} placeholder="orgId (ex: nassautec)" />
          </div>
          <a className="inline-block px-4 py-2 bg-blue-600 text-white"
             href={`/dashboard?token=${encodeURIComponent(token)}&org=${encodeURIComponent(org)}`}>
            Ir para Dashboard
          </a>
          <a className="inline-block ml-3 px-4 py-2 bg-zinc-800 text-white"
             href={`/admin?token=${encodeURIComponent(token)}&org=${encodeURIComponent(org)}`}>
            Ir para Admin
          </a>
        </div>
      )}
    </main>
  );
}
