import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const validPassword = process.env.CASE_STUDY_PASSWORD;

    if (!validPassword) {
      return NextResponse.json(
        { valid: false, message: 'Password not configured' },
        { status: 500 }
      );
    }

    if (password === validPassword) {
      return NextResponse.json({ valid: true }, { status: 200 });
    }

    return NextResponse.json(
      { valid: false, message: 'Incorrect password' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { valid: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}
