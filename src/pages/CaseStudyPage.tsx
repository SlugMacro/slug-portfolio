import { useParams, Navigate } from "react-router-dom";
import { getProject } from "@/content/loader";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="px-6 pt-16 pb-24 md:px-8 md:pt-[130px]">
      <CaseStudyHeader meta={project.meta} />
      <CaseStudyContent body={project.body} />
    </article>
  );
}
