import { createClient } from '@/utils/supabase/server';
import SettingsClient from './SettingsClient';
import { redirect } from 'next/navigation';

export default async function ClientSettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: orgData } = await supabase
    .from('user_organizations')
    .select(`
      organization:organization_id (
        id,
        name
      )
    `)
    .eq('user_id', user.id)
    .limit(1)
    .single();

  const initialProfile = {
    name: profileData?.full_name || user.email?.split('@')[0] || "Karim Benali",
    email: user.email || "karim.benali@organisation.dz",
    phone: "+213 (0) 661 23 45 67",
    organisation: (orgData?.organization as any)?.name || "Direction des Forêts de Béjaïa",
    notifEmail: true,
    notifSMS: true
  };

  return <SettingsClient initialProfile={initialProfile} />;
}
