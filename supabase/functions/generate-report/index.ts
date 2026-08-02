// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

serve(async (req: Request) => {
  try {
    const { report_id } = await req.json()
    if (!report_id) return new Response(JSON.stringify({ error: 'Missing report_id' }), { status: 400 })

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch report info
    const { data: report, error } = await supabaseAdmin.from('reports').select('*').eq('id', report_id).single()
    if (error) throw error

    // Simulate PDF Generation logic here
    const pdfBytes = new Uint8Array(10) // mock bytes

    // Upload to bucket
    const fileName = `report_${report_id}.pdf`
    await supabaseAdmin.storage.from('reports').upload(fileName, pdfBytes, { contentType: 'application/pdf' })
    const { data: publicUrlData } = supabaseAdmin.storage.from('reports').getPublicUrl(fileName)

    // Update report
    await supabaseAdmin.from('report_files').insert({
        report_id, file_name: fileName, file_url: publicUrlData.publicUrl, file_type: 'pdf'
    })
    await supabaseAdmin.from('reports').update({ status: 'ready' }).eq('id', report_id)

    return new Response(JSON.stringify({ message: 'Report generated successfully', url: publicUrlData.publicUrl }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
})
