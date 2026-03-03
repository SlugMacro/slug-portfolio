import Container from '@/components/layout/Container'

interface WorkContentProps {
  content: string
}

export default function WorkContent({ content }: WorkContentProps) {
  // Simple markdown-to-sections parser
  const sections = parseMarkdown(content)

  return (
    <section className="border-t border-border py-12">
      <Container>
        <div className="max-w-[65ch] space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="mb-4 text-[13px] tracking-wide text-text-secondary uppercase">
                  {section.heading}
                </h2>
              )}
              {section.items.length > 0 ? (
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-[13px] leading-[1.6] text-text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] leading-[1.6] text-text-primary">
                  {section.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

interface Section {
  heading?: string
  text: string
  items: string[]
}

function parseMarkdown(md: string): Section[] {
  const sections: Section[] = []
  let current: Section = { text: '', items: [] }

  const lines = md.split('\n')
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (current.text || current.items.length > 0 || current.heading) {
        sections.push(current)
      }
      current = { heading: line.replace('## ', ''), text: '', items: [] }
    } else if (line.startsWith('- ')) {
      current.items.push(line.replace('- ', ''))
    } else if (line.trim()) {
      current.text += (current.text ? ' ' : '') + line.trim()
    }
  }

  if (current.text || current.items.length > 0 || current.heading) {
    sections.push(current)
  }

  return sections
}
