import AnimatedSection from '@/components/common/AnimatedSection'
import ContactHero from '@/components/contact/ContactHero'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactServices from '@/components/contact/ContactServices'
import { getProfile } from '@/content/loader'

export default function ContactPage() {
  const profile = getProfile()

  return (
    <>
      <AnimatedSection>
        <ContactHero
          name={profile.data.name}
          title={profile.data.title}
          coordinates={profile.data.coordinates}
          location={profile.data.location}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ContactInfo data={profile.data} />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ContactServices services={profile.data.services} />
      </AnimatedSection>
    </>
  )
}
