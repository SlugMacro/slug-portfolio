import Container from '@/components/layout/Container'
import type { WorkFrontmatter } from '@/content/schema'

interface WorkMetaProps {
  data: WorkFrontmatter
}

export default function WorkMeta({ data }: WorkMetaProps) {
  const meta = [
    { label: 'Year', value: data.year },
    { label: 'Client', value: data.client },
    { label: 'Type', value: data.type },
    { label: 'Role', value: data.role },
  ]

  return (
    <section className="border-t border-border py-8">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label}>
              <p className="text-[0.8125rem] tracking-wide text-text-secondary">
                {item.label}
              </p>
              <p className="mt-1 text-[0.8125rem] tracking-wide text-text-primary">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {data.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-[0.667rem] tracking-wide text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
