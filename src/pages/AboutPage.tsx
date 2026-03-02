import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { about } from "@/content/loader";

export default function AboutPage() {
  return (
    <>
      <title>About | Slug Macro</title>
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
          <div
            className="prose prose-lg max-w-[720px]
              prose-headings:font-medium prose-headings:text-text-secondary
              prose-headings:text-[14px] prose-headings:uppercase prose-headings:tracking-[0.1em]
              prose-headings:mt-16 md:prose-headings:mt-24 prose-headings:mb-6 md:prose-headings:mb-8
              prose-p:text-[18px] prose-p:leading-[28px] prose-p:text-text-primary md:prose-p:text-[20px] md:prose-p:leading-[30px]
              prose-li:text-[18px] prose-li:leading-[28px] prose-li:text-text-primary md:prose-li:text-[20px] md:prose-li:leading-[30px]
              prose-ul:list-none prose-ul:pl-0
              prose-li:border-t prose-li:border-border prose-li:py-4 md:prose-li:py-5
              prose-strong:text-text-primary
              prose-hr:border-border
            "
          >
            <Markdown remarkPlugins={[remarkGfm]}>{about.body}</Markdown>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
