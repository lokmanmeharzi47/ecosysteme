import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

serve(async (req) => {
  try {
    const { gateway_mac, sensor_mac, payload, battery, signal } = await req.json()
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find sensor
    const { data: sensor } = await supabaseAdmin.from('sensors').select('id, sensor_type_id').eq('mac_address', sensor_mac).single()
    if (!sensor) return new Response("Sensor not found", { status: 404 })

    // Insert reading
    await supabaseAdmin.from('sensor_readings').insert({
        sensor_id: sensor.id,
        payload,
        battery_level: battery,
        signal_strength: signal
    })

    // Also update sensor battery
    await supabaseAdmin.from('sensors').update({ battery_level: battery, status: 'active' }).eq('id', sensor.id)

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" }})
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
