import Container from './Container'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-10">
      <Container>
        <div className="grid grid-cols-[1fr_auto] items-center border-t border-border py-8 md:grid-cols-[1fr_3fr] md:py-12">
          {/* Copyright — aligned with logo */}
          <p className="text-[0.8125rem] tracking-wide text-text-secondary">
            &copy; {new Date().getFullYear()}
          </p>

          {/* Right column — same grid as nav */}
          <div className="hidden items-center justify-between md:flex">
            <p className="text-[0.8125rem] tracking-wide text-text-secondary">
              Designed by Slug Macro
            </p>

            {/* Back to top — aligned with theme toggle */}
            <button
              onClick={scrollToTop}
              className="flex h-6 w-6 items-center justify-center text-text-secondary transition-opacity hover:opacity-60"
              aria-label="Back to top"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>

          {/* Mobile: back to top only */}
          <button
            onClick={scrollToTop}
            className="ml-auto flex h-8 w-8 items-center justify-center md:hidden"
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </Container>
    </footer>
  )
}
