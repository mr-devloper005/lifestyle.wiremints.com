import Link from 'next/link'
import { Award, BarChart3, Megaphone, Search, Send, ShieldCheck, Sparkles, Target } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, CompactIndexCard, getEditablePostImage, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const trustBadges = ['Newswire Ready', 'Brand Visibility', 'Media Reach', 'Reputation Lift', 'Fast Discovery', 'Public Updates', 'Search Friendly', 'Audience Growth']
const companyMarks = ['Nestle', 'Bridgei2i', 'BCG', 'Lazada', 'StratMg', 'Rankwatch']

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const heroImage = lead ? getEditablePostImage(lead) : '/placeholder.svg?height=900&width=1400'

  return (
    <section className="bg-black text-white">
      <div className={`${dc.shell.section} relative overflow-hidden py-16 text-center sm:py-20 lg:py-24`}>
        <div className="agency-float absolute left-6 top-12 hidden h-24 w-24 rounded-full border-4 border-[var(--slot4-accent)] opacity-40 lg:block" />
        <div className="agency-float absolute bottom-16 right-10 hidden h-32 w-32 rounded-full bg-[var(--slot4-accent)] opacity-15 lg:block" />
        <div className="mx-auto max-w-5xl">
          <p className="mx-auto inline-flex items-center gap-2 border-b-2 border-[var(--slot4-accent)] pb-2 text-lg font-semibold"><Sparkles className="h-5 w-5 text-[var(--slot4-accent)]" /> Media distribution that helps brands create awareness</p>
          <h1 className="mt-8 text-5xl font-black leading-[1.08] tracking-[-.055em] sm:text-6xl lg:text-7xl">Press release distribution that puts your story in motion.</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/78">Share announcements, earn media exposure, improve visibility, and give every update a polished public home built for discovery.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/search" className="rounded-md bg-[var(--slot4-accent)] px-9 py-4 text-sm font-black uppercase tracking-[.12em] text-black transition hover:bg-white">Start now</Link>
            <Link href="/contact" className="rounded-md border-2 border-[var(--slot4-accent)] px-9 py-4 text-sm font-black uppercase tracking-[.12em] text-white transition hover:bg-[var(--slot4-accent)] hover:text-black">Book consultation</Link>
          </div>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-[.8fr_1.2fr_.8fr]">
          <div className="agency-card bg-white p-5 text-left text-black">
            <p className="text-xs font-black uppercase tracking-[.18em] text-black/45">Current focus</p>
            <h2 className="mt-3 text-2xl font-black leading-tight">News-ready announcements with stronger context.</h2>
          </div>
          <Link href={lead ? postHref(primaryTask, lead, primaryRoute) : primaryRoute} className="group relative min-h-[280px] overflow-hidden rounded-[18px] border-4 border-[var(--slot4-accent)] bg-white text-left">
            <img src={heroImage} alt={lead?.title || SITE_CONFIG.name} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="rounded-md bg-[var(--slot4-accent)] px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-black">Featured update</span>
              <h2 className="mt-4 line-clamp-2 text-3xl font-black leading-tight text-white">{lead?.title || 'Latest media update'}</h2>
            </div>
          </Link>
          <div className="agency-card bg-[var(--slot4-accent)] p-5 text-left text-black">
            <p className="text-xs font-black uppercase tracking-[.18em] text-black/55">Distribution path</p>
            <div className="mt-5 grid gap-3 text-sm font-black">
              <span>01. Package the story</span>
              <span>02. Publish with clarity</span>
              <span>03. Expand discovery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 10)
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-14`}>
        <div className="text-center">
          <p className="text-lg font-black">Here&apos;s the truth:</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl">Good media visibility is hard to get. That&apos;s why teams use a focused distribution system.</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">
          {trustBadges.map((badge, index) => (
            <div key={badge} className="agency-card flex min-h-28 flex-col items-center justify-center bg-white p-4 text-center ring-1 ring-black/10">
              <Award className={`h-8 w-8 ${index % 2 ? 'text-black' : 'text-[#d7b800]'}`} />
              <span className="mt-3 text-xs font-black uppercase leading-tight tracking-[.08em]">{badge}</span>
            </div>
          ))}
        </div>
        {railPosts.length ? (
          <div className="mt-14 overflow-hidden">
            <div className="mb-5 flex items-end justify-between gap-5">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[.22em] text-black/45">Latest distribution feed</p>
                <h2 className="mt-2 text-4xl font-black tracking-[-.055em]">Updates on the move</h2>
              </div>
              <Link href={primaryRoute} className="hidden rounded-md border-2 border-black px-5 py-3 text-xs font-black uppercase tracking-[.14em] hover:bg-black hover:text-white sm:inline-flex">View all</Link>
            </div>
            <div className="agency-slider-track gap-5 pb-4">
              {[...railPosts, ...railPosts].map((post, index) => <RailPostCard key={`${post.id}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index % railPosts.length} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[1] || posts[0]
  const services = [
    { icon: Send, title: 'Create your brand signal with media releases', body: 'Turn announcements into clear, readable public updates that educate and invite attention.' },
    { icon: Target, title: 'Create demand for your brand', body: 'Place useful context in front of prospects and support the moments where they research you.' },
    { icon: ShieldCheck, title: 'Outshine competitors with reputation-first content', body: 'Build a trail of timely updates that supports trust, recognition, and wider discovery.' },
  ]
  return (
    <section className="bg-[#e9e9e9]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={feature ? getEditablePostImage(feature) : '/placeholder.svg?height=900&width=900'} alt={feature?.title || ''} className="agency-card aspect-[4/5] w-full object-cover" />
            <div className="grid gap-4">
              <div className="agency-card bg-black p-6 text-white">
                <p className="text-5xl font-black text-[var(--slot4-accent)]">16+</p>
                <p className="mt-2 text-sm font-bold leading-6 text-white/70">Years of content-led visibility experience.</p>
              </div>
              <img src={feature ? getEditablePostImage(feature) : '/placeholder.svg?height=700&width=900'} alt="" className="agency-card aspect-[4/3] w-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-black/45">Full-stack media visibility</p>
            <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl">We help public updates become useful visibility assets.</h2>
            <p className="mt-6 text-lg leading-8 text-black/70">From release copy and context to discovery-friendly publishing, the site gives each announcement a stronger reading experience without changing your existing data pipeline.</p>
            <ul className="mt-6 grid gap-3 text-base font-semibold text-black/78">
              <li>Creating publication-ready content blocks.</li>
              <li>Driving traffic and trust through useful media pages.</li>
              <li>Supporting visibility with search, categories, and related posts.</li>
            </ul>
          </div>
        </div>

        <h2 className="mt-16 text-center text-3xl font-black tracking-[-.04em]">This is how you can use our services:</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="agency-card bg-white p-8 text-center transition hover:-translate-y-1">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--slot4-accent)]"><service.icon className="h-9 w-9" /></div>
              <h3 className="mt-6 text-2xl font-black leading-tight">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-black/68">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = (collected.length ? collected : posts).slice(0, 9)
  const lead = source[0] || posts[0]
  const briefs = source.slice(1, 6)
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-[-.04em]">Trusted by brands that need clearer public visibility</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-2xl font-black text-black/35">
            {companyMarks.map((mark) => <span key={mark}>{mark}</span>)}
          </div>
        </div>

        <div className="mt-16 grid gap-8 rounded-[18px] bg-black p-6 text-white lg:grid-cols-[.75fr_.55fr_.9fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-black leading-tight tracking-[-.05em]">Book a consultation with us</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-white/75">Take the first step toward improving distribution, visibility, and announcement quality.</p>
            <Link href="/contact" className="mt-7 w-fit rounded-md border-2 border-[var(--slot4-accent)] bg-white px-7 py-4 text-sm font-black uppercase tracking-[.12em] text-black hover:bg-[var(--slot4-accent)]">Schedule a free consultation</Link>
          </div>
          <div className="agency-float relative mx-auto flex h-72 w-72 items-center justify-center rounded-full border-[14px] border-[var(--slot4-accent)] bg-white/10">
            <Megaphone className="h-24 w-24 text-[var(--slot4-accent)]" />
          </div>
          <div className="grid gap-4">
            {['Email confirmation', 'Call from support team', 'Requirement understanding', 'Consultation call'].map((item, index) => (
              <div key={item} className={`rounded-xl p-4 text-black ${index % 2 ? 'bg-[var(--slot4-accent)]' : 'bg-white'}`}>
                <p className="font-black">{item}</p>
                <p className="mt-1 text-sm leading-6 text-black/70">We keep the next step clear, simple, and focused on what your announcement needs.</p>
              </div>
            ))}
          </div>
        </div>

        {lead ? (
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-start">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[.22em] text-black/45">Success stories</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-.055em]">Our latest media stories</h2>
              <div className="mt-6 grid gap-5">
                <ArticleListCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} index={0} />
                {briefs.slice(0, 2).map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index + 1} />)}
              </div>
            </div>
            <aside className="rounded-[18px] bg-[#f2f2f2] p-6">
              <h3 className="text-2xl font-black">The briefing</h3>
              <div className="mt-2">
                {briefs.map((post, index) => <CompactIndexCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
              </div>
              <form action="/search" className="mt-8 rounded-[14px] bg-white p-4 shadow-sm">
                <p className="text-xl font-black tracking-[-.04em]">Search the full archive</p>
                <label className="mt-4 flex rounded-md border border-black/20 bg-white">
                  <Search className="ml-4 mt-4 h-4 w-4" />
                  <input name="q" placeholder={`Search ${taskLabel(primaryTask).toLowerCase()}`} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
                  <button className="bg-black px-5 text-xs font-black uppercase tracking-[.14em] text-white">Search</button>
                </label>
              </form>
            </aside>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  const faqs = [
    'What does media distribution include?',
    'How quickly can a release go live?',
    'Can I publish announcements without an image?',
    'How do categories and search help discovery?',
  ]
  return (
    <section className="bg-[#f3f3f3]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-black/45">Frequently asked questions</p>
            <h2 className="mt-3 text-4xl font-black leading-tight tracking-[-.05em]">Can&apos;t find what you are looking for?</h2>
            <Link href="/contact" className="mt-7 inline-flex rounded-md bg-[var(--slot4-accent)] px-7 py-4 text-sm font-black uppercase tracking-[.12em] text-black">Fill the form</Link>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <div key={faq} className="flex items-center justify-between rounded-md border border-black/10 bg-white px-5 py-4 text-lg font-black">
                <span>{faq}</span><span>+</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 rounded-[18px] bg-black p-8 text-center text-white sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-black"><BarChart3 className="h-8 w-8" /></div>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-.05em]">Partner with a media distribution platform that keeps content clear, searchable, and ready to share.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">Use the existing posts, categories, summaries, and images to create a stronger public presence without breaking the site&apos;s working data.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="rounded-md bg-[var(--slot4-accent)] px-7 py-4 text-xs font-black uppercase tracking-[.14em] text-black">Sign up</Link>
            <Link href="/search" className="rounded-md border border-white px-7 py-4 text-xs font-black uppercase tracking-[.14em] text-white hover:bg-white hover:text-black">Search updates</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
