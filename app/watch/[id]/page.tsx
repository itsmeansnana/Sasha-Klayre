export const dynamic = 'force-dynamic';

import { supabaseAnon } from '@/lib/supabase'


async function getVideo(id: string) {
const sb = supabaseAnon()
const { data, error } = await sb.from('videos').select('*').eq('id', id).single()
if (error) return null
return data
}


export default async function WatchPage({ params }: { params: { id: string } }) {
const v = await getVideo(params.id)
if (!v) return <div className="mx-auto max-w-3xl px-4 py-10 text-white/70">Video not found.</div>


return (
<main className="mx-auto max-w-3xl px-4 py-6">
{/* Ad Slot — TOP */}
<div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-xs text-white/60">
Ad Slot — Top (Adsterra)
{/* Tempel snippet Adsterra di sini (gunakan next/script di client bila perlu) */}
</div>


<div className="mt-4 relative rounded-2xl overflow-hidden border border-white/10 bg-black/50">
{/* eslint-disable-next-line @next/next/no-img-element */}
<video src={v.teaser_url} poster={v.thumb_url} className="w-full max-h-[70vh]" controls playsInline />
</div>


<div className="mt-4">
<h1 className="text-xl font-semibold">{v.title}</h1>
{v.description && <p className="text-white/60 mt-1">{v.description}</p>}
<a href={v.full_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 mt-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 hover:from-emerald-500/30 hover:to-cyan-500/30">Tonton Full Video</a>
</div>


{/* Ad Slot — BOTTOM */}
<div className="mt-4 rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-xs text-white/60">
Ad Slot — Bottom (Adsterra)
</div>
</main>
)
}
