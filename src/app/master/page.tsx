"use client";
import { useState } from "react";

// As funções da API agora farão chamadas de rede reais
async function apiPost(endpoint: string, data: any) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ocorreu um erro na API');
    }
    return response.json();
}

export default function MasterAdminPage() {
    const [section, setSection] = useState("createUser");

    // Estados para os formulários
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [userId, setUserId] = useState("");
    const [companyId, setCompanyId] = useState("");

    const [feedback, setFeedback] = useState<{ type?: "success" | "error", message?: string, data?: any }>({});

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback({});
        try {
            const data = await apiPost("/api/master/create-user", { email, password });
            setFeedback({ type: "success", message: "Usuário criado com sucesso!", data });
            setEmail("");
            setPassword("");
        } catch (error: any) {
            setFeedback({ type: "error", message: error.message });
        }
    };

    const handleCreateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback({});
        try {
            const data = await apiPost("/api/master/create-company", { name: companyName });
            setFeedback({ type: "success", message: "Empresa e banco de dados criados. Anote as credenciais para o 3CX:", data: data.dbCredentials });
            setCompanyName("");
        } catch (error: any) {
            setFeedback({ type: "error", message: error.message });
        }
    };

    const handleLinkUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback({});
        try {
            const data = await apiPost("/api/master/link-user", { userId, companyId });
            setFeedback({ type: "success", message: `Usuário ${userId} vinculado à empresa ${companyId}!`, data });
            setUserId("");
            setCompanyId("");
        } catch (error: any) {
            setFeedback({ type: "error", message: error.message });
        }
    };

    const renderSection = () => {
        switch (section) {
            case "createUser":
                return (
                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700">Criar Novo Usuário</h2>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email do usuário" required className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Criar Usuário</button>
                    </form>
                );
            case "createCompany":
                return (
                    <form onSubmit={handleCreateCompany} className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700">Criar Nova Empresa</h2>
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Nome da empresa" required className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">Criar Empresa e Gerar DB</button>
                    </form>
                );
            case "linkUser":
                return (
                    <form onSubmit={handleLinkUser} className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700">Vincular Usuário à Empresa</h2>
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="ID do Usuário" required className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <input type="text" value={companyId} onChange={(e) => setCompanyId(e.target.value)} placeholder="ID da Empresa" required className="w-full px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700">Vincular</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Painel Master</h1>
                    <nav className="flex space-x-4">
                        <button onClick={() => { setSection("createUser"); setFeedback({}); }} className={`px-3 py-2 rounded-md text-sm font-medium ${section === 'createUser' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}>
                            Criar Usuário
                        </button>
                        <button onClick={() => { setSection("createCompany"); setFeedback({}); }} className={`px-3 py-2 rounded-md text-sm font-medium ${section === 'createCompany' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'}`}>
                            Criar Empresa
                        </button>
                        <button onClick={() => { setSection("linkUser"); setFeedback({}); }} className={`px-3 py-2 rounded-md text-sm font-medium ${section === 'linkUser' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}>
                            Vincular Usuário
                        </button>
                    </nav>
                </div>
            </header>
            <main className="py-10">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        {renderSection()}
                    </div>
                    {feedback.message && (
                        <div className={`mt-6 p-4 rounded-md ${feedback.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            <p className="font-medium">{feedback.message}</p>
                            {feedback.data && (
                                <pre className="mt-2 p-2 bg-gray-800 text-white rounded-md text-sm overflow-x-auto">
                                    {JSON.stringify(feedback.data, null, 2)}
                                </pre>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
