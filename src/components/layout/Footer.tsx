export default function Footer() {
  return (
    <footer className="relative flex h-screen items-end overflow-hidden bg-bg">
      <span className="select-none text-[25vw] font-medium leading-none tracking-[-0.04em] text-text-primary/[0.03]">
        SM
      </span>
      <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-2 text-[13px] text-text-secondary sm:flex-row sm:items-end sm:justify-between md:left-8 md:right-8">
        <span>&copy; {new Date().getFullYear()} Slug Macro</span>
        <span>Product &amp; Systems Builder</span>
      </div>
    </footer>
  );
}
