import type { ProfileFrontmatter } from '@/content/schema'

interface ExperienceProps {
  experience: ProfileFrontmatter['experience']
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section className="border-t border-b border-border py-16 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-base font-medium tracking-wide text-accent">
            Experience.
          </p>
        </div>

        <div className="col-span-1 mt-4 px-6 sm:col-span-2 sm:mt-0 sm:px-8 md:px-12">
          <div className="space-y-12">
            {experience.map((entry, i) => (
              <div key={i}>
                <p className="text-xl leading-[1.5] font-normal text-text-primary">
                  {entry.company}
                </p>
                <p className="mt-1 text-base tracking-wide text-text-secondary">
                  {entry.role} · {entry.period}
                </p>
                {entry.description && (
                  <p className="mt-4 text-base leading-relaxed tracking-wide text-text-primary">
                    {entry.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
