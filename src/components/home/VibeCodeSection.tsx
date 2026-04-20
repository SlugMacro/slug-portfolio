import AnimatedSection from '@/components/common/AnimatedSection'

const sideProjects = [
  {
    title: 'Portfolio Terminal',
    description: 'ASCII art, parallax, scramble animations — built with AI pair programming',
    stack: 'React · Tailwind · Framer Motion',
  },
  {
    title: 'AI Chat Interface',
    description: 'Conversational UI with streaming responses & code highlighting',
    stack: 'Next.js · OpenAI · Vercel AI SDK',
  },
  {
    title: 'Design Token Generator',
    description: 'Extract design tokens from Figma → Tailwind config',
    stack: 'TypeScript · Figma API · Node.js',
  },
  {
    title: 'Data Dashboard',
    description: 'Real-time analytics with interactive charts & NL queries',
    stack: 'React · D3.js · Claude API',
  },
]

export default function VibeCodeSection() {
  return (
    <section className="-mt-px border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        {/* Col 1: intro blurb */}
        <div className="px-8 py-12 sm:border-r sm:border-border sm:px-12">
          <p className="max-w-[30ch] text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.4] font-light text-text-primary">
            Things I build after hours — experiments, tools, and ideas that keep the craft sharp.
          </p>
        </div>

        {/* Cols 2-4: project list */}
        <div className="col-span-1 flex flex-col sm:col-span-3">
          {sideProjects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.06}>
              <div className="group relative flex cursor-pointer flex-col justify-end border-b border-border px-8 py-12 transition-colors duration-300 hover:bg-bg-secondary sm:px-12">
                <span className="text-[0.875rem] font-medium tracking-wide text-text-primary transition-colors duration-300 group-hover:text-accent">
                  {project.title}
                </span>
                <span className="mt-1 text-[0.75rem] tracking-wide text-text-secondary">
                  {project.description}
                </span>
                <span className="mt-1 text-[0.7rem] tracking-wide text-text-tertiary">
                  {project.stack}
                </span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="absolute right-8 top-1/2 -translate-x-2 -translate-y-1/2 text-accent opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 sm:right-12"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
