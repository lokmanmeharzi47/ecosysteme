import { getActiveIncidents } from '@/lib/services/incidents'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapContainer } from '@/components/map/MapContainer'

export default async function FireMonitoringPage() {
 const incidents = await getActiveIncidents()

 return (
  <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-900">
   <div>
    <h1 className="text-3xl font-bold tracking-tight text-orange-500">Fire Monitoring</h1>
    <p className="text-sm text-slate-400 mt-1">Live tracking of fire incidents and severity.</p>
   </div>
   
   <div className="grid gap-4 md:grid-cols-3">
    <Card className="col-span-2 bg-white border-slate-200 shadow-sm p-4 flex flex-col">
     <CardHeader className="px-0 pt-0">
       <CardTitle>Incident Map Synchronization</CardTitle>
     </CardHeader>
     <div className="w-full relative min-h-[500px] flex-1">
       <MapContainer incidents={incidents || []} />
     </div>
    </Card>

    <Card className="col-span-1 bg-white border-slate-200 shadow-sm">
     <CardHeader>
      <CardTitle>Active Incidents List</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      {incidents && incidents.length > 0 ? (
       incidents.map((incident: any) => (
        <div key={incident.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
         <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-slate-400">{incident.id.substring(0, 8)}</span>
          <span className={`text-[10px] px-2 py-1 rounded-full uppercase font-bold ${
           incident.severity === 'critical' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 
           'bg-orange-500/20 text-orange-500 border border-orange-500/50'
          }`}>
           {incident.severity}
          </span>
         </div>
         <div className="text-sm text-slate-700">Status: {incident.status}</div>
         <div className="text-xs text-slate-500 mt-1">Wind: {incident.wind_speed}km/h {incident.wind_direction}</div>
        </div>
       ))
      ) : (
       <div className="text-center text-slate-500 text-sm py-8">
        No active incidents found.
       </div>
      )}
     </CardContent>
    </Card>
   </div>
  </div>
 )
}
