import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LiquidText from '@/components/common/LiquidText'
import type { WorkFrontmatter } from '@/content/schema'

function isVideo(src: string) {
  return /\.(mov|mp4|webm)$/i.test(src)
}

function GalleryMedia({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        className={className}
        style={style}
        autoPlay
        loop
        muted
        playsInline
      />
    )
  }
  return <img src={src} alt={alt} className={className} style={style} loading="lazy" />
}

interface ProjectSidebarProps {
  work: { data: WorkFrontmatter; content: string } | null
  onClose: () => void
}

interface Section {
  heading?: string
  text: string
  items: string[]
}

function parseMarkdown(md: string): Section[] {
  const sections: Section[] = []
  let current: Section = { text: '', items: [] }

  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) {
      if (current.text || current.items.length > 0 || current.heading) {
        sections.push(current)
      }
      current = { heading: line.replace('## ', ''), text: '', items: [] }
    } else if (line.startsWith('- ')) {
      current.items.push(line.replace('- ', ''))
    } else if (line.trim()) {
      current.text += (current.text ? ' ' : '') + line.trim()
    }
  }

  if (current.text || current.items.length > 0 || current.heading) {
    sections.push(current)
  }

  return sections
}

export default function ProjectSidebar({ work, onClose }: ProjectSidebarProps) {
  useEffect(() => {
    if (work) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [work])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const sections = work ? parseMarkdown(work.content) : []
  const intro = sections.find((s) => !s.heading)
  const bodySections = sections.filter((s) => s.heading)

  return createPortal(
    <AnimatePresence>
      {work && (
        <>
          {/* Clip container — constrains sidebar within max-width */}
          <div
            className="fixed top-0 left-0 bottom-0 z-[60] overflow-hidden"
            style={{ width: 'min(var(--container-max), 100vw)' }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-0 right-0 bottom-0 w-full overflow-y-auto bg-bg border-l border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:w-[75%]"
            >
            {/* Close — floating top-right */}
            <button
              onClick={onClose}
              className="group sticky top-4 z-10 ml-auto mr-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/80 backdrop-blur-sm text-text-tertiary transition-colors hover:text-text-primary cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-500 ease-out group-hover:rotate-[360deg]">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6 sm:p-8 lg:p-32">
              {/* Title */}
              <LiquidText
                radius={0.2}
                className="font-display text-text-primary leading-[1] font-normal text-display tracking-tight"
              >
                {work.data.title}
              </LiquidText>

              {/* Intro */}
              {intro && (
                <p className="mt-8 text-xl leading-[1.5] font-normal text-text-primary">
                  {intro.text}
                </p>
              )}

              {/* Meta */}
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                <div>
                  <p className="text-base tracking-wide text-text-tertiary">Year</p>
                  <p className="mt-1 text-base text-text-primary">{work.data.year}</p>
                </div>
                <div>
                  <p className="text-base tracking-wide text-text-tertiary">Role</p>
                  <p className="mt-1 text-base text-text-primary">{work.data.role}</p>
                </div>
                <div>
                  <p className="text-base tracking-wide text-text-tertiary">Type</p>
                  <p className="mt-1 text-base text-text-primary">{work.data.type}</p>
                </div>
              </div>

              {/* Content sections */}
              {bodySections.length > 0 && (
                <div
                  className={`mt-12 grid grid-cols-1 gap-10 border-t border-border pt-8 lg:pt-12 lg:gap-0 ${
                    bodySections.length === 3
                      ? 'lg:grid-cols-[1fr_1px_1fr_1px_1fr]'
                      : bodySections.length === 2
                        ? 'lg:grid-cols-[1fr_1px_1fr]'
                        : ''
                  }`}
                >
                  {bodySections.map((section, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && (
                        <div className="hidden bg-border lg:block" />
                      )}
                      <div className={i === 0 ? 'lg:pr-10' : i < bodySections.length - 1 ? 'border-t border-border pt-10 lg:border-t-0 lg:pt-0 lg:px-10' : 'border-t border-border pt-10 lg:border-t-0 lg:pt-0 lg:pl-10'}>
                        <p className="text-base font-medium tracking-wide text-text-primary">
                          {section.heading}
                        </p>
                        <div className="mt-4">
                          {section.items.length > 0 ? (
                            <ul className="space-y-2">
                              {section.items.map((item, j) => (
                                <li key={j} className="text-base leading-relaxed text-text-secondary">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-base leading-relaxed text-text-secondary">
                              {section.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Gallery */}
              {work.data.galleryImages.length > 0 && (
                work.data.galleryLayout === 'frameless' ? (
                  <div className="mt-12 space-y-6">
                    {/* Desktop — full width, no frame */}
                    <div className={`${work.data.galleryTheme === 'light' ? 'bg-[#e8e8e8]' : 'bg-[#111111]'} p-6 sm:p-12`}>
                      <img
                        src={work.data.galleryImages[0]}
                        alt={`${work.data.title} gallery 1`}
                        className="w-full"
                        loading="lazy"
                      />
                    </div>
                    {/* Mobile — 2 per row, no frame */}
                    {work.data.galleryImages.length > 1 && (
                      <div className="grid grid-cols-2 gap-4">
                        {work.data.galleryImages.slice(1).map((img, i) => (
                          <div key={i} className={`flex items-center justify-center ${work.data.galleryTheme === 'light' ? 'bg-[#e8e8e8]' : 'bg-[#111111]'} px-4 py-12 sm:px-6`}>
                            <div className="w-full max-w-[270px] overflow-hidden">
                              <img
                                src={img}
                                alt={`${work.data.title} gallery ${i + 2}`}
                                className="w-full"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : work.data.galleryLayout === 'mixed' ? (
                  <div className="mt-12 space-y-6">
                    {/* Browser frames — 1 per row */}
                    {work.data.galleryImages.slice(0, 4).map((img, i) => {
                      const light = work.data.galleryTheme === 'light'
                      return (
                        <div key={i} className={`${light ? 'bg-[#e8e8e8]' : 'bg-[#111111]'} p-6 sm:p-12`}>
                          <div className="overflow-hidden rounded-[4px]">
                            <div className={`flex h-6 items-center gap-1.5 ${light ? 'bg-[#f0f0f0]' : 'bg-[#161616]'} px-3`}>
                              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                            </div>
                            <img
                              src={img}
                              alt={`${work.data.title} gallery ${i + 1}`}
                              className="w-full"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )
                    })}
                    {/* Mobile frames — 2 per row */}
                    {work.data.galleryImages.length > 4 && (
                      <div className="grid grid-cols-2 gap-4">
                        {work.data.galleryImages.slice(4).map((img, i) => (
                          <div key={i} className="flex items-center justify-center bg-[#111111] px-4 py-12 sm:px-6">
                            <div className="w-full max-w-[270px] overflow-hidden rounded-[2rem] bg-black p-1.5 ring-1 ring-white/5">
                              <div className="overflow-hidden rounded-[1.7rem]">
                                <img
                                  src={img}
                                  alt={`${work.data.title} gallery ${4 + i + 1}`}
                                  className="w-full"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : work.data.galleryLayout === 'mobile' ? (
                  <div className="mt-12 grid grid-cols-2 gap-4">
                    {work.data.galleryImages.map((img, i) => (
                      <div key={i} className="flex items-center justify-center bg-[#111111] px-4 py-12 sm:px-6">
                        <div className="w-full max-w-[270px] overflow-hidden rounded-[2rem] bg-black p-1.5 ring-1 ring-white/5">
                          <div className="overflow-hidden rounded-[1.7rem]">
                            <img
                              src={img}
                              alt={`${work.data.title} gallery ${i + 1}`}
                              className="w-full"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-12 space-y-6">
                    {(() => {
                      const light = work.data.galleryTheme === 'light'
                      const pairs = new Set(work.data.galleryPairIndices ?? [])
                      const elements: React.ReactNode[] = []
                      let i = 0
                      while (i < work.data.galleryImages.length) {
                        // Check if this image starts a pair (consecutive indices in pairs)
                        if (pairs.has(i) && pairs.has(i + 1) && i + 1 < work.data.galleryImages.length) {
                          elements.push(
                            <div key={`pair-${i}`} className="grid grid-cols-2 gap-4">
                              {[work.data.galleryImages[i], work.data.galleryImages[i + 1]].map((img, j) => (
                                <div key={j} className={`flex items-center justify-center ${light ? 'bg-[#e8e8e8]' : 'bg-[#111111]'} px-4 py-12 sm:px-6`}>
                                  <div className="w-full max-w-[270px] overflow-hidden rounded-[1.2rem]">
                                    <img
                                      src={img}
                                      alt={`${work.data.title} gallery ${i + j + 1}`}
                                      className="w-full"
                                      loading="lazy"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                          i += 2
                        } else {
                          const img = work.data.galleryImages[i]
                          elements.push(
                            isVideo(img) ? (
                            <div key={i} className="mt-12 overflow-hidden ring-1 ring-white/5">
                              <GalleryMedia
                                src={img}
                                alt={`${work.data.title} gallery ${i + 1}`}
                                className="w-full"
                                style={{ marginTop: '-1px' }}
                              />
                            </div>
                            ) : (
                            <div key={i} className={`${light ? 'bg-[#e8e8e8]' : 'bg-[#111111]'} p-6 sm:p-12`}>
                              <div className="overflow-hidden rounded-[4px]">
                                <div className={`flex h-6 items-center gap-1.5 ${light ? 'bg-[#f0f0f0]' : 'bg-[#161616]'} px-3`}>
                                  <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                                  <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                                  <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                                </div>
                                <GalleryMedia
                                  src={img}
                                  alt={`${work.data.title} gallery ${i + 1}`}
                                  className="w-full"
                                />
                              </div>
                            </div>
                            )
                          )
                          i++
                        }
                      }
                      return elements
                    })()}
                  </div>
                )
              )}

            </div>
          </motion.aside>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
