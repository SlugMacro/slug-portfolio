interface RecognitionItem {
  title: string
  org: string
  year?: string
}

interface RecognitionProps {
  recognition: RecognitionItem[]
}

export default function Recognition({ recognition }: RecognitionProps) {
  if (recognition.length === 0) return null

  return (
    <section className="border-t border-border py-16 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-base font-medium tracking-wide text-accent">
            Recognition.
          </p>
        </div>
        <div className="col-span-1 mt-4 px-6 sm:col-span-2 sm:mt-0 sm:px-8 md:px-12">
          <div className="space-y-4">
            {recognition.map((item, i) => (
              <div
                key={i}
                className={`flex items-baseline justify-between pb-4${i < recognition.length - 1 ? ' border-b border-border' : ''}`}
              >
                <div>
                  <span className="text-base tracking-wide text-text-primary">
                    {item.title}
                  </span>
                  <span className="ml-2 text-base tracking-wide text-text-secondary">
                    — {item.org}
                  </span>
                </div>
                {item.year && (
                  <span className="text-sm tabular-nums tracking-wide text-text-tertiary">
                    {item.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
