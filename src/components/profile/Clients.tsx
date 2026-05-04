interface ClientsProps {
  clients: string[]
}

export default function Clients({ clients }: ClientsProps) {
  if (clients.length === 0) return null

  return (
    <section className="border-t border-border py-16 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-base font-medium text-accent">
            Clients.
          </p>
        </div>
        <div className="col-span-1 mt-4 px-6 sm:col-span-3 sm:mt-0 sm:px-8 md:px-12 lg:col-span-2">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {clients.map((client) => (
              <span
                key={client}
                className="text-base text-text-secondary"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
