import Container from '@/components/layout/Container'
import type { WorkFrontmatter } from '@/content/schema'

interface WorkGalleryProps {
  data: WorkFrontmatter
}

function hasImage(url?: string) {
  return url && url.length > 0 && (url.startsWith('http') || url.startsWith('data:'))
}

function ImageBlock({ src, alt, full }: { src: string; alt: string; full?: boolean }) {
  return (
    <div className={`aspect-[8/5] ${full ? '' : 'md:aspect-[4/5]'} overflow-hidden bg-bg-secondary`}>
      {hasImage(src) ? (
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  )
}

/**
 * Gallery with alternating 1-2-1-2 layout.
 * Row pattern: 1 full-width, 2 side-by-side, repeat.
 */
export default function WorkGallery({ data }: WorkGalleryProps) {
  if (data.galleryImages.length === 0) return null

  // Build rows: [1], [2], [1], [2], ...
  const rows: string[][] = []
  let idx = 0
  let isSingle = true

  while (idx < data.galleryImages.length) {
    if (isSingle) {
      rows.push([data.galleryImages[idx]])
      idx += 1
    } else {
      const pair = [data.galleryImages[idx]]
      if (idx + 1 < data.galleryImages.length) {
        pair.push(data.galleryImages[idx + 1])
        idx += 2
      } else {
        idx += 1
      }
      rows.push(pair)
    }
    isSingle = !isSingle
  }

  return (
    <section className="space-y-[0.667rem]">
      <Container className="space-y-[0.667rem]">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={row.length === 2 ? 'grid grid-cols-1 gap-[0.667rem] md:grid-cols-2' : ''}
          >
            {row.map((img, ci) => (
              <ImageBlock
                key={`${ri}-${ci}`}
                src={img}
                alt={`${data.title} gallery ${ri * 2 + ci + 1}`}
                full={row.length === 1}
              />
            ))}
          </div>
        ))}
      </Container>
    </section>
  )
}
