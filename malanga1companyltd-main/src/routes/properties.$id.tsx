import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, CheckCircle2, Phone, Mail, MessageCircle, Expand } from "lucide-react";
import { fetchProperty, fetchProperties, type Property } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, whatsappUrl } from "@/lib/contact";
import * as seo from "@/lib/seo";

export const Route = createFileRoute("/properties/$id")({
  loader: async ({ params }) => {
    const property = await fetchProperty(params.id);
    if (!property) throw notFound();
    const all = await fetchProperties();
    return { property, related: all.filter((p) => p.id !== property.id).slice(0, 3) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Property not found | Malanga 1" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.property;
    const title = `${p.title} — ${p.price} | Malanga 1`;
    const desc = `${p.description} in ${p.location}, Tamale. ${p.longDescription.slice(0, 120)}`;
    const url = seo.canonical(`/properties/${params.id}`);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: p.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.title,
            description: p.longDescription,
            image: p.gallery,
            category: "Real Estate",
            brand: { "@type": "Organization", name: "Malanga 1 Company Limited" },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "GHS",
              availability: "https://schema.org/InStock",
              url,
              areaServed: `${p.location}, Tamale, Ghana`,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            seo.breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Properties", path: "/properties" },
              { name: p.title, path: `/properties/${params.id}` },
            ]),
          ),
        },
      ],
    };
  },
  component: PropertyDetail,
  notFoundComponent: PropertyNotFound,
  errorComponent: PropertyError,
});

function PropertyError({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-[60vh] place-items-center px-6 pt-40">
      <div className="text-center">
        <h1 className="mb-4 font-display text-4xl font-bold">Something went wrong</h1>
        <button
          onClick={() => reset()}
          className="rounded-2xl bg-clay px-6 py-3 font-bold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

function PropertyNotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 pt-40">
      <div className="text-center">
        <span className="mb-6 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
          Not Found
        </span>
        <h1 className="mb-4 font-display text-5xl font-bold">Property unavailable</h1>
        <p className="mb-8 opacity-60">This listing may have been sold or removed.</p>
        <Link
          to="/properties"
          className="rounded-2xl bg-clay px-8 py-4 font-bold text-primary-foreground"
        >
          Browse all properties
        </Link>
      </div>
    </main>
  );
}

function PropertyDetail() {
  const { property, related } = Route.useLoaderData() as { property: Property; related: Property[] };
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  
  const waMessage = `Hello Malanga 1, I'm interested in "${property.title}" (${property.price}). Please share more details.`;

  return (
    <main className="px-4 pt-24 pb-24 sm:px-6 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Link
            to="/properties"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold opacity-60 transition-opacity hover:opacity-100"
          >
            <ArrowLeft className="size-4" /> Back to properties
          </Link>
        </Reveal>

        {/* Gallery + summary */}
        <div className="mb-16 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <button
              type="button"
              onClick={() => setLightbox(active)}
              aria-label="View image full-screen"
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-muted"
            >
              <img
                src={property.gallery[active]}
                alt={`${property.title} — view ${active + 1}`}
                className="h-full w-full object-cover transition-opacity duration-500"
              />
              <div
                className={
                  property.tagFeatured
                    ? "absolute top-5 right-5 rounded-full bg-clay/90 px-4 py-1.5 text-xs font-bold text-primary-foreground backdrop-blur"
                    : "glass-strong absolute top-5 right-5 rounded-full px-4 py-1.5 text-xs font-bold"
                }
              >
                {property.tag}
              </div>
              <div className="glass-strong absolute right-5 bottom-5 grid size-11 place-items-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="size-4" />
              </div>
            </button>
            {property.gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {property.gallery.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={
                      "relative aspect-[4/3] overflow-hidden rounded-2xl transition-all " +
                      (active === i
                        ? "ring-2 ring-clay ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100")
                    }
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="glass-strong flex h-full flex-col rounded-[2rem] p-6 shadow-xl sm:rounded-[2.5rem] sm:p-8 md:p-10">
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 text-xs font-semibold tracking-widest uppercase opacity-60">
                <MapPin className="size-3.5 shrink-0" /> <span className="truncate">{property.location}, Tamale</span>
              </span>
              <h1 className="mb-3 font-display text-3xl leading-[1.05] font-bold break-words sm:text-4xl md:text-5xl md:leading-[1]">
                {property.title}
              </h1>
              <p className="mb-6 text-sm opacity-70 sm:text-base">{property.description}</p>
              <div className="mb-8 text-3xl font-bold break-words text-clay sm:text-4xl">{property.price}</div>

              <dl className="mb-8 grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
                {property.specs.map((s) => (
                  <div key={s.label} className="min-w-0">
                    <dt className="text-xs tracking-wider uppercase opacity-50">{s.label}</dt>
                    <dd className="mt-1 text-sm font-semibold break-words sm:text-base">{s.value}</dd>
                  </div>
                ))}
              </dl>


              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={whatsappUrl(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="size-4" /> Chat on WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-clay px-6 py-4 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <Phone className="size-4" /> Call {PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="glass-panel flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-bold transition-colors hover:bg-clay/5"
                >
                  <Mail className="size-4" /> Email us
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Description + features + inquiry */}
        <div className="grid gap-10 md:gap-12 lg:grid-cols-5">
          <div className="space-y-10 md:space-y-12 lg:col-span-3">
            <Reveal>
              <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl">About this property</h2>
              <p className="text-base leading-relaxed opacity-75 sm:text-lg">{property.longDescription}</p>
            </Reveal>

            <Reveal>
              <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">Features</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li
                    key={f}
                    className="glass-panel flex items-start gap-3 rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-clay" />
                    <span className="text-sm font-medium break-words">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="glass-strong rounded-[2rem] p-6 shadow-xl sm:rounded-[2.5rem] sm:p-8 lg:sticky lg:top-28">
              <h2 className="mb-2 font-display text-xl font-bold sm:text-2xl">Enquire about this property</h2>
              <p className="mb-6 text-sm opacity-60">
                Send us a message and we'll respond within one business day.
              </p>
              {sent ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="mb-4 size-14 text-clay" />
                  <h3 className="mb-1 font-display text-xl font-bold">Enquiry sent</h3>
                  <p className="text-sm opacity-60">Our team will be in touch shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const baseApi = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
                    try {
                        const res = await fetch(`${baseApi}/contact/`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: formData.get("name"),
                                phone: formData.get("phone"),
                                email: formData.get("email"),
                                message: formData.get("message"),
                                property_id: property.id
                            })
                        });
                        if (!res.ok) throw new Error("Failed to send enquiry");
                        setSent(true);
                    } catch (err) {
                        console.error(err);
                    }
                  }}
                  className="space-y-3 sm:space-y-4"
                >
                  <input
                    name="name"
                    required
                    placeholder="Full name"
                    className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:px-5 sm:py-3.5"
                  />
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="Phone (+233 ...)"
                    className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:px-5 sm:py-3.5"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email (optional)"
                    className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:px-5 sm:py-3.5"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    defaultValue={`I'm interested in "${property.title}" (${property.price}). Please share more details.`}
                    className="w-full resize-none rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:px-5 sm:py-3.5"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-clay px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] sm:py-4 sm:text-base"
                  >
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Related */}
        <section className="mt-20 md:mt-32">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10 md:gap-6">
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">You may also like</h2>
            <Link
              to="/properties"
              className="text-sm font-semibold text-clay hover:underline"
            >
              View all →
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Link
                key={p.id}
                to="/properties/$id"
                params={{ id: p.id }}
                className="block"
              >
                <PropertyCard property={p} delay={i * 0.1} />
              </Link>
            ))}
          </div>
        </section>

      </div>

      {lightbox !== null && (
        <Lightbox
          items={property.gallery.map((src, i) => ({
            src,
            caption: `${property.title} — view ${i + 1}`,
          }))}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onChange={(i) => {
            setLightbox(i);
            setActive(i);
          }}
        />
      )}
    </main>
  );
}
