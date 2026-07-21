import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

serve(async (req) => {
  try {
    const { satellite_image_id } = await req.json()
    if (!satellite_image_id) return new Response("Missing parameters", { status: 400 })

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Simulate sending to external Python AI service
    console.log(`Analyzing satellite image ${satellite_image_id}`)
    
    // Simulate response
    const analysisResult = { ndvi: 0.75, ndwi: 0.2, anomalies: [] }

    await supabaseAdmin.from('satellite_analysis').insert({
        satellite_image_id,
        analysis_type: 'multi_spectral_index',
        result_data: analysisResult
    })

    return new Response(JSON.stringify({ success: true, analysis: analysisResult }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
