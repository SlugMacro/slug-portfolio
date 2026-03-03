import Hero from '@/components/home/Hero'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import WorkTable from '@/components/home/WorkTable'
import { getFeaturedWork } from '@/content/loader'

export default function HomePage() {
  const featured = getFeaturedWork()

  return (
    <>
      <Hero />
      <FeaturedGrid work={featured} />
      <WorkTable />
    </>
  )
}
