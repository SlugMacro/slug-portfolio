export default function Footer() {
  return (
    <footer>
      <div className="px-6 py-24 sm:px-8 md:px-12 md:py-36">
        <p className="max-w-full lg:max-w-[50%] font-display text-display leading-[1] font-normal tracking-tight text-text-primary">Let's build something together.</p>
        <a href="mailto:macroslug@gmail.com" className="mt-6 inline-block text-base tracking-wide text-text-primary underline decoration-[#555] underline-offset-4 transition-colors duration-300 hover:decoration-accent">macroslug@gmail.com</a>
      </div>
      <div className="flex flex-col gap-3 border-t border-border px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-12 md:px-12">
        <p className="text-sm tracking-wide text-text-tertiary">&copy; {new Date().getFullYear()} Slug Macro. From Vietnam with love.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="/" className="text-sm tracking-wide text-text-tertiary underline decoration-[#555] underline-offset-4 transition-colors hover:text-text-primary hover:decoration-accent">Projects</a>
          <a href="/profile" className="text-sm tracking-wide text-text-tertiary underline decoration-[#555] underline-offset-4 transition-colors hover:text-text-primary hover:decoration-accent">Information</a>
          <a href="https://www.linkedin.com/in/le-duc-4769bb2a1/" target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide text-text-tertiary underline decoration-[#555] underline-offset-4 transition-colors hover:text-text-primary hover:decoration-accent">LinkedIn</a>
          <a href="https://github.com/slugmacro" target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide text-text-tertiary underline decoration-[#555] underline-offset-4 transition-colors hover:text-text-primary hover:decoration-accent">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
