export default function Footer() {
  return (
    <footer className="relative flex h-screen items-end overflow-hidden bg-bg">
      <span className="select-none text-[25vw] font-medium leading-none tracking-[-0.04em] text-text-primary/[0.03]">
        SM
      </span>
      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-[13px] text-text-secondary">
        <span>&copy; {new Date().getFullYear()} Slug Macro</span>
        <span>Product &amp; Systems Builder</span>
      </div>
    </footer>
  );
}
