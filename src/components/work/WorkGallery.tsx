import Container from '@/components/layout/Container'
import type { WorkFrontmatter } from '@/content/schema'

interface WorkGalleryProps {
  data: WorkFrontmatter
}

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-2xl bg-[#1a1a1a] p-6 sm:p-12 md:p-24">
      {/* Browser window */}
      <div className="overflow-hidden rounded-xl">
        {/* Title bar */}
        <div className="flex h-8 items-center gap-1.5 bg-[#2a2a2a] px-3">
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

/**
 * Gallery layout:
 * - 'full': all images stacked full-width
 * - 'pattern': repeating 1-2-2 row pattern
 */
export default function WorkGallery({ data }: WorkGalleryProps) {
  if (data.galleryImages.length === 0) return null

  if (data.galleryLayout === 'full') {
    return (
      <section className="space-y-6">
        <Container className="space-y-6">
          {data.galleryImages.map((img, i) => (
            <BrowserFrame key={i} src={img} alt={`${data.title} gallery ${i + 1}`} />
          ))}
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
              />
            ))}
          </div>
        ))}
      </Container>
    </section>
  )
}
