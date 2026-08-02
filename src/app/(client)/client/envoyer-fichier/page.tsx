import { createClient } from '@/utils/supabase/server';
import EnvoyerFichierClient, { SentFile } from './EnvoyerFichierClient';
import { redirect } from 'next/navigation';

export default async function ClientEnvoyerFichierPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();
  const orgId = profile?.organization_id;

  // Fetch sent documents
  let query = supabase.from('client_documents').select('*').order('created_at', { ascending: false });
  if (orgId) query = query.eq('organization_id', orgId);
  const { data: rawDocuments } = await query;

  const initialSentFiles: SentFile[] = rawDocuments?.map((doc: any) => ({
    id: doc.id.substring(0, 8).toUpperCase(),
    name: doc.file_name,
    size: doc.file_size || 'Inconnu',
    date: new Date(doc.created_at).toLocaleDateString('fr-FR') + " " + new Date(doc.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}),
    recipient: 'Admin', // default
    site: 'Région Associée', // We could fetch region names
    status: doc.status || "Reçu",
    statusColor: doc.status === 'Reçu et Validé' ? "text-emerald-600 border-emerald-200" : "text-blue-600 border-blue-200",
    statusBg: doc.status === 'Reçu et Validé' ? "bg-emerald-50" : "bg-blue-50"
  })) || [];

  return (
    <EnvoyerFichierClient 
      initialSentFiles={initialSentFiles} 
      userId={user.id} 
      orgId={orgId} 
    />
  );
}
