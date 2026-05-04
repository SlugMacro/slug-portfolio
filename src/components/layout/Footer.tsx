export default function Footer() {
  return (
    <footer>
      <div className="px-6 py-24 sm:px-8 md:px-12 md:py-36">
        <p className="max-w-full lg:max-w-[50%] font-display text-display leading-[1] font-normal tracking-tight text-text-primary">I turn complex systems into products people can actually use.</p>
        <a href="mailto:slugmacro@gmail.com" className="mt-6 inline-block text-base text-text-primary link-underline">slugmacro@gmail.com</a>
      </div>
      <div className="flex flex-col gap-3 border-t border-border px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-12 md:px-12">
        <p className="text-sm text-text-tertiary">&copy; {new Date().getFullYear()} Slug Macro. From Vietnam with love.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="/" className="text-sm text-text-tertiary link-underline hover:text-text-primary">Projects</a>
          <a href="/profile" className="text-sm text-text-tertiary link-underline hover:text-text-primary">Information</a>
          <a href="https://www.linkedin.com/in/le-duc-4769bb2a1/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-tertiary link-underline hover:text-text-primary">LinkedIn</a>

        </div>
      </div>
    </footer>
  )
}
