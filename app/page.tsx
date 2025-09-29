export const dynamic = 'force-dynamic';

import Link from "next/link";
import { supabaseAnon } from "@/lib/supabase";

export default async function Page() {
  const sb = supabaseAnon();
  const { data, error } = await sb
    .from("videos")
    .select("id,title,thumb_url,description")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const videos = data ?? [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((v: any) => (
          <Link key={v.id} href={`/watch/${v.id}`} className="group text-left">
            <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.thumb_url}
                alt={v.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
              <div className="absolute bottom-2 left-2 right-2 text-sm line-clamp-2">
                {v.title}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
