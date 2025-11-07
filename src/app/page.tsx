"use client";
import { useState } from "react";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [org, setOrg] = useState("nassautec");
  const [error, setError] = useState("");
  const router = useRouter();

  const doLogin = async () => {
    setError("");
    if (email.toLowerCase() === "admin@admin" && password === "adminok") {
      // Hardcoded Master user login
      router.push("/master");
      return;
    }

    try {
      const res = await login(email, password);
      setToken(res.token);
    } catch (e:any) {
      setError(e.message || "Erro ao logar");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {!token ? (
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800">Bem-vindo ao NLQ</h1>
            <p className="text-center text-gray-600 mt-2 mb-6">Faça login para continuar</p>
            <div className="space-y-4">
              <input
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
              <input
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Senha"
              />
              <button
                onClick={doLogin}
                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Entrar
              </button>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              <p className="text-xs text-center text-gray-500">
                Dica: qualquer email funciona; se contiver <code>admin@</code> vira admin.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Logado com sucesso!</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Empresa (orgId)</label>
                <input
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={org}
                  onChange={e => setOrg(e.target.value)}
                  placeholder="orgId (ex: nassautec)"
                />
              </div>
              <a
                className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                href={`/dashboard?token=${encodeURIComponent(token)}&org=${encodeURIComponent(org)}`}
              >
                Ir para Dashboard
              </a>
              <a
                className="block w-full px-4 py-2 text-center text-white bg-gray-800 rounded-md hover:bg-gray-900"
                href={`/admin?token=${encodeURIComponent(token)}&org=${encodeURIComponent(org)}`}
              >
                Ir para Admin
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
