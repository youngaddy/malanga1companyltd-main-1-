import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Map, List } from "lucide-react";
import { z } from "zod";
import { fetchProperties, type PropertyType, type Property } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import * as seo from "@/lib/seo";

const searchSchema = z.object({
  type: z.enum(["plot", "house", "rental"]).optional(),
});

export const Route = createFileRoute("/properties/")({
  validateSearch: searchSchema,
  loader: async () => {
    const properties = await fetchProperties();
    return { properties };
  },
  head: () => ({
    meta: [
      { title: "Properties | Land Plots, Houses & Rentals in Tamale" },
      {
        name: "description",
        content:
          "Browse verified land plots, houses for sale and rentals in Tamale, Northern Region, Ghana — full documentation on every listing.",
      },
      { property: "og:title", content: "Properties | Land Plots, Houses & Rentals in Tamale" },
      {
        property: "og:description",
        content: "Verified land plots, houses for sale and rentals in Tamale, Ghana.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: seo.canonical("/properties") },
      { property: "og:image", content: seo.DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: seo.DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: seo.canonical("/properties") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Malanga 1 Property Listings",
          itemListElement: [] // Too complex to build dynamically here without passing data to head properly, let's leave generic schema or just keep empty for now
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          seo.breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
          ]),
        ),
      },
    ],
  }),
  component: PropertiesPage,
});

const filters: { label: string; value?: PropertyType }[] = [
  { label: "All Listings", value: undefined },
  { label: "Land & Plots", value: "plot" },
  { label: "Houses for Sale", value: "house" },
  { label: "Rentals", value: "rental" },
];

function PropertiesPage() {
  const { properties } = Route.useLoaderData() as { properties: Property[] };
  const { type } = Route.useSearch();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const list = useMemo(
    () => (type ? properties.filter((p) => p.type === type) : properties),
    [type, properties],
  );

  return (
    <main className="px-6 pt-40 pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl">
          <span className="mb-6 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
            Portfolio
          </span>
          <h1 className="mb-6 font-display text-5xl leading-[0.95] font-bold md:text-7xl">
            Our <span className="text-clay">Properties</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed opacity-70">
            Verified plots, houses for sale and rentals across Tamale and the Northern Region —
            every listing backed by full documentation.
          </p>
        </Reveal>

        <div className="mb-8 flex items-center justify-between">
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <Link
                key={f.label}
                to="/properties"
                search={f.value ? { type: f.value } : {}}
                className={
                  type === f.value
                    ? "rounded-full bg-earth px-6 py-3 text-sm font-semibold text-earth-foreground"
                    : "glass-panel rounded-full px-6 py-3 text-sm font-semibold transition-colors hover:bg-clay/5"
                }
              >
                {f.label}
              </Link>
            ))}
          </Reveal>
          
          <Reveal delay={0.1} className="hidden md:flex glass-panel rounded-full p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${viewMode === "list" ? "bg-clay text-primary-foreground" : "hover:bg-clay/10"}`}
            >
              <List className="size-4" /> List
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${viewMode === "map" ? "bg-clay text-primary-foreground" : "hover:bg-clay/10"}`}
            >
              <Map className="size-4" /> Map View
            </button>
          </Reveal>
        </div>

        {viewMode === "list" ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Link key={p.id} to="/properties/$id" params={{ id: p.id }} className="block">
                <PropertyCard property={p} delay={(i % 3) * 0.1} />
              </Link>
            ))}
          </div>
        ) : (
          <Reveal className="w-full h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl relative">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126620.07632617637!2d-0.9234857597148106!3d9.421674404098606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfa0076a591e1d31%3A0xc6c4f34d193d5f19!2sTamale%2C%20Ghana!5e0!3m2!1sen!2sus!4v1714571212852!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-6 left-6 glass-strong p-4 rounded-2xl max-w-xs">
                <h3 className="font-display font-bold text-lg mb-1">Interactive Map</h3>
                <p className="text-sm opacity-70">Explore all {list.length} properties across Tamale.</p>
              </div>
          </Reveal>
        )}

        <Reveal className="glass-strong mt-24 flex flex-col items-center justify-between gap-8 rounded-[2.5rem] p-10 text-center shadow-xl md:flex-row md:p-14 md:text-left">
          <div>
            <h3 className="mb-2 font-display text-3xl font-bold">
              Didn't find what you're looking for?
            </h3>
            <p className="opacity-60">
              Tell us your budget and preferred area — we'll source it for you.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 rounded-2xl bg-clay px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            Make an Enquiry
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
