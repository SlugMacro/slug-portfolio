import Container from '@/components/layout/Container'
import AvailabilityBadge from '@/components/common/AvailabilityBadge'
import type { ProfileFrontmatter } from '@/content/schema'

interface ContactInfoProps {
  data: ProfileFrontmatter
}

export default function ContactInfo({ data }: ContactInfoProps) {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
          <p className="text-[0.8125rem] tracking-wide text-text-secondary">
            Contact Information
          </p>

          <div className="space-y-8">
            {/* Name + Title */}
            <div>
              <p className="text-[0.8125rem] tracking-wide text-text-primary">
                {data.name}
              </p>
              <p className="text-[0.8125rem] tracking-wide text-text-secondary">
                {data.title}
              </p>
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr]">
              <span className="text-[0.8125rem] tracking-wide text-text-secondary">
                Email
              </span>
              <a
                href={`mailto:${data.email}`}
                className="text-[0.8125rem] tracking-wide text-text-primary transition-opacity hover:opacity-60"
              >
                {data.email}
              </a>
            </div>

            {/* Social */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr]">
              <span className="text-[0.8125rem] tracking-wide text-text-secondary">
                Social
              </span>
              <div className="flex gap-4">
                {data.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.8125rem] tracking-wide text-text-primary transition-opacity hover:opacity-60"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr]">
              <span className="text-[0.8125rem] tracking-wide text-text-secondary">
                Status
              </span>
              <AvailabilityBadge status={data.availability} />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr]">
              <span className="text-[0.8125rem] tracking-wide text-text-secondary">
                Location
              </span>
              <div>
                <p className="text-[0.8125rem] tracking-wide text-text-primary">
                  {data.coordinates}
                </p>
                <p className="text-[0.8125rem] tracking-wide text-text-secondary">
                  {data.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
