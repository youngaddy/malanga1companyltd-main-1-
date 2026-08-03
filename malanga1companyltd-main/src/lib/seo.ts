// Central SEO helpers for Malanga 1 Company Limited
import { COMPANY_NAME, PHONE_TEL, EMAIL, ADDRESS, TIKTOK_URL } from "./contact";

export const SITE_URL = "https://malanga1companyltd.com";
export const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/09399fc2-c058-42c0-8532-e0a13eef2733";

export function canonical(path: string) {
  return `${SITE_URL}${path}`;
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: COMPANY_NAME,
  url: SITE_URL,
  telephone: PHONE_TEL,
  email: EMAIL,
  image: DEFAULT_OG_IMAGE,
  logo: `${SITE_URL}/favicon.png`,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Northern Region, Ghana",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${ADDRESS[0]}, ${ADDRESS[1]}`,
    addressLocality: "Tamale",
    addressRegion: "Northern Region",
    addressCountry: "GH",
  },
  sameAs: [TIKTOK_URL],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: COMPANY_NAME,
  url: SITE_URL,
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}
