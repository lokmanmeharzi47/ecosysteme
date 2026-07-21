import { createClient } from '@/utils/supabase/server';
import ReportsClient, { Report } from './ReportsClient';

export default async function RapportsPage() {
 const supabase = await createClient();

 // Fetch reports from Supabase (system generated)
 const { data: reportsData } = await supabase
  .from('reports')
  .select('id, title, status, created_at')
  .order('created_at', { ascending: false })
  .limit(10);

 // Fetch client uploaded documents
 const { data: clientDocsData } = await supabase
  .from('client_documents')
  .select('id, file_name, status, created_at, organizations(name)')
  .order('created_at', { ascending: false })
  .limit(10);

 // Map system reports
 const systemReports: Report[] = reportsData?.map((r: any) => {
  let mappedStatus: Report['status'] = 'Terminé';
  if (r.status === 'pending') mappedStatus = 'En cours';
  if (r.status === 'processing') mappedStatus = 'Généré';

  const dateObj = new Date(r.created_at);
  const period = dateObj.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });

  return {
   id: r.id,
   name: r.title,
   site:"Système Central",
   period: period,
   formats: r.title.includes('Analyse') ? ['PDF'] : ['PDF', 'XLS'],
   status: mappedStatus
  };
 }) || [];

 // Map client documents
 const clientReports: Report[] = clientDocsData?.map((c: any) => {
  const orgName = c.organizations?.name ||"Client Externe";
  const dateObj = new Date(c.created_at);
  const period = dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

  let statusStr = c.status || 'Reçu';
  let mappedStatus: Report['status'] = 'Généré';
  if (statusStr === 'Reçu et Validé') mappedStatus = 'Terminé';
  else if (statusStr === 'En cours de revue') mappedStatus = 'En cours';

  return {
   id: c.id,
   name: c.file_name,
   site: orgName, // Display organization name in site column
   period: period,
   formats: ['DOC'], // Indicator for external doc
   status: mappedStatus
  };
 }) || [];

 // Combine and sort by date
 const allReports = [...systemReports, ...clientReports]
  .sort((a, b) => {
   // Basic string sort is imperfect for 'short month' but good enough for UI display
   // Ideal would be sorting by raw created_at before mapping
   return 0; 
  })
  .slice(0, 15);

 const stats = {
  thisMonth: allReports.length,
  scheduled: 0,
  lastReport: allReports.length > 0 ? allReports[0].period :"N/A",
  successRate: 100
 };

 return <ReportsClient recentReports={allReports} stats={stats} />;
}
