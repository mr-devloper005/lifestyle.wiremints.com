'use client'

import Link from 'next/link'
import { ArrowRight, Mail, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-black text-white">
      <div className="border-y border-white/10 bg-[#111]">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-[-.04em] sm:text-5xl">Ready to distribute your next announcement with more confidence?</h2>
          <Link href="/contact" className="w-fit rounded-md bg-[var(--slot4-accent)] px-7 py-4 text-xs font-black uppercase tracking-[.16em] text-black">Request support</Link>
        </div>
      </div>
      <div className="mx-auto max-w-[1360px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.6fr_.6fr_.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-16 w-16 items-center justify-center bg-[var(--slot4-accent)] text-4xl font-black text-black">W</span>
              <span className="text-3xl font-black tracking-[-.05em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">{globalContent.footer?.description || 'Media distribution, announcements, and brand visibility resources in one focused public platform.'}</p>
          </div>
          <div>
            <h3 className="border-b border-white/25 pb-3 text-[10px] font-black uppercase tracking-[.22em] text-white/55">Navigation</h3>
            <div className="mt-4 grid gap-3">
              <Link href="/" className="group inline-flex items-center justify-between text-sm font-black uppercase tracking-[.08em] hover:text-[var(--slot4-accent)]">Home<ArrowRight className="h-4 w-4" /></Link>
              <Link href="/about" className="text-sm font-black uppercase tracking-[.08em] hover:text-[var(--slot4-accent)]">About</Link>
              <Link href="/contact" className="text-sm font-black uppercase tracking-[.08em] hover:text-[var(--slot4-accent)]">Contact</Link>
              <Link href="/search" className="text-sm font-black uppercase tracking-[.08em] hover:text-[var(--slot4-accent)]">Search</Link>
            </div>
          </div>
          <div>
            <h3 className="border-b border-white/25 pb-3 text-[10px] font-black uppercase tracking-[.22em] text-white/55">Account</h3>
            <div className="mt-4 grid gap-3">
              {session ? <button type="button" onClick={logout} className="text-left text-sm font-black uppercase tracking-[.08em] hover:text-[var(--slot4-accent)]">Logout</button> : <><Link href="/login" className="text-sm font-black uppercase tracking-[.08em] hover:text-[var(--slot4-accent)]">Sign in</Link><Link href="/signup" className="text-sm font-black uppercase tracking-[.08em] hover:text-[var(--slot4-accent)]">Sign up</Link></>}
            </div>
          </div>
          <div>
            <h3 className="border-b border-white/25 pb-3 text-[10px] font-black uppercase tracking-[.22em] text-white/55">Stay updated</h3>
            <form action="/signup" className="mt-4 flex gap-2">
              <label className="flex min-w-0 flex-1 items-center rounded-md border border-white/35 bg-white/10">
                <Mail className="ml-3 h-4 w-4 text-white/50" />
                <input name="email" type="email" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-white/40" />
              </label>
              <button className="rounded-md bg-[var(--slot4-accent)] px-4 text-xs font-black uppercase tracking-[.14em] text-black">Join</button>
            </form>
            <form action="/search" className="mt-3 flex items-center rounded-md border border-white/25 bg-white/5">
              <Search className="ml-3 h-4 w-4 text-white/45" />
              <input name="q" type="search" placeholder="Search updates" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-white/40" />
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 px-4 py-5 text-center text-[10px] font-black uppercase tracking-[.18em] text-white/45">© {year} {SITE_CONFIG.name}. Media distribution and public information.</div>
    </footer>
  )
}
