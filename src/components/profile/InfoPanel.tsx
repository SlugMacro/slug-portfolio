import type { ProfileFrontmatter } from '@/content/schema'

interface InfoPanelProps {
  data: ProfileFrontmatter
}

export default function InfoPanel({ data }: InfoPanelProps) {
  return (
    <section className="border-t border-border py-16 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-base font-medium tracking-wide text-text-primary">
            Information
          </p>
        </div>

        <div className="col-span-1 mt-4 px-6 sm:col-span-2 sm:mt-0 sm:px-8 md:px-12">
          <div className="space-y-6">
            {/* Name + Title */}
            <div>
              <p className="text-xl leading-[1.5] font-light text-text-primary">
                {data.name}
              </p>
              <p className="mt-1 text-base tracking-wide text-text-secondary">
                {data.title}
              </p>
            </div>

            {/* Contact links */}
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${data.email}`}
                className="text-base tracking-wide text-text-primary underline decoration-[#333] underline-offset-4 transition-colors duration-300 hover:decoration-accent"
              >
                {data.email}
              </a>
              {data.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base tracking-wide text-text-primary underline decoration-[#333] underline-offset-4 transition-colors duration-300 hover:decoration-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Location */}
            <div>
              <p className="text-base tracking-wide text-text-secondary">
                {data.coordinates}
              </p>
              <p className="text-base tracking-wide text-text-secondary">
                {data.location}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
