import Container from '@/components/layout/Container'
import AnimatedSection from '@/components/common/AnimatedSection'
import { workTable } from '@/content/work-table'

export default function WorkTable() {
  return (
    <section className="mt-24 pb-24">
      <Container>
        <AnimatedSection>
          {/* Table header — 1fr/3fr grid matching nav + hero */}
          <div className="grid grid-cols-1 border-b border-border pb-3 md:grid-cols-[1fr_3fr]">
            <span className="text-[13px] tracking-wide text-text-secondary">Year</span>
            <div className="flex justify-between">
              <span className="text-[13px] tracking-wide text-text-secondary">Product</span>
              <span className="text-[13px] tracking-wide text-text-secondary">Type</span>
            </div>
          </div>

          {/* Table rows */}
          {workTable.map((entry, i) => (
            <div
              key={i}
              className="grid grid-cols-1 border-b border-border py-3 md:grid-cols-[1fr_3fr]"
            >
              <span className="text-[13px] tracking-wide text-text-secondary">{entry.year}</span>
              <div className="flex justify-between">
                <span className="text-[13px] tracking-wide text-text-primary">{entry.product}</span>
                <span className="text-[13px] tracking-wide text-text-secondary">{entry.type}</span>
              </div>
            </div>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  )
}
