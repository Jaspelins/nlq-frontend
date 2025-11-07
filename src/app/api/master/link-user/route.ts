import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, companyId } = body;

    if (!userId || !companyId) {
      return NextResponse.json({ error: 'ID do usuário e ID da empresa são obrigatórios.' }, { status: 400 });
    }

    // LÓGICA PARA CRIAR A ASSOCIAÇÃO NO BANCO DE DADOS
    // Exemplo: await db.userCompany.create({ data: { userId, companyId } });

    console.log(`API: Vinculando usuário ${userId} com empresa ${companyId}`);

    // Mock de resposta
    const linkage = {
      linkId: `link_${Date.now()}`,
      userId,
      companyId,
      linkedAt: new Date().toISOString(),
    };

    return NextResponse.json(linkage, { status: 201 });
  } catch (error) {
    console.error("Erro ao vincular usuário e empresa:", error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
