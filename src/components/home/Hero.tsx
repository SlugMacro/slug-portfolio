import AnimatedSection from '@/components/common/AnimatedSection'
import { getProfile } from '@/content/loader'

export default function Hero() {
  const profile = getProfile()

  return (
    <section className="border-b border-border py-16 sm:py-24 lg:py-32">
      <AnimatedSection>
        <div className="px-6 sm:px-8 lg:px-12">
          <div>
            <p className="max-w-full lg:max-w-[50%] text-xl leading-[1.5] font-normal text-text-primary">
              {profile.data.homeIntro || profile.content}
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('featured-work')
                const header = document.querySelector('header')
                if (el) {
                  const headerH = header?.offsetHeight ?? 0
                  const y = el.getBoundingClientRect().top + window.scrollY - headerH
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
                }}
                className="group inline-flex cursor-pointer items-center gap-3 border border-border px-6 py-4 text-base tracking-wide text-text-primary transition-colors duration-300 hover:border-accent"
              >
                <span>Explore my work</span><span className="text-text-tertiary">/2025-2026</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </button>

            </div>
          </div>
        </div>

      </AnimatedSection>
    </section>
  )
}
