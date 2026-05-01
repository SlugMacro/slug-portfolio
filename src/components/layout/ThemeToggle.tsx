import { useState, useEffect } from 'react'
import { cn } from '@/lib/cn'

type Theme = 'dark' | 'light'

const THEME_KEY = 'slug-theme'

function applyTheme(theme: Theme) {
  const html = document.documentElement
  if (theme === 'light') {
    html.setAttribute('data-theme', 'light')
  } else {
    html.removeAttribute('data-theme')
  }
}

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light') return stored
  return 'dark'
}

const themes: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Text mode' },
  { value: 'dark', label: 'Dark mode' },
]

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  return (
    <div className="flex items-start gap-3 text-sm leading-relaxed tracking-wide">
      {/* Labels */}
      <div>
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              'block cursor-pointer transition-opacity duration-300 hover:opacity-60',
              theme === t.value ? 'text-text-primary' : 'text-text-secondary'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Y/N indicators */}
      <div className="tabular-nums text-text-tertiary">
        {themes.map((t) => (
          <span
            key={t.value}
            className={cn(
              'block',
              theme === t.value && 'text-text-primary'
            )}
          >
            {theme === t.value ? 'Y' : 'N'}
          </span>
        ))}
      </div>
    </div>
  )
}
