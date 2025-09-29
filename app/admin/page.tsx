'use client'
import { useEffect, useState } from 'react'


export default function AdminPage() {
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [fullUrl, setFullUrl] = useState('')
const [thumb, setThumb] = useState<File | null>(null)
const [teaser, setTeaser] = useState<File | null>(null)
const [token, setToken] = useState('')


useEffect(() => { setToken(localStorage.getItem('ADMIN_TOKEN') || '') }, [])


async function submit() {
if (!title || !thumb || !teaser || !fullUrl) { alert('Lengkapi semua field'); return }
if (!token) { alert('Masukkan ADMIN_TOKEN'); return }
const fd = new FormData()
fd.set('title', title)
fd.set('description', description)
fd.set('full_url', fullUrl)
fd.set('thumb', thumb)
fd.set('teaser', teaser)


const res = await fetch('/api/admin/videos', {
method: 'POST',
headers: { Authorization: `Bearer ${token}` },
body: fd,
})
const json = await res.json().catch(() => ({}))
if (!res.ok) alert(json.error || 'Gagal upload')
else alert('Upload sukses')
}


return (
<main className="mx-auto max-w-3xl px-4 py-6">
<div className="mb-3 text-sm text-white/70">Halaman ini tidak ditaut dari publik. Gunakan token untuk submit.</div>
<div className="grid gap-3">
<input className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm" placeholder="Judul" value={title} onChange={e=>setTitle(e.target.value)} />
<textarea className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm" placeholder="Deskripsi (opsional)" value={description} onChange={e=>setDescription(e.target.value)} />
<input className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm" placeholder="Full Video Link (eksternal)" value={fullUrl} onChange={e=>setFullUrl(e.target.value)} />


<label className="text-sm">Thumbnail</label>
<input type="file" accept="image/*" onChange={e=>setThumb(e.target.files?.[0]||null)} />
<label className="text-sm">Teaser Video</label>
<input type="file" accept="video/*" onChange={e=>setTeaser(e.target.files?.[0]||null)} />


<div className="mt-2 grid gap-2">
<input className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm" placeholder="ADMIN_TOKEN (tersimpan lokal)" value={token} onChange={e=>{setToken(e.target.value); localStorage.setItem('ADMIN_TOKEN', e.target.value)}} />
<button onClick={submit} className="py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 hover:from-emerald-500/30 hover:to-cyan-500/30 text-sm">Upload</button>
</div>
</div>
</main>
)
}
