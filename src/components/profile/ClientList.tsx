import Container from '@/components/layout/Container'

interface ClientListProps {
  clients: string[]
}

export default function ClientList({ clients }: ClientListProps) {
  return (
    <section className="border-t border-border py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
          {/* Label */}
          <p className="text-[13px] tracking-wide text-text-secondary">
            Clients
          </p>

          {/* Client names */}
          <p className="text-[clamp(1.2rem,2.667vw,2.667rem)] leading-[1.15] font-light text-text-primary">
            {clients.join(', ')}
          </p>
        </div>
      </Container>
    </section>
  )
}
