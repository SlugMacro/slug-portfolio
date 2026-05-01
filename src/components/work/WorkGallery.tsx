import Container from '@/components/layout/Container'
import type { WorkFrontmatter } from '@/content/schema'

interface WorkGalleryProps {
  data: WorkFrontmatter
}

function BrowserFrame({ src, alt, theme = 'dark' }: { src: string; alt: string; theme?: 'dark' | 'light' }) {
  const bg = theme === 'light' ? 'bg-[#e8e8e8]' : 'bg-[#1a1a1a]'
  const bar = theme === 'light' ? 'bg-[#f0f0f0]' : 'bg-[#2a2a2a]'

  return (
    <div className={`rounded-2xl ${bg} p-6 sm:p-12 md:p-24`}>
      {/* Browser window */}
      <div className="overflow-hidden rounded-xl">
        {/* Title bar */}
        <div className={`flex h-8 items-center gap-1.5 ${bar} px-3`}>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="w-full"
          loading="lazy"
        />
      </div>
    </div>
  )
}

function MobileFrame({ src, alt, theme = 'dark' }: { src: string; alt: string; theme?: 'dark' | 'light' }) {
  const bg = theme === 'light' ? 'bg-[#e8e8e8]' : 'bg-[#1a1a1a]'

  return (
    <div className={`flex aspect-[5/8] items-center justify-center rounded-2xl ${bg} p-8 sm:p-12`}>
      {/* Phone bezel */}
      <div className="w-full max-w-[280px] overflow-hidden rounded-[2.5rem] bg-black p-2 shadow-2xl ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src={src}
            alt={alt}
            className="w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Gallery layout:
 * - 'full': all images stacked full-width
 * - 'pattern': repeating 1-2-2 row pattern
 * - 'mobile': 2-col grid with phone mockup frames
 */
export default function WorkGallery({ data }: WorkGalleryProps) {
  if (data.galleryImages.length === 0) return null

  if (data.galleryLayout === 'mobile') {
    return (
      <section className="space-y-6">
        <Container>
          <div className="grid grid-cols-2 gap-6">
            {data.galleryImages.map((img, i) => (
              <MobileFrame key={i} src={img} alt={`${data.title} gallery ${i + 1}`} theme={data.galleryTheme} />
            ))}
          </div>
        </Container>
      </section>
    )
  }

  if (data.galleryLayout === 'mixed') {
    const browserImages = data.galleryImages.slice(0, 4)
    const mobileImages = data.galleryImages.slice(4)

    return (
      <section className="space-y-6">
        <Container className="space-y-6">
          {/* Browser frames — 1 per row */}
          {browserImages.map((img, i) => (
            <BrowserFrame key={i} src={img} alt={`${data.title} gallery ${i + 1}`} theme={data.galleryTheme} />
          ))}
          {/* Mobile frames — 2 per row */}
          {mobileImages.length > 0 && (
            <div className="grid grid-cols-2 gap-6">
              {mobileImages.map((img, i) => (
                <MobileFrame key={i} src={img} alt={`${data.title} gallery ${browserImages.length + i + 1}`} theme={data.galleryTheme} />
              ))}
            </div>
          )}
        </Container>
      </section>
    )
  }

  if (data.galleryLayout === 'full') {
    const pairs = new Set(data.galleryPairIndices ?? [])
    const elements: React.ReactNode[] = []
    let i = 0
    while (i < data.galleryImages.length) {
      if (pairs.has(i) && pairs.has(i + 1) && i + 1 < data.galleryImages.length) {
        const bg = data.galleryTheme === 'light' ? 'bg-[#e8e8e8]' : 'bg-[#1a1a1a]'
        elements.push(
          <div key={`pair-${i}`} className="grid grid-cols-2 gap-6">
            {[data.galleryImages[i], data.galleryImages[i + 1]].map((img, j) => (
              <div key={j} className={`flex items-center justify-center rounded-2xl ${bg} p-8 sm:p-12`}>
                <div className="w-full max-w-[280px] overflow-hidden rounded-[1.5rem]">
                  <img
                    src={img}
                    alt={`${data.title} gallery ${i + j + 1}`}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        )
        i += 2
      } else {
        elements.push(
          <BrowserFrame key={i} src={data.galleryImages[i]} alt={`${data.title} gallery ${i + 1}`} theme={data.galleryTheme} />
        )
        i++
      }
    }
    return (
      <section className="space-y-6">
        <Container className="space-y-6">
          {elements}
        </Container>
      </section>
    )
  }

  // Build rows: [1], [2], [2], [1], [2], [2], ...
  const pattern = [1, 2, 2]
  const rows: string[][] = []
  let idx = 0
  let step = 0

  while (idx < data.galleryImages.length) {
    const count = pattern[step % pattern.length]
    const row: string[] = []
    for (let i = 0; i < count && idx < data.galleryImages.length; i++) {
      row.push(data.galleryImages[idx])
      idx += 1
    }
    rows.push(row)
    step += 1
  }

  const gridClass = (len: number) => {
    if (len === 2) return 'grid grid-cols-1 gap-6 md:grid-cols-2'
    return ''
  }

  return (
    <section className="space-y-6">
      <Container className="space-y-6">
        {rows.map((row, ri) => (
          <div key={ri} className={gridClass(row.length)}>
            {row.map((img, ci) => (
              <BrowserFrame
                key={`${ri}-${ci}`}
                src={img}
                alt={`${data.title} gallery ${ri + ci + 1}`}
                theme={data.galleryTheme}
              />
            ))}
          </div>
        ))}
      </Container>
    </section>
  )
}
