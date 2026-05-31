import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, company, budget, message } = body as {
      name: string;
      email: string;
      company?: string;
      budget?: string;
      message: string;
    };

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // In production, you would send an email, save to DB, etc.
    // For now, log and return success
    console.log('Contact form submission:', { name, email, company, budget, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }
}
