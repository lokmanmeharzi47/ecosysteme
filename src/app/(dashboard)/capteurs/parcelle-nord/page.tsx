import { getLiveCapteurReading, getLiveCapteurHistory } from '@/lib/services/live-capteur'
import CapteurDetailClient from './CapteurDetailClient'

export default async function CapteurDetailPage() {
  const [reading, history] = await Promise.all([
    getLiveCapteurReading(),
    getLiveCapteurHistory(100),
  ])

  return <CapteurDetailClient initialReading={reading} initialHistory={history} />
}
