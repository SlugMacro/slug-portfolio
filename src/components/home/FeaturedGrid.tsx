import { useState, useCallback } from 'react'
import AnimatedSection from '@/components/common/AnimatedSection'
import ProjectCard from './ProjectCard'
import ProjectSidebar from './ProjectSidebar'
import { WireframePolyhedron } from '@/components/common/WireframeShapes'
import type { WorkFrontmatter } from '@/content/schema'

// All 1:1. 50% = 2×2 block. 25% = 1×1.
// 4 cols × 6 rows — intro top-left, large projects zigzag:
//
// Col:    1          2          3          4
// Row 1: [Intro   ] [WM 2×2  ] [WM      ] [VideoFi ]
// Row 2: [GeoRep  ] [WM      ] [WM      ] [        ]
// Row 3: [MN 2×2  ] [MN      ] [W.Fund  ] [Alter   ]
// Row 4: [MN      ] [MN      ] [WMob 2×2] [WMob    ]
// Row 5: [WP 2×2  ] [WP      ] [WMob    ] [WMob    ]
// Row 6: [WP      ] [WP      ] [        ] [Memepire]

interface Placement {
  workIndex: number
  col: number
  row: number
  span: number
}

// Sorted order: 0=WM, 1=WP, 2=MN, 3=WMob, 4=WF, 5=GR, 6=Memepire, 7=VideoFi, 8=Alter
const placements: Placement[] = [
  { workIndex: 0, col: 2, row: 1, span: 2 }, // Whales Market 50%
  { workIndex: 5, col: 1, row: 2, span: 1 }, // GeoReport 25%
  { workIndex: 7, col: 4, row: 1, span: 1 }, // VideoFi 25%
  { workIndex: 2, col: 1, row: 3, span: 2 }, // Mention Network 50%
  { workIndex: 4, col: 3, row: 3, span: 1 }, // Whales Fund 25%
  { workIndex: 8, col: 4, row: 3, span: 1 }, // Alter 25%
  { workIndex: 3, col: 3, row: 4, span: 2 }, // Whales Mobile 50%
  { workIndex: 1, col: 1, row: 5, span: 2 }, // Whales Predict 50%
  { workIndex: 6, col: 4, row: 6, span: 1 }, // Memepire 25%
]

// Fill remaining cells as empty decorative squares
const emptyCells: Array<{ col: number; row: number }> = []
const occupied = new Set<string>()
for (const p of placements) {
  for (let c = 0; c < p.span; c++) {
    for (let r = 0; r < p.span; r++) {
      occupied.add(`${p.col + c},${p.row + r}`)
    }
  }
}
for (let row = 1; row <= 6; row++) {
  for (let col = 1; col <= 4; col++) {
    if (!occupied.has(`${col},${row}`)) {
      emptyCells.push({ col, row })
    }
  }
}

// Each empty cell gets a different polyhedron type + speed
// detail: 0 = icosahedron (12v), all under 24 vertices
const wireframeConfigs = [
  { detail: 0, speed: 1.0 },   // 12 vertices — icosahedron
  { detail: 0, speed: 0.6 },   // 12 vertices — slower
  { detail: 0, speed: 0.8 },   // 12 vertices
  { detail: 0, speed: 1.2 },   // 12 vertices — faster
  { detail: 0, speed: 0.4 },   // 12 vertices — very slow
]

interface FeaturedGridProps {
  work: Array<{ data: WorkFrontmatter; content: string }>
}

export default function FeaturedGrid({ work }: FeaturedGridProps) {
  const [selected, setSelected] = useState<{ data: WorkFrontmatter; content: string } | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section id="featured-work">
      {/* Mobile + tablet: simple stacked list */}
      <div className="flex flex-col border-b border-border bg-border lg:hidden" style={{ gap: '1px' }}>
        {placements.map((p, i) => {
          const w = work[p.workIndex]
          if (!w) return null
          return (
            <AnimatedSection
              key={w.data.slug}
              delay={i * 0.08}
              className="aspect-square bg-bg"
            >
              <ProjectCard work={w} onClick={() => setSelected(w)} />
            </AnimatedSection>
          )
        })}
      </div>

      {/* Desktop: 4-col checkerboard grid */}
      <div
        className="hidden border-b border-border bg-border lg:grid"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(6, auto)',
          gap: '1px',
        }}
      >
        {/* Intro block */}
        <div
          className="aspect-square bg-bg px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12"
          style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}
        >
          <p className="mb-4 text-base font-medium tracking-wide text-accent">
            Work.
          </p>
          <p className="max-w-[30ch] text-xl leading-[1.5] font-normal text-text-primary">
            A selection of products I've shipped across trading, AI, and Web3.
          </p>
        </div>

        {/* Empty cells with wireframe animations */}
        {emptyCells.filter(c => !(c.col === 1 && c.row === 1)).map((cell, i) => {
          const config = wireframeConfigs[i % wireframeConfigs.length]
          return (
            <div
              key={`e-${cell.col}-${cell.row}`}
              className="aspect-square bg-bg"
              style={{
                gridColumn: `${cell.col} / ${cell.col + 1}`,
                gridRow: `${cell.row} / ${cell.row + 1}`,
              }}
            >
              <WireframePolyhedron detail={config.detail} speed={config.speed} />
            </div>
          )
        })}

        {/* Project cells */}
        {placements.map((p, i) => {
          const w = work[p.workIndex]
          if (!w) return null
          return (
            <AnimatedSection
              key={w.data.slug}
              delay={i * 0.08}
              className="aspect-square bg-bg"
              style={{
                gridColumn: `${p.col} / ${p.col + p.span}`,
                gridRow: `${p.row} / ${p.row + p.span}`,
              }}
            >
              <ProjectCard work={w} onClick={() => setSelected(w)} />
            </AnimatedSection>
          )
        })}
      </div>

      <ProjectSidebar work={selected} onClose={close} />
    </section>
  )
}
