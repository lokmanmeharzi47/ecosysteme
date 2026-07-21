import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

serve(async (req) => {
  try {
    const { site_id, fwi, isi, dmc, dc } = await req.json()
    if (!site_id) return new Response("Missing site_id", { status: 400 })

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Simulate ML Model processing
    const probability = Math.min(((fwi || 10) * (isi || 5)) / 1000, 1.0)
    const risk_level = probability > 0.8 ? 'Extreme' : probability > 0.5 ? 'High' : 'Low'

    const { data: prediction } = await supabaseAdmin.from('ai_predictions').insert({
        site_id,
        prediction_type: 'fire_risk',
        confidence: 95.5,
        risk_level,
        probability,
        features: { fwi, isi, dmc, dc }
    }).select().single()

    await supabaseAdmin.from('fire_risk_predictions').insert({
        prediction_id: prediction.id,
        fwi, isi, dmc, dc
    })

    return new Response(JSON.stringify({ success: true, prediction: risk_level, probability }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
