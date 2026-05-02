import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MobileMenu from './MobileMenu'
import LiquidText from '@/components/common/LiquidText'

const navLinks = [
  { label: 'Projects', to: '/' },
  { label: 'Information', to: '/profile' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(entry.intersectionRatio < 1),
      { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const logoSectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: logoSectionRef,
    offset: ['start start', 'end start'],
  })
  const logoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0], { clamp: true })

  return (
    <>
      {/* Logo — fixed, content scrolls over it */}
      <div
        ref={logoSectionRef as React.RefObject<HTMLDivElement>}
        className="relative z-[6] bg-bg"
        style={{ height: 'calc(clamp(4rem, 18vw, 22rem) * 0.8 * 2 + 3rem + clamp(4rem, 18vw, 22rem) * 0.3)' }}
      >
        <div className="fixed top-0 left-0 z-0 w-full max-w-[var(--container-max)] bg-bg">
          <div className="px-6 sm:px-8 md:px-12">
            <Link to="/" aria-label="Slug Macro — Home" className="block">
              <motion.div className="pt-12" style={{ opacity: logoOpacity }}>
                <LiquidText
                  className="select-none font-display text-text-primary leading-[0.8] font-bold cursor-pointer text-display-xl"
                  style={{
                    letterSpacing: '-0.05em',
                  }}
                >
                  Slug<br />Macro
                </LiquidText>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav bar — sticky top */}
      <header ref={headerRef as React.RefObject<HTMLElement>} className={cn('sticky top-0 z-50 w-full bg-bg border-t border-border transition-[border-color] duration-300', scrolled ? 'border-b border-b-border' : 'border-b border-b-transparent')}>
        <nav className="grid grid-cols-2 lg:grid-cols-4 [&>div]:transition-[padding] [&>div]:duration-300">
          <div className={cn('px-6 sm:px-8 lg:px-12', scrolled ? 'py-4 lg:py-6' : 'py-4 lg:py-6')}>
            <span className="block text-base tracking-wide text-text-tertiary">Independent</span>
            <span className="block text-base tracking-wide text-text-tertiary">Designer</span>
          </div>

          <div className={cn('hidden lg:block lg:px-12', 'py-6')}>
            <Link to="/" className={cn('block text-base tracking-wide text-text-primary underline underline-offset-4 transition-colors duration-300 hover:decoration-accent', location.pathname === '/' ? 'decoration-accent' : 'decoration-[#555]')}>
              Projects
            </Link>
            <Link to="/profile" className={cn('block text-base tracking-wide text-text-primary underline underline-offset-4 transition-colors duration-300 hover:decoration-accent', location.pathname === '/profile' ? 'decoration-accent' : 'decoration-[#555]')}>
              Information
            </Link>
          </div>

          <div className={cn('hidden lg:block lg:px-12', 'py-6')}>
            <span className="block text-base tracking-wide text-text-tertiary">Contact</span>
            <a href="mailto:macroslug@gmail.com" className="block text-base tracking-wide text-text-primary underline decoration-[#555] underline-offset-4 transition-colors duration-300 hover:decoration-accent">macroslug@gmail.com</a>
          </div>

          <div className={cn('hidden lg:block lg:px-12', 'py-6')}>
            <span className="block text-base tracking-wide text-text-tertiary">20°58′N 105°49′E</span>
            <span className="block text-base tracking-wide text-text-tertiary">Hanoi, Vietnam</span>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="ml-auto flex items-center justify-center pr-6 lg:hidden"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </>
  )
}
