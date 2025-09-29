export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { supabaseAnon } from '@/lib/supabase'


export async function GET() {
const sb = supabaseAnon()
const { data, error } = await sb
.from('videos')
.select('id,title,description,thumb_url,teaser_url,full_url,created_at')
.eq('published', true)
.order('created_at', { ascending: false })


if (error) return Response.json({ error: error.message }, { status: 400 })
return Response.json({ data })
}
