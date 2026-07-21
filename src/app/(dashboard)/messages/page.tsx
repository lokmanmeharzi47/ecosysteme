import { createClient } from '@/utils/supabase/server';
import MessagesClient from './MessagesClient';
import { redirect } from 'next/navigation';

export default async function AdminMessagesPage() {
 const supabase = await createClient();

 const { data: { user } } = await supabase.auth.getUser();
 if (!user) redirect('/connexion');

 // Fetch all messages and group by organization
 const { data: messages } = await supabase
  .from('messages')
  .select(`
   id, content, created_at, sender_id, organization_id,
   profiles:sender_id (first_name, last_name, system_role),
   organizations:organization_id (id, name)
  `)
  .order('created_at', { ascending: true });

 // Group by organization ID
 const grouped: Record<string, any> = {};

 messages?.forEach((msg: any) => {
  const orgId = msg.organization_id;
  if (!grouped[orgId]) {
   grouped[orgId] = {
    id: orgId,
    organizationName: msg.organizations?.name || 'Organisation inconnue',
    messages: [],
    date: ''
   };
  }

  const isAdmin = msg.profiles?.system_role === 'admin';
  const senderName = `${msg.profiles?.first_name || ''} ${msg.profiles?.last_name || ''}`.trim() || 'Utilisateur';
  
  const formattedMsg = {
   id: msg.id,
   sender: (isAdmin ? 'admin' : 'client') as 'admin' | 'client',
   senderName: senderName,
   avatarLetter: senderName.charAt(0).toUpperCase() || 'U',
   avatarBg: isAdmin ? 'bg-blue-600' : 'bg-emerald-600',
   content: msg.content,
   time: new Date(msg.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})
  };

  grouped[orgId].messages.push(formattedMsg);
  grouped[orgId].date = new Date(msg.created_at).toLocaleDateString('fr-FR') +""+ formattedMsg.time;
 });

 const initialThreads = Object.values(grouped).sort((a: any, b: any) => {
  // Basic sort by most recent string, good enough for mock
  return b.date.localeCompare(a.date);
 });

 return <MessagesClient initialThreads={initialThreads} userId={user.id} />;
}
