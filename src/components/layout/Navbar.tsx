import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useTheme } from '@/hooks/useTheme'
import { useState } from 'react'
import MobileMenu from './MobileMenu'
import Container from './Container'

const navLinks = [
  { label: 'Work', to: '/' },
  { label: 'Profile', to: '/profile' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-sm">
        <Container>
          <nav className="grid grid-cols-[1fr_auto] items-center py-4 md:grid-cols-[1fr_3fr]">
            {/* Logo */}
            <Link
              to="/"
              className="text-[0.8125rem] font-medium tracking-wide text-text-primary"
            >
              Slug Macro
            </Link>

            {/* Desktop nav — aligned to hero right column */}
            <div className="hidden items-center justify-between md:flex">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'text-[0.8125rem] tracking-wide transition-opacity duration-300 hover:opacity-60',
                      location.pathname === link.to
                        ? 'text-text-primary'
                        : 'text-text-secondary'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Theme toggle — far right */}
              <button
                onClick={toggleTheme}
                className="flex h-6 w-6 items-center justify-center text-text-secondary transition-opacity hover:opacity-60"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="ml-auto flex h-8 w-8 items-center justify-center md:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </nav>
        </Container>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </>
  )
}
