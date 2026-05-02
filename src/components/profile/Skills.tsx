import type { ProfileFrontmatter } from '@/content/schema'

interface SkillsProps {
  skills: NonNullable<ProfileFrontmatter['skills']>
}

function renderBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section className="border-t border-border py-16 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-base font-medium tracking-wide text-accent">
            Skills.
          </p>
        </div>

        <div className="col-span-1 mt-4 px-6 sm:col-span-2 sm:mt-0 sm:px-8 md:px-12">
          <div className="space-y-2">
            {skills.items.map((item, i) => (
              <p
                key={i}
                className="text-xl leading-[1.5] font-normal text-text-primary"
              >
                {renderBold(item)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
