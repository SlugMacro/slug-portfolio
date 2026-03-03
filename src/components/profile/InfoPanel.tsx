import Container from '@/components/layout/Container'
import AvailabilityBadge from '@/components/common/AvailabilityBadge'
import type { ProfileFrontmatter } from '@/content/schema'

interface InfoPanelProps {
  data: ProfileFrontmatter
}

export default function InfoPanel({ data }: InfoPanelProps) {
  return (
    <section className="border-t border-border py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
          {/* Label */}
          <p className="text-[13px] tracking-wide text-text-secondary">
            Information
          </p>

          {/* Details */}
          <div className="space-y-6">
            {/* Name + Title */}
            <div>
              <p className="text-[13px] tracking-wide text-text-primary">
                {data.name}
              </p>
              <p className="text-[13px] tracking-wide text-text-secondary">
                {data.title}
              </p>
            </div>

            {/* Contact */}
            <div>
              <a
                href={`mailto:${data.email}`}
                className="text-[13px] tracking-wide text-text-primary transition-opacity hover:opacity-60"
              >
                {data.email}
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {data.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] tracking-wide text-text-secondary transition-opacity hover:opacity-60"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>

            {/* Status */}
            <AvailabilityBadge status={data.availability} />

            {/* Location */}
            <div>
              <p className="text-[13px] tracking-wide text-text-secondary">
                {data.coordinates}
              </p>
              <p className="text-[13px] tracking-wide text-text-secondary">
                {data.location}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
