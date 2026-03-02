import matter from "gray-matter";
import {
  ProjectSchema,
  AboutSchema,
  type ParsedProject,
  type ParsedAbout,
} from "@/lib/markdown";

// Explicit imports — intentional ordering (display order in grid)
import rawWhalesMarket from "./projects/whales-market.md?raw";
import rawWhalesPredict from "./projects/whales-predict.md?raw";
import rawMentionNetwork from "./projects/mention-network.md?raw";
import rawGeoReport from "./projects/geo-report.md?raw";
import rawAbout from "./about.md?raw";

function parseProject(raw: string): ParsedProject {
  const { data, content } = matter(raw);
  const meta = ProjectSchema.parse(data); // throws ZodError if frontmatter is invalid
  return { meta, body: content };
}

function parseAbout(raw: string): ParsedAbout {
  const { data, content } = matter(raw);
  const meta = AboutSchema.parse(data); // throws ZodError if frontmatter is invalid
  return { meta, body: content };
}

// Projects ordered intentionally (display order in grid)
export const projects: ParsedProject[] = [
  parseProject(rawWhalesMarket),
  parseProject(rawWhalesPredict),
  parseProject(rawMentionNetwork),
  parseProject(rawGeoReport),
];

export function getProject(slug: string): ParsedProject | undefined {
  return projects.find((p) => p.meta.slug === slug);
}

export const about: ParsedAbout = parseAbout(rawAbout);
