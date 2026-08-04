import { NextResponse } from 'next/server'
import { getLiveCapteurReading } from '@/lib/services/live-capteur'

export async function GET() {
  const reading = await getLiveCapteurReading()
  return NextResponse.json({ reading })
}
