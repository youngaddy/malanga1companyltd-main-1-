import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import {
  Building2,
  Home,
  Truck,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import * as seo from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Malanga 1 Company Limited" },
      {
        name: "description",
        content:
          "Construction & Development, Real Estate Services, and Construction Materials Supply in Tamale, Northern Region, Ghana.",
      },
      { property: "og:title", content: "Our Services — Malanga 1 Company Limited" },
      {
        property: "og:description",
        content: "Construction, real estate, and building materials supply in Tamale, Ghana.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: seo.canonical("/services") },
      { property: "og:image", content: seo.DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: seo.DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: seo.canonical("/services") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Services — Malanga 1 Company Limited",
          itemListElement: [
            "General Construction",
            "Building Designs",
            "Project Management",
            "Consultancy Services",
            "Buying and Selling of Plots",
            "Buying and Selling of Houses",
            "Rental of Homes",
            "Sea Sand Supply",
            "Aggregate Supply",
          ].map((name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name, areaServed: "Tamale, Ghana" },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          seo.breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ),
      },
    ],
  }),
  component: ServicesPage,
});

interface ServiceCategory {
  icon: typeof Building2;
  title: string;
  items: string[];
  cta?: string;
  ctaLink?: "/properties" | "/contact";
}

const categories: ServiceCategory[] = [
  {
    icon: Building2,
    title: "Construction & Development",
    items: [
      "General Construction",
      "Building Designs",
      "Project Management",
      "Consultancy Services",
      "Moulding of Pillars",
      "Demarcation of Plots",
    ],
    cta: "Discuss a project",
    ctaLink: "/contact",
  },
  {
    icon: Home,
    title: "Real Estate Services",
    items: [
      "Buying and Selling of Plots",
      "Buying and Selling of Houses",
      "Rental of Homes",
    ],
    cta: "Browse properties",
    ctaLink: "/properties",
  },
  {
    icon: Truck,
    title: "Construction Materials Supply",
    items: [
      "Sea Sand",
      "Aggregate",
      "Gravel",
      "Quarry Dust",
    ],
    cta: "Get a quote",
    ctaLink: "/contact",
  },
];

const steps = [
  { num: "01", title: "Consultation", text: "Tell us what you're looking for — plot, house, or rental — and your budget." },
  { num: "02", title: "Site Inspection", text: "We take you to view verified properties that match your needs." },
  { num: "03", title: "Documentation", text: "We handle title processing and all legal paperwork transparently." },
  { num: "04", title: "Handover", text: "You receive your keys or documents — your property, secured." },
];

function ServicesPage() {
  return (
    <main className="px-4 pt-28 pb-24 sm:px-6 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl md:mb-20">
          <span className="mb-6 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
            Our Services
          </span>
          <h1 className="mb-6 font-display text-4xl leading-[1] font-bold sm:text-5xl md:text-7xl md:leading-[0.95]">
            Construction, Real Estate <span className="text-clay">& More</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed opacity-70 sm:text-lg">
            From building and development to property sales and material supply — 
            Malanga 1 delivers end-to-end solutions across Tamale and the Northern Region.
          </p>
        </Reveal>


        <div className="mb-24 grid gap-6 md:mb-32 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.1}>
              <div className="glass-panel group flex h-full flex-col rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-clay/5 sm:p-8">
                <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-clay text-primary-foreground">
                  <cat.icon className="size-5" />
                </div>
                <h3 className="mb-4 text-xl font-bold">{cat.title}</h3>
                <ul className="mb-6 space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed opacity-70">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-clay" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {cat.cta && cat.ctaLink && (
                  <Link
                    to={cat.ctaLink}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-clay"
                  >
                    {cat.cta} <ArrowUpRight className="size-4" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mx-auto max-w-lg text-sm opacity-60 sm:text-base">
            A simple, transparent process from first call to handover.
          </p>
        </Reveal>

        <div className="mb-20 grid gap-5 sm:gap-6 md:mb-24 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1} className="rounded-3xl border border-earth/10 p-6 sm:p-8">
              <span className="mb-4 block font-display text-4xl font-bold text-clay/30">
                {s.num}
              </span>
              <h4 className="mb-2 text-lg font-bold">{s.title}</h4>
              <p className="text-sm leading-relaxed opacity-60">{s.text}</p>
            </Reveal>
          ))}
        </div>


        <Reveal className="glass-strong flex flex-col items-center justify-between gap-6 rounded-[2rem] p-8 text-center shadow-xl sm:gap-8 sm:rounded-[2.5rem] sm:p-10 md:flex-row md:p-14 md:text-left">
          <div>
            <h3 className="mb-2 font-display text-2xl font-bold sm:text-3xl">
              Ready to start your property journey?
            </h3>
            <p className="text-sm opacity-60 sm:text-base">Speak with our Tamale team today — consultation is free.</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 rounded-2xl bg-clay px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
          >
            Book Consultation
          </Link>
        </Reveal>

      </div>
    </main>
  );
}
