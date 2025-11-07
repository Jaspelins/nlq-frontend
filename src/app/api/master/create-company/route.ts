import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { companyName } = await request.json();

  // Add your logic to create a new company and database here

  const dbCredentials = {
    user: 'user_' + companyName.toLowerCase(),
    pass: 'pass_' + Math.random().toString(36).substring(2, 15),
    host: 'host.example.com',
    port: '5432',
    db: 'db_' + companyName.toLowerCase(),
  };

  return NextResponse.json({ 
    message: `Company ${companyName} created successfully`,
    dbCredentials 
  });
}
