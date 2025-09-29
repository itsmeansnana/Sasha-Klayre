// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Video = { id: string; title: string; thumb_url: string; description?: string | null };

export default function Page() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/videos', { cache: 'no-store' });
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setVideos(json.data || []);
      } catch (e: any) {
        setErr(e.message || 'Fetch error');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {loading && <div className="text-white/60 text-sm">Loading…</div>}
      {err && <div className="text-rose-400 text-sm mb-3">Error: {err}</div>}
      {!loading && !err && videos.length === 0 && (
        <div className="text-white/60 text-sm">Belum ada video yang published.</div>
      )}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((v) => (
          <Link key={v.id} href={`/watch/${v.id}`} className="group text-left">
            <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.thumb_url} alt={v.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
              <div className="absolute bottom-2 left-2 right-2 text-sm line-clamp-2">{v.title}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
