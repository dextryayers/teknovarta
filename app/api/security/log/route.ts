import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/postgres/db';
import { securityLogs } from '@/drizle/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, ipAddress, details } = body;

    if (!eventType || !ipAddress) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Insert log into database
    await db.insert(securityLogs).values({
      eventType,
      ipAddress,
      details: details || 'No details provided',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Security logging error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
