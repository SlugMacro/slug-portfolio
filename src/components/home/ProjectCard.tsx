import { useRef, useState, useEffect } from 'react'
import type { WorkFrontmatter } from '@/content/schema'
import RippleImage, { type RippleImageHandle } from '@/components/common/RippleImage'

interface ProjectCardProps {
  work: { data: WorkFrontmatter }
  onClick?: () => void
}

export default function ProjectCard({ work, onClick }: ProjectCardProps) {
  const { title, year, thumbnailImage } = work.data
  const rippleRef = useRef<RippleImageHandle>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!isDesktop) return
        rippleRef.current?.dropAt(e.clientX, e.clientY)
        rippleRef.current?.setHover(true)
      }}
      onMouseMove={(e) => {
        if (!isDesktop) return
        rippleRef.current?.dropAt(e.clientX, e.clientY)
      }}
      onMouseLeave={() => {
        if (!isDesktop) return
        rippleRef.current?.setHover(false)
      }}
      className="group relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden bg-bg text-left"
    >
      {/* Background image — static on mobile, animated on desktop */}
      {thumbnailImage && (
        <div className={`absolute inset-0 ${isDesktop ? 'grayscale opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.03]' : 'opacity-70'}`}>
          {isDesktop ? (
            <RippleImage
              ref={rippleRef}
              src={thumbnailImage}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={thumbnailImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent" />

      {/* Title + meta — bottom-left */}
      <div className="relative z-10 p-6 sm:p-8 md:p-12">
        <span className="inline-block text-base font-medium text-text-primary underline decoration-[#555] underline-offset-4 transition-colors duration-300 group-hover:decoration-accent">
          {title}
        </span>
        <span className="mt-1 block text-sm tracking-wide text-text-tertiary">
          {year}
        </span>
      </div>

      {/* Arrow — desktop only */}
      {isDesktop && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="absolute top-6 right-6 z-10 -translate-x-2 scale-100 text-accent opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:scale-[4] group-hover:opacity-100 sm:top-8 sm:right-8 md:top-12 md:right-12"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      )}
    </button>
  )
}
