import Container from '@/components/layout/Container'
import type { ProfileFrontmatter } from '@/content/schema'

interface ExperienceProps {
  experience: ProfileFrontmatter['experience']
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section className="border-t border-border py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
          {/* Label */}
          <p className="text-[13px] tracking-wide text-text-secondary">
            Experience
          </p>

          {/* Timeline entries */}
          <div>
            {experience.map((entry, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_2fr] gap-4 border-b border-border py-3 last:border-b-0"
              >
                <span className="text-[13px] tracking-wide text-text-secondary">
                  {entry.period}
                </span>
                <div>
                  <p className="text-[13px] tracking-wide text-text-primary">
                    {entry.role}
                  </p>
                  <p className="text-[13px] tracking-wide text-text-secondary">
                    {entry.company}
                    {entry.location && `, ${entry.location}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
