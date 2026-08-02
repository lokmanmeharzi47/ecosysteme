import { createClient } from '@/utils/supabase/server';
import UsersClient from './UsersClient';
import { redirect } from 'next/navigation';

export default async function UsersPage() {
 const supabase = await createClient();

 const { data: { user } } = await supabase.auth.getUser();

 if (!user) {
  redirect('/login');
 }

 // Fetch profiles from database
 const { data: profiles, error } = await supabase
  .from('profiles')
  .select('id, first_name, last_name, email, system_role, is_active, last_login')
  .order('created_at', { ascending: false });

 if (error) {
  console.error('Error fetching users:', error);
 }

 // Map database records to the User interface expected by the client
 const initialUsers = profiles?.map((p: any) => ({
  id: p.id,
  name: `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Utilisateur sans nom',
  email: p.email || 'Email non fourni',
  role: (p.system_role === 'admin' ? 'admin' : 'client') as 'admin' | 'client',
  status: (p.is_active ? 'Actif' : 'Suspendu') as 'Actif' | 'Suspendu',
  lastLogin: p.last_login 
   ? new Date(p.last_login).toLocaleDateString('fr-FR', {
     day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) 
   : 'Jamais'
 })) || [];

 return <UsersClient initialUsers={initialUsers} />;
}
