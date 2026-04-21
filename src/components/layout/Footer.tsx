import AnimatedSection from '@/components/common/AnimatedSection'

const history = [
  {
    company: 'Remote',
    period: '03.2023 – Present',
    role: 'Product Designer',
    location: 'US',
  },
  {
    company: 'GalaxyOne – Sovico Group',
    period: '09.2022 – 03.2023',
    role: 'Product Designer',
    location: 'HCMC',
  },
  {
    company: 'OpenCommerce Group',
    period: '06.2022 – 08.2022',
    role: 'Product Designer',
    location: 'Hanoi',
  },
  {
    company: 'JoomlArt',
    period: '08.2008 – 06.2022',
    role: 'Lead UI/UX Designer',
    location: 'Hanoi',
  },
]

const skills = [
  'Product Design',
  'Trading Systems',
  'AI-Native Products',
  'Design Systems',
  'UX Research',
  'Data Modeling',
  'Prototyping',
  'Front-end Development',
]

const contact = [
  { label: 'slug@example.com', url: 'mailto:slug@example.com' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/slugmacro' },
]

export default function Footer() {
  return (
    <footer>
      <AnimatedSection>
        <div className="-mt-px grid grid-cols-1 border-t border-b border-border sm:grid-cols-4">
          {/* Col 1: intro blurb */}
          <div className="border-b border-border px-6 py-6 sm:border-b-0 sm:border-r sm:px-8 sm:py-8 md:px-12 md:py-12">
            <p className="max-w-[30ch] text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.4] font-light text-text-primary">
              Designing at the intersection of complex systems and clear thinking — where trading logic, AI models, and user intuition converge into products that simply work.
            </p>
          </div>

          {/* Col 2: History */}
          <div className="border-b border-border px-6 py-6 sm:border-b-0 sm:border-r sm:px-8 sm:py-8 md:px-12 md:py-12">
            <p className="mb-6 text-[0.875rem] font-medium tracking-wide text-text-primary">
              History
            </p>
            <div className="space-y-6">
              {history.map((h) => (
                <div key={h.company}>
                  <p className="text-[0.875rem] font-medium tracking-wide text-text-primary">
                    {h.company}
                  </p>
                  <p className="mt-1 text-[0.75rem] tracking-wide text-text-secondary">
                    {h.period}
                  </p>
                  <p className="text-[0.75rem] tracking-wide text-text-secondary">
                    {h.role}
                  </p>
                  <p className="mt-2 text-[0.75rem] tracking-wide text-text-secondary">
                    {h.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Skills */}
          <div className="border-b border-border px-6 py-6 sm:border-b-0 sm:border-r sm:px-8 sm:py-8 md:px-12 md:py-12">
            <p className="mb-6 text-[0.875rem] font-medium tracking-wide text-text-primary">
              Skills
            </p>
            <ul className="space-y-2">
              {skills.map((s) => (
                <li key={s} className="text-[0.75rem] tracking-wide text-text-secondary">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-12">
            <p className="mb-6 text-[0.875rem] font-medium tracking-wide text-text-primary">
              Contact
            </p>
            <ul className="space-y-2">
              {contact.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.75rem] tracking-wide text-text-secondary transition-colors duration-300 hover:text-text-primary"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 py-6 sm:px-8 md:px-12">
        <p className="text-[0.7rem] tracking-wide text-text-tertiary">
          &copy; {new Date().getFullYear()}
        </p>
        <p className="text-[0.7rem] tracking-wide text-text-tertiary">
          Slug Macro
        </p>
      </div>
    </footer>
  )
}
