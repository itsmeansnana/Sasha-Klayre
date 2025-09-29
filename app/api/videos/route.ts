export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { supabaseService } from '@/lib/supabase';

export async function GET() {
  const sb = supabaseService();
  const { data, error } = await sb
    .from('videos')
    .select('id,title,description,thumb_url,teaser_url,full_url,published,created_at')
    .order('created_at', { ascending: false, nullsFirst: false });

  const body = JSON.stringify({
    error: error?.message ?? null,
    data: (data ?? []).filter(v => v.published === true),
  });

  return new Response(body, {
    status: error ? 500 : 200,
    headers: {
      'Content-Type': 'application/json',
      // ← cegah cache di CDN/browser
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      'Surrogate-Control': 'no-store',
    },
  });
}
