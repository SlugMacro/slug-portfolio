interface ProfileHeroProps {
  content: string
}

export default function ProfileHero({ content }: ProfileHeroProps) {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-base font-medium tracking-wide text-accent">
            About.
          </p>
        </div>
        <div className="col-span-1 mt-4 px-6 sm:col-span-2 sm:mt-0 sm:px-8 md:px-12 space-y-6">
          {content.split('\n\n').map((para, i) => (
            <p key={i} className="max-w-[55ch] text-xl leading-[1.5] font-normal text-text-primary">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
