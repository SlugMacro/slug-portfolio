import type { ProfileFrontmatter } from '@/content/schema'

interface InfoPanelProps {
  data: ProfileFrontmatter
}

export default function InfoPanel({ data }: InfoPanelProps) {
  return (
    <section className="border-t border-border py-16 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-base font-medium text-accent">
            Information.
          </p>
        </div>

        <div className="col-span-1 mt-4 px-6 sm:col-span-3 sm:mt-0 sm:px-8 md:px-12 lg:col-span-2">
          <div className="space-y-6">
            {/* Name + Title */}
            <div>
              <p className="text-xl leading-[1.5] font-normal text-text-primary">
                {data.name}
              </p>
              <p className="mt-1 text-base text-text-secondary">
                {data.title}
              </p>
            </div>

            {/* Contact links */}
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${data.email}`}
                className="self-start text-base text-text-primary link-underline"
              >
                {data.email}
              </a>
              {data.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start text-base text-text-primary link-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Location */}
            <div>
              <p className="text-base text-text-secondary">
                {data.coordinates}
              </p>
              <p className="text-base text-text-secondary">
                {data.location}
              </p>
            </div>

            {/* Resume */}
            <a
              href="/Duc-Le-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-border px-6 py-4 text-base text-text-primary transition-colors duration-300 hover:border-accent"
            >
              <span>View Resume</span><span className="text-text-tertiary">/PDF</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}
