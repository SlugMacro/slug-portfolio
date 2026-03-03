import Container from '@/components/layout/Container'

interface ContactHeroProps {
  name: string
  title: string
  coordinates: string
  location: string
}

export default function ContactHero({ name, title, coordinates, location }: ContactHeroProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <h1 className="text-[clamp(2rem,5vw,4.44rem)] leading-[1.08] font-normal tracking-[-0.02em]">
          {name}
        </h1>
        <p className="mt-2 text-[clamp(2rem,5vw,4.44rem)] leading-[1.08] font-normal tracking-[-0.02em] text-text-secondary">
          {title}
        </p>
        <p className="mt-6 text-[0.8125rem] tracking-wide text-text-secondary">
          {coordinates} — {location}
        </p>
      </Container>
    </section>
  )
}
