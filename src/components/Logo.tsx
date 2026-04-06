"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-on-primary font-headline font-bold text-lg">C</span>
        </div>
        <div className="absolute inset-0 rounded-lg border border-white/[0.1]" />
      </div>
      <span className="text-on-surface font-headline font-bold text-lg tracking-[-0.02em]">
        CHITI
      </span>
    </Link>
  );
}
