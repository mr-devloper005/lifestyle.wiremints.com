import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Media update'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured release' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden rounded-[18px] bg-black text-white shadow-[0_28px_80px_rgba(0,0,0,.18)]">
      <div className="relative aspect-[16/10] min-h-[430px] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-700 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.9))]" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
          <span className="rounded-md bg-[var(--slot4-accent)] px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-black">{label}</span>
          <h3 className="mt-5 max-w-4xl text-4xl font-black leading-[.97] tracking-[-.055em] sm:text-6xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{getEditableExcerpt(post, 190)}</p>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const imageFirst = index % 3 === 1
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block shrink-0 snap-start overflow-hidden rounded-[16px] bg-white shadow-[0_18px_42px_rgba(0,0,0,.10)] ${dc.motion.lift}`}>
      {imageFirst ? (
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-md bg-black px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
        </div>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className={imageFirst ? 'p-4' : 'border-t-4 border-[var(--slot4-accent)] p-4'}>
        <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[.18em] text-black/55">
          <span>{getEditableCategory(post)}</span><span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-3 line-clamp-3 text-xl font-black leading-[1.06] tracking-[-.04em]">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[52px_1fr] gap-4 border-t border-black/15 py-5 first:border-t-0">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-lg font-black leading-none text-black">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-black/45"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-lg font-black leading-tight tracking-[-.03em] group-hover:text-black/60">{post.title}</h3>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const flipped = index % 2 === 1
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 rounded-[16px] bg-white p-4 shadow-[0_14px_34px_rgba(0,0,0,.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(0,0,0,.14)] sm:grid-cols-[240px_minmax(0,1fr)] ${flipped ? 'sm:[&>div:first-child]:order-2' : ''}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-2">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/50">{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
        <h2 className="mt-3 line-clamp-3 text-3xl font-black leading-[1.02] tracking-[-.05em]">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-black/62">{getEditableExcerpt(post, 190)}</p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-md border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-[.14em] group-hover:bg-black group-hover:text-white">Read update <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}
