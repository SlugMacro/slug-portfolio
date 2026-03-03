import ProfileHero from '@/components/profile/ProfileHero'
import InfoPanel from '@/components/profile/InfoPanel'
import Services from '@/components/profile/Services'
import Experience from '@/components/profile/Experience'
import ClientList from '@/components/profile/ClientList'
import { getProfile } from '@/content/loader'

export default function ProfilePage() {
  const profile = getProfile()

  return (
    <>
      <ProfileHero content={profile.content} />
      <InfoPanel data={profile.data} />
      <Services services={profile.data.services} />
      <Experience experience={profile.data.experience} />
      <ClientList clients={profile.data.clients} />
    </>
  )
}
