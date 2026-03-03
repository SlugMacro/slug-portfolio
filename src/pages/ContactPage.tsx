import ContactHero from '@/components/contact/ContactHero'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactServices from '@/components/contact/ContactServices'
import { getProfile } from '@/content/loader'

export default function ContactPage() {
  const profile = getProfile()

  return (
    <>
      <ContactHero
        name={profile.data.name}
        title={profile.data.title}
        coordinates={profile.data.coordinates}
        location={profile.data.location}
      />
      <ContactInfo data={profile.data} />
      <ContactServices services={profile.data.services} />
    </>
  )
}
