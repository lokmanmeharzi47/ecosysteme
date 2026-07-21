'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

// Dynamically load the MapComponent to avoid SSR issues with Leaflet
const DynamicMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full min-h-[500px] rounded-xl" />
})

interface MapContainerProps {
  sensors?: any[]
  incidents?: any[]
  alerts?: any[]
  riskZones?: any[]
  onSensorClick?: (sensor: any) => void
  selectedSensorId?: string
}

export function MapContainer(props: MapContainerProps) {
  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black/20 backdrop-blur-md">
      <DynamicMap {...props} />
    </div>
  )
}
