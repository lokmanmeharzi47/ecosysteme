import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { phone_number, message } = await req.json()
    if (!phone_number || !message) return new Response("Missing parameters", { status: 400 })

    // Simulate sending SMS via Twilio
    console.log(`Sending SMS to ${phone_number}: ${message}`)
    
    return new Response(JSON.stringify({ success: true, message: 'SMS sent' }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
