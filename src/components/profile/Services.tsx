import Container from '@/components/layout/Container'

interface ServicesProps {
  services: string[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_3fr] md:gap-0">
          {/* Label */}
          <p className="text-[0.8125rem] tracking-wide text-text-secondary">
            Services
          </p>

          {/* Service items */}
          <div className="space-y-2">
            {services.map((service) => (
              <p
                key={service}
                className="text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.15] font-light text-text-primary"
              >
                {service}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
