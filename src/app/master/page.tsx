'use client';

import { useState, useEffect } from 'react';

export default function MasterPage() {
  const [token, setToken] = useState<string | null>(null);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [dbCredentials, setDbCredentials] = useState<{ user: string; pass: string; host: string; port: string; db: string; } | null>(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [users, setUsers] = useState<string[]>([]); // To be fetched from the backend
  const [companies, setCompanies] = useState<string[]>([]); // To be fetched from the backend

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    setToken(token);

    // Dummy data for users and companies
    setUsers(['user1@example.com', 'user2@example.com']);
    setCompanies(['Company A', 'Company B']);
  }, []);

  const handleCreateUser = async () => {
    const res = await fetch('/api/master/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newUserEmail, password: newUserPassword }),
    });
    const data = await res.json();
    setMessage(data.message);
    setNewUserEmail('');
    setNewUserPassword('');
  };

  const handleCreateCompany = async () => {
    const res = await fetch('/api/master/create-company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName: newCompanyName }),
    });
    const data = await res.json();
    setMessage(data.message);
    setDbCredentials(data.dbCredentials);
    setNewCompanyName('');
  };

  const handleLinkUserToCompany = async () => {
    const res = await fetch('/api/master/link-user-to-company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUser, companyId: selectedCompany }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  if (token !== 'master-token') {
    return (
      <main className="max-w-xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Acesso Negado</h1>
        <p>Você não tem permissão para acessar esta página.</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Página do Master</h1>
      <p>Bem-vindo, usuário Master!</p>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Criar Novo Usuário</h2>
        <input
          className="border p-2 w-full"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="E-mail do novo usuário"
        />
        <input
          className="border p-2 w-full"
          type="password"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          placeholder="Senha do novo usuário"
        />
        <button onClick={handleCreateUser} className="px-4 py-2 bg-black text-white">
          Criar Usuário
        </button>
        {message && <p className="text-green-600">{message}</p>}
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Criar Nova Empresa</h2>
        <input
          className="border p-2 w-full"
          value={newCompanyName}
          onChange={(e) => setNewCompanyName(e.target.value)}
          placeholder="Nome da nova empresa"
        />
        <button onClick={handleCreateCompany} className="px-4 py-2 bg-black text-white">
          Criar Empresa
        </button>
      </div>

      {dbCredentials && (
        <div className="space-y-3">
            <h2 className="text-xl font-semibold">Credenciais do Banco de Dados</h2>
            <p>Usuário: {dbCredentials.user}</p>
            <p>Senha: {dbCredentials.pass}</p>
            <p>Host: {dbCredentials.host}</p>
            <p>Porta: {dbCredentials.port}</p>
            <p>Banco: {dbCredentials.db}</p>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Vincular Usuário à Empresa</h2>
        <select
          className="border p-2 w-full"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
        <select
          className="border p-2 w-full"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">Selecione uma empresa</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        <button onClick={handleLinkUserToCompany} className="px-4 py-2 bg-black text-white">
          Vincular
        </button>
      </div>
    </main>
  );
}
