import { NextRequest, NextResponse } from 'next/server'
import { getLiveCapteurHistory } from '@/lib/services/live-capteur'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const results = Number(searchParams.get('results')) || 100
  const method = (searchParams.get('method') as 'average' | 'median' | 'sum' | 'none') || 'none'
  const minutes = Number(searchParams.get('minutes')) || undefined
  const roundParam = searchParams.get('round')
  const round = roundParam !== null ? Number(roundParam) : undefined

  const history = await getLiveCapteurHistory({ results, method, minutes, round })
  return NextResponse.json({ history })
}
