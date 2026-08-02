import { createClient } from '@/utils/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Bell, AlertTriangle, Info } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function NotificationsPage() {
 const supabase = await createClient()
 
 const { data: notifications } = await supabase
   .from('system_notifications')
   .select('*')
   .order('created_at', { ascending: false })

 return (
  <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-900">
   <div>
    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Notifications Center</h1>
    <p className="text-sm text-slate-400 mt-1">Real-time alerts and system logs.</p>
   </div>

   <div className="grid gap-4 max-w-4xl">
    {notifications && notifications.length > 0 ? (
     notifications.map((notif: any) => (
      <Card key={notif.id} className="bg-white border-slate-200 shadow-sm">
       <CardContent className="p-4 flex items-start gap-4">
        <div className="mt-1 shrink-0">
         {notif.type === 'critical' ? <AlertTriangle className="w-5 h-5 text-red-500"/> :
          notif.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-500"/> :
          <Info className="w-5 h-5 text-blue-500"/>}
        </div>
        <div className="flex-1">
         <h4 className={`text-sm font-bold ${
          notif.type === 'critical' ? 'text-red-600' :
          notif.type === 'warning' ? 'text-amber-600' :
          'text-blue-600'
         }`}>{notif.title}</h4>
         <p className="text-sm text-slate-700 mt-1">{notif.message}</p>
         <p className="text-xs text-slate-500 mt-2">{notif.time_label || new Date(notif.created_at).toLocaleString('fr-FR')}</p>
        </div>
       </CardContent>
      </Card>
     ))
    ) : (
     <div className="text-slate-500 text-sm">No notifications found.</div>
    )}
   </div>
  </div>
 )
}
