import Container from '@/components/layout/Container'

interface ContactServicesProps {
  services: string[]
}

export default function ContactServices({ services }: ContactServicesProps) {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_3fr] md:gap-0">
          <p className="text-[0.8125rem] font-medium tracking-wide text-text-primary">
            Services
          </p>

          <p className="text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.4] font-light text-text-primary">
            {services.join(', ')}
          </p>
        </div>
      </Container>
    </section>
  )
}
