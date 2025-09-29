export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { supabaseService } from '@/lib/supabase';

export async function GET() {
  const sb = supabaseService();

  // baca semua, tanpa RLS, lalu filter di kode
  const { data, error } = await sb
    .from('videos')
    .select('id,title,description,thumb_url,teaser_url,full_url,published,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: error.message, data: [] }, { status: 500 });
  }

  const publishedOnly = (data || []).filter(v => v.published === true);
  return Response.json({ data: publishedOnly });
}
