import { getAIPredictions } from '@/lib/services/ai'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, ShieldAlert, Target, Zap } from '@/components/Icons'

export default async function AICenterPage() {
 const predictions = await getAIPredictions()

 return (
  <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-900">
   <div>
    <h1 className="text-3xl font-bold tracking-tight text-indigo-500">TerraEngine AI</h1>
    <p className="text-sm text-slate-400 mt-1">Predictive risk analysis and autonomous detection center.</p>
   </div>

   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card className="bg-indigo-950/20 border-indigo-900/50">
     <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-indigo-600">Global Risk Score</CardTitle>
      <Brain className="h-4 w-4 text-indigo-500"/>
     </CardHeader>
     <CardContent>
      <div className="text-3xl font-bold text-indigo-500">72.4</div>
      <p className="text-xs text-indigo-600/80 mt-1">Elevated risk due to low humidity</p>
     </CardContent>
    </Card>

    <Card className="bg-blue-950/20 border-blue-900/50">
     <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-blue-600">Detection Confidence</CardTitle>
      <Target className="h-4 w-4 text-blue-500"/>
     </CardHeader>
     <CardContent>
      <div className="text-3xl font-bold text-blue-500">98.4%</div>
      <p className="text-xs text-blue-600/80 mt-1">Computer vision accuracy</p>
     </CardContent>
    </Card>

    <Card className="col-span-full md:col-span-2 lg:col-span-1 bg-white border-slate-200 shadow-sm">
     <CardHeader>
       <CardTitle>Latest Predictions</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      {predictions && predictions.length > 0 ? (
       predictions.map((pred: any) => (
        <div key={pred.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
         <div className="flex items-center gap-3">
          <Zap className={`w-4 h-4 ${pred.risk_score > 80 ? 'text-red-500' : 'text-amber-500'}`} />
          <div>
           <div className="text-sm font-bold text-slate-700">Risk Score: {pred.risk_score}</div>
           <div className="text-[10px] text-slate-500">{new Date(pred.prediction_date).toLocaleDateString()}</div>
          </div>
         </div>
         <div className="text-right">
          <span className="text-xs font-mono text-indigo-600">{pred.confidence}% Conf.</span>
         </div>
        </div>
       ))
      ) : (
       <div className="text-center text-slate-500 text-sm py-4">No AI predictions generated yet.</div>
      )}
     </CardContent>
    </Card>
   </div>
  </div>
 )
}
