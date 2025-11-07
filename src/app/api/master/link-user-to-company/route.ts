import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId, companyId } = await request.json();

  // Add your logic to link the user to the company in the database here

  return NextResponse.json({ message: `User ${userId} linked to company ${companyId} successfully` });
}
