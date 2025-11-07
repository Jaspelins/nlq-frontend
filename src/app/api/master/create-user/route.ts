import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Add your logic to create a new user in the database here

  return NextResponse.json({ message: `User ${email} created successfully` });
}
