"use client";
import { useEffect, useMemo, useState } from "react";
import { runNlq } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

export default function DashboardPage() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const token = params.get("token") || "";
  const org = params.get("org") || "nassautec";

  const [days, setDays] = useState(7);
  const [queue, setQueue] = useState("8002");
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const res = await runNlq(token, org, { alvo: queue, days });
      setData(res.data || []);
    } catch (e:any) {
      setError(e?.message || "Falha ao consultar");
    }
  };

  useEffect(() => { load(); }, []);

  const chartData = useMemo(() => data.map((d:any)=>({
    day: d.day, Atendidas: Number(d.total_answered||0), Perdidas: Number(d.total_unanswered||0)
  })), [data]);

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Dashboard – {org}</h1>
      <div className="flex gap-3">
        <input className="border p-2" value={queue} onChange={e=>setQueue(e.target.value)} placeholder="fila (ex: 8002)" />
        <input className="border p-2 w-24" type="number" value={days} onChange={e=>setDays(Number(e.target.value||7))} />
        <button onClick={load} className="px-4 py-2 bg-black text-white">Consultar</button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="h-80 bg-white border">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Atendidas" />
            <Line type="monotone" dataKey="Perdidas" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
