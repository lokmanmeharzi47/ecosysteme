// Va chercher les données du capteur réel et les retourne dans un format neutre.
// Exécuté uniquement côté serveur (Next.js server component / route handler) :
// la clé et l'URL source ne sont jamais envoyées au navigateur.

const CHANNEL_ID = process.env.LIVE_SENSOR_CHANNEL_ID || '3286249'
const READ_KEY = process.env.LIVE_SENSOR_READ_KEY || '67SH5AGSDKLZ0UZU'
const LAST_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${READ_KEY}`

export interface LiveCapteurReading {
  temperature: number | null
  humidity: number | null
  ph: number | null
  ec: number | null
  azote: number | null
  phosphore: number | null
  potassium: number | null
  batterie: number | null
  measuredAt: string | null
}

export interface LiveCapteurHistoryPoint {
  time: string
  temperature: number | null
  humidity: number | null
  ph: number | null
  ec: number | null
  azote: number | null
  phosphore: number | null
  potassium: number | null
  batterie: number | null
}

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function mapFeed(feed: any): LiveCapteurHistoryPoint {
  return {
    time: feed.created_at,
    temperature: toNumber(feed.field1),
    humidity: toNumber(feed.field2),
    ph: toNumber(feed.field3),
    ec: toNumber(feed.field4),
    azote: toNumber(feed.field5),
    phosphore: toNumber(feed.field6),
    potassium: toNumber(feed.field7),
    batterie: toNumber(feed.field8),
  }
}

export async function getLiveCapteurReading(): Promise<LiveCapteurReading | null> {
  try {
    const res = await fetch(LAST_URL, { cache: 'no-store' })
    if (!res.ok) return null
    const feed = await res.json()
    if (!feed || typeof feed !== 'object') return null
    const mapped = mapFeed(feed)
    return { ...mapped, measuredAt: feed.created_at || null }
  } catch {
    // Ne fait jamais planter la page appelante : simplement pas de carte affichée
    return null
  }
}

// Historique des mesures, avec agrégation optionnelle façon ThingSpeak :
// method = 'average' | 'median' | 'sum' + minutes (regroupe les points par tranche de X minutes),
// round = nombre de décimales à conserver.
export interface HistoryOptions {
  results?: number
  method?: 'average' | 'median' | 'sum' | 'none'
  minutes?: number
  round?: number
}

function buildHistoryUrl({ results = 100, method = 'none', minutes, round }: HistoryOptions) {
  const url = new URL(`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json`)
  url.searchParams.set('api_key', READ_KEY)
  url.searchParams.set('results', String(Math.min(results, 200)))
  if (method !== 'none' && minutes && minutes > 0) {
    url.searchParams.set(method, String(minutes))
  }
  if (round !== undefined && round !== null && !Number.isNaN(round)) {
    url.searchParams.set('round', String(round))
  }
  return url.toString()
}

export async function getLiveCapteurHistory(
  optionsOrResults: HistoryOptions | number = {}
): Promise<LiveCapteurHistoryPoint[]> {
  const options: HistoryOptions = typeof optionsOrResults === 'number' ? { results: optionsOrResults } : optionsOrResults
  try {
    const res = await fetch(buildHistoryUrl(options), { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    const feeds = Array.isArray(data?.feeds) ? data.feeds : []
    return feeds.map(mapFeed)
  } catch {
    return []
  }
}
