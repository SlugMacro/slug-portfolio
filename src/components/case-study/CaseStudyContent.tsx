import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CaseStudyContentProps {
  body: string;
}

export default function CaseStudyContent({ body }: CaseStudyContentProps) {
  return (
    <div
      className="prose prose-lg max-w-[720px] mt-12
        prose-headings:font-medium prose-headings:text-text-primary
        prose-headings:text-[14px] prose-headings:uppercase prose-headings:tracking-[0.1em]
        prose-headings:mt-12 md:prose-headings:mt-16 prose-headings:mb-4 md:prose-headings:mb-6
        prose-p:text-[18px] prose-p:leading-[28px] prose-p:text-text-primary md:prose-p:text-[20px] md:prose-p:leading-[30px]
        prose-li:text-[18px] prose-li:leading-[28px] prose-li:text-text-primary md:prose-li:text-[20px] md:prose-li:leading-[30px]
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-text-primary
        prose-hr:border-border"
    >
      <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
    </div>
  );
}
