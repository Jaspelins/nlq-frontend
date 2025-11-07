import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validação básica
    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 });
    }

    // LÓGICA DE CRIAÇÃO DO USUÁRIO NO BANCO DE DADOS REAL AQUI
    // Exemplo: const newUser = await db.users.create({ data: { email, password } });

    console.log(`API: Criando usuário com email: ${email}`);
    
    // Mock de resposta
    const newUser = {
      id: `user_${Date.now()}`,
      email: email,
      role: 'user',
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
