// src/components/Header.tsx

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80"
        >
          JFUNKI
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/#projects" className="transition-colors hover:text-white">
            Projects
          </Link>
          <Link href="/about" className="transition-colors hover:text-white">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            Contact
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            RESUME
          </Link>
        </nav>
      </div>
    </header>
  );
}