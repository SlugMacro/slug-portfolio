import Container from '@/components/layout/Container'
import type { WorkFrontmatter } from '@/content/schema'

interface WorkHeroProps {
  data: WorkFrontmatter
}

function hasImage(url?: string) {
  return url && url.length > 0 && (url.startsWith('http') || url.startsWith('data:'))
}

export default function WorkHero({ data }: WorkHeroProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <h1 className="text-[clamp(2rem,5vw,4.44rem)] leading-[1.08] font-normal tracking-[-0.02em]">
          {data.title}
        </h1>
        <p className="mt-2 text-[clamp(1rem,2vw,1.5rem)] font-light text-text-secondary">
          {data.subtitle}
        </p>
      </Container>

      {/* Hero image */}
      <Container className="mt-8">
        <div className="aspect-[16/9] w-full overflow-hidden bg-bg-secondary">
          {hasImage(data.heroImage) ? (
            <img
              src={data.heroImage}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
      </Container>
    </section>
  )
}
