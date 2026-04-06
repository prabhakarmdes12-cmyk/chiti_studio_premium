import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  intentCategory: string;
}

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();

    console.log('New lead captured:', {
      name: leadData.name,
      email: leadData.email,
      projectType: leadData.projectType,
      budget: leadData.budget,
      timeline: leadData.timeline,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Lead captured successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Lead API is running. Use POST to submit leads.' },
    { status: 200 }
  );
}