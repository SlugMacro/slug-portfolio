import Container from '@/components/layout/Container'

interface ContactServicesProps {
  services: string[]
}

export default function ContactServices({ services }: ContactServicesProps) {
  return (
    <section className="border-t border-border py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
          <p className="text-[0.8125rem] tracking-wide text-text-secondary">
            Services
          </p>

          <p className="text-[clamp(1.2rem,2.667vw,2.667rem)] leading-[1.15] font-light text-text-primary">
            {services.join(', ')}
          </p>
        </div>
      </Container>
    </section>
  )
}
