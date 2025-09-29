'use client';

import { useEffect, useMemo, useState } from 'react';

export default function AdminPage() {
  // form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullUrl, setFullUrl] = useState('');
  const [thumb, setThumb] = useState<File | null>(null);
  const [teaser, setTeaser] = useState<File | null>(null);

  // token
  const [token, setToken] = useState('');
  useEffect(() => {
    const t = localStorage.getItem('ADMIN_TOKEN') || '';
    if (t) setToken(t);
  }, []);

  // UI state
  const [loading, setLoading] = useState(false);
  const canSubmit = useMemo(
    () => !!title && !!fullUrl && !!thumb && !!teaser && !!token && !loading,
    [title, fullUrl, thumb, teaser, token, loading]
  );

  async function submit() {
    try {
      if (!canSubmit) return;
      setLoading(true);

      const fd = new FormData();
      fd.set('title', title);
      fd.set('description', description);
      fd.set('full_url', fullUrl);
      fd.set('thumb', thumb!);
      fd.set('teaser', teaser!);

      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || 'Upload gagal');

      alert('✅ Upload sukses');
      // reset form
      setTitle(''); setDescription(''); setFullUrl('');
      setThumb(null); setTeaser(null);
    } catch (e: any) {
      console.error(e);
      alert(`❌ ${e.message || 'Terjadi kesalahan'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-lg font-semibold mb-2">Admin — Upload Teaser</h1>
      <p className="text-sm text-white/60 mb-4">
        Halaman ini private (tidak ditaut dari public). Wajib isi <code>ADMIN_TOKEN</code>.
      </p>

      <div className="grid gap-3">
        <label className="text-sm">ADMIN_TOKEN</label>
        <input
          className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm"
          placeholder="Tempel ADMIN_TOKEN di sini"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            localStorage.setItem('ADMIN_TOKEN', e.target.value);
          }}
        />

        <label className="text-sm">Judul</label>
        <input
          className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-sm">Deskripsi (opsional)</label>
        <textarea
          className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm"
          placeholder="Deskripsi singkat…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <label className="text-sm">Full Video Link (eksternal)</label>
        <input
          className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm"
          placeholder="https://contoh.com/full-video"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
        />

        <label className="text-sm">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumb(e.target.files?.[0] || null)}
        />

        <label className="text-sm">Teaser Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setTeaser(e.target.files?.[0] || null)}
        />

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className={[
            'relative z-10 pointer-events-auto py-2 rounded-xl text-sm border transition',
            canSubmit
              ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 hover:from-emerald-500/30 hover:to-cyan-500/30'
              : 'bg-white/10 border-white/15 text-white/50 cursor-not-allowed',
          ].join(' ')}
        >
          {loading ? 'Uploading…' : 'Upload'}
        </button>

        {!token && (
          <p className="text-xs text-amber-300/90">
            🔐 Masukkan ADMIN_TOKEN dulu supaya tombol aktif.
          </p>
        )}
      </div>
    </main>
  );
}
