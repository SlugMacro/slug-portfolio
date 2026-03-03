import Container from '@/components/layout/Container'
import type { WorkFrontmatter } from '@/content/schema'

interface WorkGalleryProps {
  data: WorkFrontmatter
}

function hasImage(url?: string) {
  return url && url.length > 0 && (url.startsWith('http') || url.startsWith('data:'))
}

export default function WorkGallery({ data }: WorkGalleryProps) {
  if (data.galleryImages.length === 0) return null

  return (
    <section className="py-8">
      <Container>
        <div className="grid grid-cols-1 gap-[0.667rem] md:grid-cols-2">
          {data.galleryImages.map((img, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden bg-bg-secondary">
              {hasImage(img) ? (
                <img
                  src={img}
                  alt={`${data.title} gallery ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
