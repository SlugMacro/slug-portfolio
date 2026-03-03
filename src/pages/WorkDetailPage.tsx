import { useParams, Navigate } from 'react-router-dom'
import { getWorkBySlug } from '@/content/loader'
import WorkHero from '@/components/work/WorkHero'
import WorkMeta from '@/components/work/WorkMeta'
import WorkGallery from '@/components/work/WorkGallery'
import WorkContent from '@/components/work/WorkContent'

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const work = getWorkBySlug(slug ?? '')

  if (!work) return <Navigate to="/" replace />

  return (
    <>
      <WorkHero data={work.data} />
      <WorkMeta data={work.data} />
      <WorkGallery data={work.data} />
      <WorkContent content={work.content} />
    </>
  )
}
