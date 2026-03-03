import { z } from 'zod/v4'

export const workFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  year: z.string(),
  client: z.string(),
  type: z.string(),
  tags: z.array(z.string()),
  role: z.string(),
  featured: z.boolean().default(false),
  featuredOrder: z.number().optional(),
  thumbnailImage: z.string().optional(),
  heroImage: z.string().optional(),
  galleryImages: z.array(z.string()).default([]),
  color: z.string().optional(),
  externalUrl: z.string().optional(),
})

export const profileFrontmatterSchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string(),
  coordinates: z.string(),
  email: z.string(),
  availability: z.enum(['available', 'unavailable', 'limited']),
  socialLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
  services: z.array(z.string()),
  experience: z.array(
    z.object({
      period: z.string(),
      role: z.string(),
      company: z.string(),
      location: z.string().optional(),
    })
  ),
  clients: z.array(z.string()).default([]),
})

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>
export type ProfileFrontmatter = z.infer<typeof profileFrontmatterSchema>
