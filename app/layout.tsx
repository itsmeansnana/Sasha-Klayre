import './globals.css'
import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'


export const metadata: Metadata = {
title: 'Sasha klayre',
description: 'Teaser video → Full link + Ad slots',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<header className="sticky top-0 z-10 backdrop-blur border-b border-white/10">
<div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
<div className="relative">
<div className="absolute -inset-1 rounded-2xl blur-lg bg-gradient-to-r from-emerald-500/40 to-cyan-500/40" />
<div className="relative flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/60 border border-white/10">
<Sparkles className="h-5 w-5 text-emerald-400" />
<span className="font-semibold tracking-wide">Sasha klayre</span>
</div>
</div>
</div>
</header>
{children}
<footer className="mt-16 py-10 border-t border-white/10">
<div className="mx-auto max-w-7xl px-4 text-xs text-white/50">© {new Date().getFullYear()} Sasha klayre — Simple production build.</div>
</footer>
</body>
</html>
)
}
