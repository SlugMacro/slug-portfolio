export const SITE_NAME = "Slug Macro";
export const SITE_DESCRIPTION =
  "Product Designer focused on trading systems and AI-native products.";
export const SITE_URL = "https://slugmacro.com"; // TODO: Update with actual production domain before deployment
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`; // TODO: Add og-default.png (1200x630) to public/ before deployment

export function pageTitle(page?: string): string {
  return page ? `${page} | ${SITE_NAME}` : `${SITE_NAME} | Product Designer`;
}

export function ogImageUrl(path?: string): string {
  return path ? `${SITE_URL}${path}` : DEFAULT_OG_IMAGE;
}
