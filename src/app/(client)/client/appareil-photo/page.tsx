import { createClient } from '@/utils/supabase/server';
import AppareilPhotoClient from './AppareilPhotoClient';
import { redirect } from 'next/navigation';

export default async function ClientAppareilPhotoPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return <AppareilPhotoClient />;
}
