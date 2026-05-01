export default function Footer() {
  return (
    <footer>
      <div className="px-6 py-24 sm:px-8 md:px-12 md:py-36">
        <p className="max-w-[50%] font-display text-display leading-[1] font-normal tracking-tight text-text-primary">Let's build something together.</p>
        <a href="mailto:macroslug@gmail.com" className="mt-6 inline-block text-base tracking-wide text-text-primary underline decoration-[#333] underline-offset-4 transition-colors duration-300 hover:decoration-accent">macroslug@gmail.com</a>
      </div>
      <div className="flex items-center justify-between border-t border-border px-6 sm:px-8 md:px-12" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <p className="text-sm tracking-wide text-text-tertiary">&copy; {new Date().getFullYear()} Slug Macro</p>
        <div className="flex gap-6">
          <a href="/" className="text-sm tracking-wide text-text-tertiary transition-colors hover:text-text-primary">Projects</a>
          <a href="/profile" className="text-sm tracking-wide text-text-tertiary transition-colors hover:text-text-primary">Info</a>
          <a href="https://www.linkedin.com/in/le-duc-4769bb2a1/" target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide text-text-tertiary transition-colors hover:text-text-primary">LinkedIn</a>
          <a href="https://github.com/slugmacro" target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide text-text-tertiary transition-colors hover:text-text-primary">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
