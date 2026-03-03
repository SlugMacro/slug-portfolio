import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import { getProfile } from '@/content/loader'

export default function Hero() {
  const profile = getProfile()

  return (
    <section className="pt-16 pb-16 md:pt-24 md:pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_3fr] md:gap-0"
        >
          {/* Left: role + coordinates */}
          <div>
            <p className="text-[13px] font-medium tracking-wide text-text-primary">
              {profile.data.title}
            </p>
            <p className="mt-4 text-[13px] tracking-wide text-text-secondary">
              {profile.data.coordinates}
              <br />
              {profile.data.location}
            </p>
            <p className="mt-4 text-[13px] tracking-wide text-accent">
              Available for hire
            </p>
          </div>

          {/* Right: intro paragraph */}
          <p className="max-w-[55ch] text-[clamp(1.1rem,2vw,1.556rem)] leading-[1.4] font-light text-text-primary">
            {profile.content}
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
