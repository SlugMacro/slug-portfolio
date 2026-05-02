import React from 'react'
import Container from '@/components/layout/Container'

interface WorkContentProps {
  content: string
}

export default function WorkContent({ content }: WorkContentProps) {
  const sections = parseMarkdown(content)

  // Skip the intro paragraph (already shown in hero)
  const bodySections = sections.filter((s) => s.heading)

  if (bodySections.length === 0) return null

  return (
    <section className="pt-16 pb-16 md:pt-24 md:pb-24">
      <Container>
        <div
          className={`grid grid-cols-1 gap-10 ${
            bodySections.length === 3
              ? 'md:grid-cols-[1fr_1px_1fr_1px_1fr] md:gap-0'
              : bodySections.length === 2
                ? 'md:grid-cols-[1fr_1px_1fr] md:gap-0'
                : ''
          }`}
        >
          {bodySections.map((section, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="hidden bg-border md:block" />
              )}
              <div className={i === 0 ? 'md:pr-10' : i < bodySections.length - 1 ? 'border-t border-border pt-10 md:border-t-0 md:pt-0 md:px-10' : 'border-t border-border pt-10 md:border-t-0 md:pt-0 md:pl-10'}>
                <p className="text-base font-medium tracking-wide text-text-primary">
                  {section.heading}
                </p>
                <div className="mt-4">
                  {section.items.length > 0 ? (
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-base leading-relaxed text-text-secondary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-base leading-relaxed text-text-secondary">
                      {section.text}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
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
