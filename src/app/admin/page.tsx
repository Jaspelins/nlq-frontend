"use client";
import { useState } from "react";
import { createOrg, setDatasource } from "@/lib/api";

export default function AdminPage() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const token = params.get("token") || "";
  const [name, setName] = useState("Nassau Tecnologia");
  const [slug, setSlug] = useState("nassautec");
  const [dsn, setDsn] = useState("postgres://postgres:postgres@localhost:5432/tenant_nassautec");
  const [msg, setMsg] = useState("");

  const doCreate = async () => {
    try { await createOrg(token, name, slug); setMsg("Empresa criada/atualizada ✅"); }
    catch (e:any) { setMsg("Erro: " + (e.message||e.toString())); }
  };

  const doDSN = async () => {
    try { await setDatasource(token, slug, dsn); setMsg("Datasource salvo ✅"); }
    catch (e:any) { setMsg("Erro: " + (e.message||e.toString())); }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Admin</h1>
      <div className="space-y-2">
        <label>Nome</label>
        <input className="border p-2 w-full" value={name} onChange={e=>setName(e.target.value)} />
        <label>Slug (orgId)</label>
        <input className="border p-2 w-full" value={slug} onChange={e=>setSlug(e.target.value)} />
        <button onClick={doCreate} className="px-4 py-2 bg-black text-white">Criar/Atualizar Empresa</button>
      </div>
      <div className="space-y-2">
        <label>Postgres DSN</label>
        <input className="border p-2 w-full" value={dsn} onChange={e=>setDsn(e.target.value)} />
        <button onClick={doDSN} className="px-4 py-2 bg-blue-700 text-white">Salvar Datasource</button>
      </div>
      {msg && <p className="text-sm text-slate-700">{msg}</p>}
    </main>
  );
}
