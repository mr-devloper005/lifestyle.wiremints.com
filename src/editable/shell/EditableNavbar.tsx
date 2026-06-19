'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Phone, Search, Sparkles, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const displayName = session?.name?.trim() || session?.email?.split('@')[0] || 'Member'

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Search', href: '/search' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-[0_10px_34px_rgba(0,0,0,.2)]">
      <div className="agency-ticker bg-[#e9e9e9] py-2 text-sm font-semibold text-black">
        <div className="agency-ticker-track gap-10 px-4">
          {[0, 1].map((item) => (
            <span key={item} className="inline-flex items-center gap-8">
              <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#b99d00]" /> {SITE_CONFIG.name} helps brands distribute announcements and reach wider media networks.</span>
              <span className="font-black">Free visibility consultation.</span>
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Connect with our experts today</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid min-h-[120px] max-w-[1360px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center bg-[var(--slot4-accent)] text-4xl font-black leading-none text-black sm:h-20 sm:w-20 sm:text-5xl">W</span>
            <span className="hidden max-w-[9rem] text-[10px] font-black uppercase leading-tight tracking-[.16em] text-white/75 sm:block">{SITE_CONFIG.name}</span>
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-8 text-sm font-black uppercase tracking-[.03em] lg:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="hover:text-[var(--slot4-accent)]">{link.label}</Link>)}
          {session ? (
            <>
              <span className="rounded-md bg-white/10 px-3 py-2 text-[var(--slot4-accent)]">{displayName}</span>
              <Link href="/create" className="hover:text-[var(--slot4-accent)]">Create</Link>
              <button type="button" onClick={logout} className="hover:text-[var(--slot4-accent)]">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[var(--slot4-accent)]">Sign in</Link>
              <Link href="/signup" className="hover:text-[var(--slot4-accent)]">Sign up</Link>
            </>
          )}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <form action="/search" className="hidden items-center rounded-md border border-white/20 bg-white/10 lg:flex">
            <Search className="ml-3 h-4 w-4 text-white/65" />
            <input name="q" type="search" placeholder="Search" className="w-32 min-w-0 bg-transparent px-3 py-3 text-xs font-bold text-white outline-none placeholder:text-white/50 xl:w-44" />
          </form>
          <Link href="/contact" className="agency-pulse hidden rounded-md border-2 border-[var(--slot4-accent)] px-4 py-3 text-[10px] font-black uppercase tracking-[.14em] text-[var(--slot4-accent)] sm:inline-flex">
            Start now
          </Link>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/15 bg-black px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {session ? <div className="rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm font-black uppercase tracking-[.1em] text-[var(--slot4-accent)]">{displayName}</div> : null}
            {[...links, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="rounded-md bg-white px-4 py-3 text-sm font-black uppercase tracking-[.1em] text-black">{item.label}</Link>
            ))}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-md bg-[var(--slot4-accent)] px-4 py-3 text-left text-sm font-black uppercase tracking-[.1em] text-black">Logout</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
