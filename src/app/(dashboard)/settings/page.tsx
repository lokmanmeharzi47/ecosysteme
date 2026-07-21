import { createClient } from '@/utils/supabase/server';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const supabase = await createClient();
  
  // Fetch settings, or return default values if none exist
  const { data: settings } = await supabase
    .from('system_settings')
    .select('*')
    .single();

  const initialGeneral = {
    orgName: settings?.org_name || 'Ecosystem Monitoring National Forest Agency',
    adminEmail: settings?.admin_email || 'ecosystems.monitoring.dz@gmail.com',
    notifEmail: settings?.notif_email ?? true,
    notifSMS: settings?.notif_sms ?? true,
  };

  const initialLora = {
    frequencyBand: settings?.lora_band || 'EU868 (Algérie)',
    pingInterval: settings?.lora_ping || '120s',
    appEUI: settings?.lora_appeui || '70B3D57ED000B2A4',
    appKey: settings?.lora_appkey || '●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●',
  };

  const initialAi = {
    thermalThreshold: settings?.ai_thermal || '38°C',
    smokeThreshold: settings?.ai_smoke || '60 ppm',
    frameRate: settings?.ai_framerate || '5 fps',
    confidenceAlert: settings?.ai_confidence || '80%',
  };

  return (
    <SettingsClient 
      initialGeneral={initialGeneral}
      initialLora={initialLora}
      initialAi={initialAi}
    />
  );
}
