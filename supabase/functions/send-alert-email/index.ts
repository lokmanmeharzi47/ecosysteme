// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req: Request) => {
  try {
    const { email, alert_id, message } = await req.json()
    if (!email || !message) return new Response("Missing parameters", { status: 400 })

    // Simulate sending email via Resend / SendGrid
    console.log(`Sending email to ${email} for alert ${alert_id}: ${message}`)
    
    // fetch('https://api.resend.com/emails', { ... })

    return new Response(JSON.stringify({ success: true, message: 'Email sent' }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
