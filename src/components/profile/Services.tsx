import Container from '@/components/layout/Container'

interface ServicesProps {
  services: string[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <section className="border-t border-border py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
          {/* Label */}
          <p className="text-[13px] tracking-wide text-text-secondary">
            Services
          </p>

          {/* Service items */}
          <div className="space-y-2">
            {services.map((service) => (
              <p
                key={service}
                className="text-[clamp(1.2rem,2.667vw,2.667rem)] leading-[1.15] font-light text-text-primary"
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
