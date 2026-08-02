import { getSensors } from '@/lib/services/sensors'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Radio, Battery, Signal, Thermometer, Droplets, Wind, CloudFog } from 'lucide-react'

export default async function SensorsPage() {
 const sensors = await getSensors()

 return (
  <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-900">
   <div>
    <h1 className="text-3xl font-bold tracking-tight text-emerald-500">Sensor Fleet</h1>
    <p className="text-sm text-slate-400 mt-1">Real-time telemetry and health status of all deployed LoRaWAN sensors.</p>
   </div>

   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {sensors && sensors.length > 0 ? (
     sensors.map((sensor: any) => (
      <Card key={sensor.id} className="bg-white border-slate-200 shadow-sm hover:border-emerald-500/50 transition-colors">
       <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-sm font-medium text-slate-700">
         {sensor.name}
         <span className={`w-2 h-2 rounded-full ${
          sensor.status === 'online' ? 'bg-emerald-500' :
          sensor.status === 'error' ? 'bg-red-500' :
          'bg-amber-500'
         }`} />
        </CardTitle>
       </CardHeader>
       <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400">
         <span className="flex items-center gap-1"><Radio className="w-3 h-3"/> {sensor.type}</span>
         <span className="font-mono text-[10px]">{sensor.id.substring(0, 8)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200">
         <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 flex items-center gap-1"><Battery className="w-3 h-3 text-emerald-600"/> Battery</span>
          <span className="text-sm font-bold">{sensor.battery_level}%</span>
         </div>
         <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-500 flex items-center gap-1"><Signal className="w-3 h-3 text-blue-600"/> Signal</span>
          <span className="text-sm font-bold">{sensor.signal_quality}%</span>
         </div>
        </div>
       </CardContent>
      </Card>
     ))
    ) : (
     <div className="col-span-full text-center text-slate-500 py-12">
      No sensors deployed yet.
     </div>
    )}
   </div>
  </div>
 )
}
