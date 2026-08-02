import { createClient } from '@/utils/supabase/server';
import AdminResponsesClient from './AdminResponsesClient';
import { redirect } from 'next/navigation';

export default async function ClientAdminResponsesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id, first_name, last_name')
    .eq('id', user.id)
    .single();

  const orgId = profile?.organization_id;

  // Fetch messages for this organization
  let query = supabase
    .from('messages')
    .select(`
      id, content, created_at, sender_id,
      profiles:sender_id (first_name, last_name, system_role)
    `)
    .order('created_at', { ascending: true });

  if (orgId) {
    query = query.eq('organization_id', orgId);
  }

  const { data: messages } = await query;

  const mappedMessages = messages?.map((msg: any) => {
    const isClient = msg.profiles?.system_role === 'client';
    const senderName = `${msg.profiles?.first_name || ''} ${msg.profiles?.last_name || ''}`.trim() || 'Utilisateur';

    return {
      id: msg.id,
      sender: (isClient ? 'client' : 'admin') as 'client' | 'admin',
      senderName: senderName,
      avatarLetter: senderName.charAt(0).toUpperCase() || 'U',
      avatarBg: isClient ? 'bg-emerald-600' : 'bg-blue-600',
      content: msg.content,
      time: new Date(msg.created_at).toLocaleDateString('fr-FR') + " " + new Date(msg.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})
    };
  }) || [];

  const initialThreads = [
    {
      id: "THD-MAIN",
      subject: "Assistance & Communication",
      sender: "Support Central",
      date: mappedMessages.length > 0 ? mappedMessages[mappedMessages.length - 1].time : "N/A",
      status: "Validé" as const,
      statusColor: "text-emerald-600 border-emerald-200",
      statusBg: "bg-emerald-50",
      messages: mappedMessages
    }
  ];

  return <AdminResponsesClient initialThreadsList={initialThreads} userId={user.id} orgId={orgId} />;
}
