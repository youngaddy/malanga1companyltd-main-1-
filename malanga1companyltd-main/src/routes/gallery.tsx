import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { Expand } from "lucide-react";
import heroVilla from "@/assets/hero-villa.jpg";
import plotLamashegu from "@/assets/plot-lamashegu.jpg";
import rentalVittin from "@/assets/rental-vittin.jpg";
import plotKalpohin from "@/assets/plot-kalpohin.jpg";
import houseSale from "@/assets/house-sale.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryConstruction from "@/assets/gallery-construction.jpg";
import galleryEstate from "@/assets/gallery-estate.jpg";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";

import * as seo from "@/lib/seo";

interface GalleryItem {
  src: string;
  caption: string;
  tall: boolean;
}

const fallbackItems: GalleryItem[] = [
  { src: heroVilla, caption: "The Savanna Villa — Airport Ridge", tall: true },
  { src: galleryEstate, caption: "Gurugu Gated Estate — Aerial View", tall: false },
  { src: galleryInterior, caption: "Living Room — The Garden Residency", tall: false },
  { src: plotLamashegu, caption: "Lamashegu Plots — Demarcated & Serviced", tall: true },
  { src: galleryConstruction, caption: "Ongoing Development — Sagnarigu", tall: false },
  { src: galleryKitchen, caption: "Kitchen & Dining — Executive Unit", tall: false },
  { src: rentalVittin, caption: "Vittin Bungalow — For Rent", tall: true },
  { src: houseSale, caption: "Sagnarigu Family Home — For Sale", tall: false },
  { src: plotKalpohin, caption: "Kalpohin — Ready-to-Build Foundation", tall: false },
];

async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const baseApi = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  let apiItems: GalleryItem[] = [];
  try {
    const res = await fetch(`${baseApi}/gallery/`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) apiItems = data;
    }
  } catch {
    // Backend offline — use sample images only
  }
  const fallbackFilenames = new Set(fallbackItems.map((i) => i.src.split("/").pop()));
  const uniqueApiItems = apiItems.filter((i) => !fallbackFilenames.has(i.src.split("/").pop()));
  return [...fallbackItems, ...uniqueApiItems];
}

export const Route = createFileRoute("/gallery")({
  loader: async () => {
    const items = await fetchGalleryItems();
    return { items };
  },
  head: () => ({
    meta: [
      { title: "Gallery | Estates, Homes & Land in Tamale — Malanga 1" },
      {
        name: "description",
        content:
          "A visual tour of Malanga 1 developments — estates, homes, interiors and land projects in Tamale, Northern Region, Ghana.",
      },
      { property: "og:title", content: "Gallery | Estates, Homes & Land in Tamale — Malanga 1" },
      {
        property: "og:description",
        content: "Estates, homes, interiors and land projects in Tamale, Ghana.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: seo.canonical("/gallery") },
      { property: "og:image", content: seo.DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: seo.DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: seo.canonical("/gallery") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          seo.breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ),
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { items } = Route.useLoaderData() as { items: GalleryItem[] };
  const [active, setActive] = useState<number | null>(null);

  return (
    <main className="px-6 pt-40 pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-2xl">
          <span className="mb-6 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
            Our Work
          </span>
          <h1 className="mb-6 font-display text-5xl leading-[0.95] font-bold md:text-7xl">
            The <span className="text-clay">Gallery</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed opacity-70">
            A visual tour of our developments — estates, homes, interiors and land projects across
            Tamale and the Northern Region. Tap any photo to view it full-screen.
          </p>
        </Reveal>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {items.map((item, i) => (
            <Reveal key={item.caption + i} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View ${item.caption} full-screen`}
                className="group relative block w-full overflow-hidden rounded-[2rem] text-left"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  width={960}
                  height={item.tall ? 1200 : 720}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="glass-strong absolute top-4 right-4 grid size-10 place-items-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="size-4" />
                </div>
                <div className="glass-strong absolute right-4 bottom-4 left-4 translate-y-2 rounded-2xl px-5 py-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold">{item.caption}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && (
        <Lightbox
          items={items.map((i) => ({ src: i.src, caption: i.caption }))}
          index={active}
          onClose={() => setActive(null)}
          onChange={setActive}
        />
      )}
    </main>
  );
}
