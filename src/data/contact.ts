// src/data/contact.ts

export interface ContactInfo {
  email: string;
  socialLinks: {
    label: string;
    url: string;
  }[];
  formspreeEndpoint: string;
}

export const contactData: ContactInfo = {
  email: "hello@slugmacro.com",
  socialLinks: [
    { label: "LinkedIn", url: "https://linkedin.com/in/slugmacro" },
    { label: "Twitter", url: "https://twitter.com/slugmacro" },
    { label: "Dribbble", url: "https://dribbble.com/slugmacro" },
  ],
  formspreeEndpoint: "https://formspree.io/f/PLACEHOLDER",
};
