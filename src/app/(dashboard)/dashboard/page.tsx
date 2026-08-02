import { getDashboardStats } from '@/lib/services/analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, AlertTriangle, Wifi, WifiOff, ShieldAlert, Target, Clock } from '@/components/Icons'
import { MapContainer } from '@/components/map/MapContainer'
import { getMapData } from '@/lib/services/map'

export default async function DashboardPage() {
 const stats = await getDashboardStats()
 const mapData = await getMapData()

 return (
  <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-900">
   <div>
    <h1 className="text-3xl font-bold tracking-tight">National Overview</h1>
    <p className="text-sm text-slate-400 mt-1">Real-time ecosystem and fire monitoring dashboard.</p>
   </div>
   
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {/* Active Fires */}
    <Card className="bg-red-50 border-red-100 hover:bg-red-100 transition-colors">
     <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-red-600">Active Fires</CardTitle>
      <Activity className="h-4 w-4 text-red-500 animate-pulse"/>
     </CardHeader>
     <CardContent>
      <div className="text-3xl font-bold text-red-500">{stats.activeFires}</div>
      <p className="text-xs text-red-600 mt-1">Immediate action required</p>
     </CardContent>
    </Card>

    {/* Critical Alerts */}
    <Card className="bg-amber-50 border-amber-100 hover:bg-amber-100 transition-colors">
     <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-amber-600">Critical Alerts</CardTitle>
      <AlertTriangle className="h-4 w-4 text-amber-500"/>
     </CardHeader>
     <CardContent>
      <div className="text-3xl font-bold text-amber-500">{stats.criticalAlerts}</div>
      <p className="text-xs text-amber-600 mt-1">Awaiting acknowledgment</p>
     </CardContent>
    </Card>

    {/* Online Sensors */}
    <Card className="bg-emerald-50 border-emerald-100 hover:bg-emerald-100 transition-colors">
     <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-emerald-600">Online Sensors</CardTitle>
      <Wifi className="h-4 w-4 text-emerald-500"/>
     </CardHeader>
     <CardContent>
      <div className="text-3xl font-bold text-emerald-500">{stats.onlineSensors}</div>
      <p className="text-xs text-emerald-600 mt-1">Network operational</p>
     </CardContent>
    </Card>

    {/* Offline Sensors */}
    <Card className="bg-white border-slate-200 hover:bg-slate-50 transition-colors">
     <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-slate-400">Offline Sensors</CardTitle>
      <WifiOff className="h-4 w-4 text-slate-500"/>
     </CardHeader>
     <CardContent>
      <div className="text-3xl font-bold text-slate-700">0</div>
      <p className="text-xs text-slate-500 mt-1">Maintenance required</p>
     </CardContent>
    </Card>
   </div>

   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    <Card className="col-span-5 bg-white border-slate-200 shadow-sm p-4 overflow-hidden flex flex-col">
     <CardHeader className="px-0 pt-0">
       <CardTitle>Live GIS Map</CardTitle>
     </CardHeader>
     <div className="w-full flex-1 relative min-h-[500px]">
       <MapContainer {...mapData} />
     </div>
    </Card>

    <div className="col-span-2 space-y-4 flex flex-col">
     <Card className="bg-white border-slate-200 shadow-sm flex-1">
      <CardHeader>
       <CardTitle className="flex items-center gap-2">
        <Target className="w-4 h-4 text-indigo-600"/> Detection Accuracy
       </CardTitle>
      </CardHeader>
      <CardContent>
       <div className="text-4xl font-bold text-indigo-600">98.4%</div>
       <p className="text-xs text-slate-400 mt-2">TerraEngine AI Model</p>
      </CardContent>
     </Card>

     <Card className="bg-white border-slate-200 shadow-sm flex-1">
      <CardHeader>
       <CardTitle className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-600"/> Response Time
       </CardTitle>
      </CardHeader>
      <CardContent>
       <div className="text-4xl font-bold text-blue-600">1m 45s</div>
       <p className="text-xs text-slate-400 mt-2">Average time to alert</p>
      </CardContent>
     </Card>

     <Card className="bg-white border-slate-200 shadow-sm flex-1">
      <CardHeader>
       <CardTitle className="flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-orange-600"/> Average Risk
       </CardTitle>
      </CardHeader>
      <CardContent>
       <div className="text-4xl font-bold text-orange-600">Medium</div>
       <p className="text-xs text-slate-400 mt-2">Based on current weather & vegetation</p>
      </CardContent>
     </Card>
    </div>
   </div>
  </div>
 )
}
