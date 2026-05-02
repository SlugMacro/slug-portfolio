import { useState, useCallback } from 'react'
import AnimatedSection from '@/components/common/AnimatedSection'
import ProjectSidebar from './ProjectSidebar'
import { WireframePolyhedron } from '@/components/common/WireframeShapes'
import type { WorkFrontmatter } from '@/content/schema'

const sideProjects: Array<{ data: WorkFrontmatter; content: string; previewUrl?: string }> = [
  {
    data: {
      slug: 'gitchat-mobile',
      title: 'GitChat Mobile',
      subtitle: 'GitHub-native chat on the go',
      year: '2026',
      client: 'Personal',
      type: 'Side Project',
      tags: ['Mobile', 'GitHub', 'Chat'],
      role: 'Product Design & Development',
      featured: false,
      galleryImages: [
        '/images/gitchat-ios/layout-1.png',
        '/images/gitchat-ios/layout-2.png',
        '/images/gitchat-ios/layout-3.png',
        '/images/gitchat-ios/layout-4.png',
        '/images/gitchat-ios/layout-5.png',
        '/images/gitchat-ios/layout-6.png',
        '/images/gitchat-ios/layout-7.png',
        '/images/gitchat-ios/layout-8.png',
      ],
      galleryLayout: 'mobile',
      galleryTheme: 'dark',
    },
    content: `Native mobile app for GitChat — bringing repo-based communities, threaded discussions, and code snippet sharing to iOS and Android. Fully synced with the desktop web client and VS Code extension, so conversations follow you everywhere.

## Scope

- Designed mobile-first chat with gesture navigation, push notifications synced across IDE/web/mobile, and offline-first reading

## Stack

- React Native, GitHub OAuth + GraphQL API, WebSocket, AsyncStorage`,
  },
  {
    data: {
      slug: 'gitchat-extension',
      title: 'GitChat Extension',
      subtitle: 'Chat without leaving your editor',
      year: '2026',
      client: 'Personal',
      type: 'Side Project',
      tags: ['VS Code', 'GitHub', 'Developer Tools'],
      role: 'Product Design & Development',
      featured: false,
      galleryImages: [
        '/images/gitchat-extension/layout-1.png',
        '/images/gitchat-extension/layout-2.png',
        '/images/gitchat-extension/layout-3.png',
        '/images/gitchat-extension/layout-4.png',
        '/images/gitchat-extension/layout-5.png',
      ],
      galleryLayout: 'frameless',
      galleryTheme: 'light',
    },
    content: `VS Code extension that brings repo-based chat directly into the editor. Select code, share it to a channel, and discuss in context with automatic PR and issue linking — all without leaving your IDE. Notifications stay in sync across the web client, mobile app, and extension so you never miss a thread.

## Scope

- Designed sidebar with threaded chat, inline code references, context-aware PR linking, and quick-share flow

## Stack

- VS Code Extension API, TypeScript, WebSocket, GitHub GraphQL API`,
  },
  {
    previewUrl: 'https://skillmarket-v2.vercel.app',
    data: {
      slug: 'skill-market',
      title: 'Skill Market',
      subtitle: 'Marketplace for AI Agent skills on Web3',
      year: '2026',
      client: 'Personal',
      type: 'Side Project',
      tags: ['Web3', 'AI Agents', 'Marketplace'],
      role: 'Product Design & Development',
      featured: false,
      galleryImages: [
        '/images/skill-market/skill-market.mov',
      ],
      galleryLayout: 'pattern',
      galleryTheme: 'dark',
    },
    content: `A decentralized marketplace where developers publish, sell, and trade skill packages for AI agents. On-chain licensing via Solana, token-gated access, and seamless integration with popular agent frameworks like Claude Code, AutoGPT, and CrewAI.

## Scope

- Designed storefront with skill discovery, seller dashboard, on-chain NFT licensing, and agent framework integration

## Stack

- Next.js + TypeScript, Solana, IPFS, Tailwind CSS + Framer Motion`,
  },
  {
    previewUrl: 'https://clawfriend.ai/',
    data: {
      slug: 'clawfriend',
      title: 'ClawFriend',
      subtitle: 'Social trading platform for AI agents',
      year: '2026',
      client: 'Personal',
      type: 'Side Project',
      tags: ['AI Agents', 'Social', 'DeFi'],
      role: 'Product Design & Development',
      featured: false,
      galleryImages: [
        '/images/clawfriend/layout-1.png',
        '/images/clawfriend/layout-2.png',
        '/images/clawfriend/layout-3.png',
        '/images/clawfriend/layout-4.png',
        '/images/clawfriend/layout-5.png',
        '/images/clawfriend/layout-6.png',
        '/images/clawfriend/layout-7.png',
        '/images/clawfriend/layout-8.png',
      ],
      galleryLayout: 'mixed',
      galleryTheme: 'dark',
    },
    content: `Social and trading platform where AI agents build reputation post-TGE. Agents grow value through community posts and alpha calls, while users discover and invest early in promising ones. Think Product Hunt meets token trading — but for AI agents.

## Scope

- Designed agent profiles, social feed, early-access investment flow, leaderboard, and portfolio tracker with unrealized gains

## Stack

- React + TypeScript + Vite, WebSocket, DeFi APIs, Tailwind CSS + Framer Motion`,
  },
]

export default function VibeCodeSection() {
  const [selected, setSelected] = useState<{ data: WorkFrontmatter; content: string } | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section id="craft" className="-mt-px border-t border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Col 1: intro blurb */}
        <div className="px-6 py-6 lg:border-r lg:border-border sm:px-8 sm:py-8 lg:px-12 lg:py-12">
          <p className="mb-4 text-base font-medium tracking-wide text-accent">
            Craft.
          </p>
          <p className="max-w-[30ch] text-xl leading-[1.5] font-normal text-text-primary">
            Things I build on my own time — exploring ideas across AI agents, Web3, and dev tools.
          </p>
        </div>

        {/* Col 2-4: items stacked vertically */}
        <div className="col-span-1 lg:col-span-2 lg:border-r lg:border-border">
          {sideProjects.map((project, i) => (
            <AnimatedSection key={project.data.slug} delay={i * 0.06}>
              <div
                className={`group relative cursor-pointer p-6 sm:p-8 lg:p-12${i < sideProjects.length - 1 ? ' border-b border-border' : ''}`}
                onClick={() => setSelected(project)}
              >
                <span className="inline-block text-base font-medium tracking-wide text-text-primary underline decoration-[#333] underline-offset-4 transition-colors duration-300 group-hover:decoration-accent">
                  {project.data.title}
                </span>
                <span className="mt-1 block text-sm tracking-wide text-text-tertiary">
                  {project.data.tags.join(' · ')}
                </span>
                <span className="mt-4 block text-base leading-relaxed tracking-wide text-text-secondary">
                  {project.content.split('\n')[0]}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="absolute top-12 right-12 -translate-x-2 text-accent opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:scale-[4] group-hover:opacity-100"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Col 4: octahedron animation */}
        <div className="hidden h-full lg:block">
          <WireframePolyhedron shape="octahedron" speed={0.4} />
        </div>
      </div>

      <ProjectSidebar work={selected} onClose={close} />
    </section>
  )
}
