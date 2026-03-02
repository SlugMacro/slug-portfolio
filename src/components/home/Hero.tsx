import { useScroll, useTransform, motion } from "motion/react";

export default function Hero() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <>
      {/* Fixed hero text — visible through left 25% gap (desktop only, lg+) */}
      <motion.div
        className="fixed top-0 left-0 z-[1] hidden max-w-[1800px] items-start px-6 pt-[180px] lg:flex"
        style={{ width: "min(1200px, 56%)", y: heroY, opacity: heroOpacity }}
      >
        <h1 className="text-[clamp(56px,5.5vw,88px)] leading-[1.05] tracking-[-0.16vw] font-medium text-text-primary">
          Hi, I'm Slug Macro — a product builder designing and building complex systems, from trading infrastructure to AI-native products.
        </h1>
      </motion.div>

      {/* Mobile + Tablet hero — static, in flow */}
      <div className="flex min-h-screen w-full items-end px-6 pb-12 pt-24 lg:hidden">
        <div>
          <h1 className="text-[clamp(32px,5vw,48px)] leading-[1.15] tracking-[-0.16vw] text-text-primary">
            Product &amp; Systems Builder
          </h1>
          <p className="mt-6 text-[16px] leading-[1.5] text-text-secondary md:text-[18px]">
            Trading Infrastructure &amp; AI Systems
          </p>
        </div>
      </div>

      {/* Desktop spacer — pushes grid down in document flow (matches standfirst-holder) */}
      <div className="hidden lg:block" style={{ height: "70vh" }} />
    </>
  );
}
