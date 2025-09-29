import { supabaseService } from '@/lib/supabase'


export const runtime = 'nodejs' // memastikan Buffer tersedia


export async function POST(req: Request) {
const auth = req.headers.get('authorization')
if (auth !== `Bearer ${process.env.ADMIN_TOKEN}`) {
return new Response('Unauthorized', { status: 401 })
}


const form = await req.formData()
const title = String(form.get('title') || '')
const description = String(form.get('description') || '')
const full_url = String(form.get('full_url') || '')
const thumb = form.get('thumb') as File | null
const teaser = form.get('teaser') as File | null


if (!title || !full_url || !thumb || !teaser) {
return new Response('Missing fields', { status: 400 })
}


const sb = supabaseService()
const [thumbBuf, teaserBuf] = await Promise.all([
thumb.arrayBuffer(),
teaser.arrayBuffer(),
])


const thumbPath = `thumbs/${crypto.randomUUID()}-${thumb.name}`
const teaserPath = `teasers/${crypto.randomUUID()}-${teaser.name}`


const up1 = await sb.storage.from('media').upload(thumbPath, Buffer.from(thumbBuf), { contentType: thumb.type })
if (up1.error) return Response.json({ error: up1.error.message }, { status: 400 })


const up2 = await sb.storage.from('media').upload(teaserPath, Buffer.from(teaserBuf), { contentType: teaser.type })
if (up2.error) return Response.json({ error: up2.error.message }, { status: 400 })


const { data: t1 } = sb.storage.from('media').getPublicUrl(thumbPath)
const { data: t2 } = sb.storage.from('media').getPublicUrl(teaserPath)


const ins = await sb.from('videos').insert({
title,
description,
full_url,
thumb_url: t1.publicUrl,
teaser_url: t2.publicUrl,
published: true,
})
if (ins.error) return Response.json({ error: ins.error.message }, { status: 400 })


return Response.json({ ok: true })
}
