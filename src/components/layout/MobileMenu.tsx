import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollLock } from '@/hooks/useScrollLock'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: { label: string; to: string }[]
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useScrollLock(open)
  const location = useLocation()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] flex flex-col bg-bg"
        >
          {/* Close — same style as sidebar */}
          <button
            onClick={onClose}
            className="group sticky top-4 z-10 ml-auto mr-4 mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/80 backdrop-blur-sm text-text-tertiary transition-colors hover:text-text-primary cursor-pointer"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-500 ease-out group-hover:rotate-[360deg]">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          {/* Nav links — centered, shifted up */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-8 -mt-14">
            {links.map((link, i) => {
              const isActive = link.to === '/'
                ? location.pathname === '/'
                : location.pathname === link.to
              return (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className={`text-2xl font-normal text-text-primary ${isActive ? 'underline decoration-accent underline-offset-4' : ''}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
