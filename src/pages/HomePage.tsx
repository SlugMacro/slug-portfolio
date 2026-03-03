import AnimatedSection from '@/components/common/AnimatedSection'
import Hero from '@/components/home/Hero'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import WorkTable from '@/components/home/WorkTable'
import { getFeaturedWork } from '@/content/loader'

export default function HomePage() {
  const featured = getFeaturedWork()

  return (
    <>
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <FeaturedGrid work={featured} />
      <WorkTable />
    </>
  )
}
