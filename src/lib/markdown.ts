import { z } from "zod";

// Zod schema — single source of truth for project frontmatter shape
export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  year: z.string(),
  tags: z.array(z.string()),
  role: z.string(),
  description: z.string(),
  scope: z.array(z.string()),
  impact: z.array(z.string()),
  color: z.string(),
  coverImage: z.string().optional(),
});

export const AboutSchema = z.object({
  name: z.string(),
  headline: z.string(),
  location: z.string().optional(),
});

export type ProjectMeta = z.infer<typeof ProjectSchema>;
export type AboutMeta = z.infer<typeof AboutSchema>;

export interface ParsedProject {
  meta: ProjectMeta;
  body: string;
}

export interface ParsedAbout {
  meta: AboutMeta;
  body: string;
}
