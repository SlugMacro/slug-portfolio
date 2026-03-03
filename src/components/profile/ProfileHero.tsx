import Container from '@/components/layout/Container'

interface ProfileHeroProps {
  content: string
}

export default function ProfileHero({ content }: ProfileHeroProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="max-w-[65ch] text-[clamp(1.2rem,2.5vw,2rem)] leading-[1.35] font-light text-text-primary">
          {content}
        </p>
      </Container>
    </section>
  )
}
