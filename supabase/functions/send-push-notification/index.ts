import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { user_id, title, body } = await req.json()
    if (!user_id || !title) return new Response("Missing parameters", { status: 400 })

    // Simulate sending Push Notification via FCM / OneSignal
    console.log(`Sending Push to ${user_id}: ${title} - ${body}`)
    
    return new Response(JSON.stringify({ success: true, message: 'Push sent' }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
