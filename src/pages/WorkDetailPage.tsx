import { useParams, Navigate } from 'react-router-dom'
import { getWorkBySlug } from '@/content/loader'
import WorkHero from '@/components/work/WorkHero'
import WorkGallery from '@/components/work/WorkGallery'
import WorkContent from '@/components/work/WorkContent'

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const work = getWorkBySlug(slug ?? '')

  if (!work) return <Navigate to="/" replace />

  return (
    <>
      <WorkHero data={work.data} content={work.content} />
      <WorkContent content={work.content} />
      <WorkGallery data={work.data} />
    </>
  )
}
