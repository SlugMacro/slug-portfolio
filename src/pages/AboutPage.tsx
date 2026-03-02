import { aboutData } from "@/data/about";

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero text: static on mobile, fixed on desktop */}
      <div className="relative z-0 flex min-h-[50vh] w-full items-end px-6 pb-12 pt-24 md:fixed md:top-0 md:left-0 md:w-[25%] md:max-w-[450px] md:items-start md:px-8 md:pt-[180px]">
        <h1 className="text-[clamp(56px,6vw,88px)] leading-[1.05] tracking-[-0.16vw] font-bold text-text-primary">
          About
        </h1>
      </div>

      {/* Scrolling content */}
      <div className="relative z-10 w-full px-6 pb-24 md:ml-auto md:w-[75%] md:pt-[70vh] md:pr-8 md:pl-0">
        <div className="bg-bg pt-8 md:pl-8 md:pt-16">
          <section className="max-w-[720px]">
            <p className="text-[18px] leading-[28px] text-text-primary md:text-[20px] md:leading-[30px]">
              {aboutData.intro}
            </p>
            <p className="mt-6 text-[18px] leading-[28px] text-text-secondary md:text-[20px] md:leading-[30px]">
              {aboutData.extendedIntro}
            </p>
          </section>

          <section className="mt-16 max-w-[720px] md:mt-24">
            <h2 className="mb-6 text-[14px] uppercase tracking-[0.1em] text-text-secondary md:mb-8">
              Strengths
            </h2>
            <ul className="space-y-0">
              {aboutData.strengths.map((item, i) => (
                <li
                  key={i}
                  className="border-t border-border py-4 text-[18px] leading-[28px] text-text-primary md:py-5 md:text-[20px] md:leading-[30px]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 max-w-[720px] md:mt-24">
            <h2 className="mb-6 text-[14px] uppercase tracking-[0.1em] text-text-secondary md:mb-8">
              Product Philosophy
            </h2>
            <p className="text-[18px] leading-[28px] text-text-primary md:text-[20px] md:leading-[30px]">
              {aboutData.philosophy.intro}
            </p>
            <ul className="mt-6 space-y-0 md:mt-8">
              {aboutData.philosophy.points.map((point, i) => (
                <li
                  key={i}
                  className="border-t border-border py-4 text-[18px] leading-[28px] text-text-primary md:py-5 md:text-[20px] md:leading-[30px]"
                >
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-border pt-6 text-[18px] leading-[28px] text-text-secondary md:mt-12 md:pt-8 md:text-[20px] md:leading-[30px]">
              {aboutData.philosophy.closing}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
