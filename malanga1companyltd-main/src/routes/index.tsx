import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { fetchProperties, type Property } from "@/data/properties";
import { fetchTestimonials, fetchStats, type Testimonial, type Stat } from "@/data/site-content";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { StatsBand } from "@/components/StatsBand";
import { Testimonials } from "@/components/Testimonials";
import { ReviewForm } from "@/components/ReviewForm";
import heroVilla from "@/assets/hero-villa.jpg";

import { canonical, DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [properties, testimonials, stats] = await Promise.all([
      fetchProperties(),
      fetchTestimonials(),
      fetchStats(),
    ]);
    return { properties, testimonials, stats };
  },
  head: () => ({
    meta: [
      { title: "Malanga 1 Company Limited | Real Estate in Tamale, Ghana" },
      {
        name: "description",
        content:
          "Premium land plots, houses for sale and rentals in Tamale, Northern Region, Ghana. Verified listings, full documentation, trusted since day one.",
      },
      { property: "og:title", content: "Malanga 1 Company Limited | Real Estate in Tamale, Ghana" },
      {
        property: "og:description",
        content:
          "Premium land plots, houses for sale and rentals in Tamale, Northern Region, Ghana.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: canonical("/") }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
    ],
  }),
  component: Index,
});

const services = [
  {
    num: "01",
    title: "Land Sales",
    text: "Verified plots in rapidly developing areas with full documentation.",
  },
  {
    num: "02",
    title: "Property Development",
    text: "Modern architectural designs tailored to the tropical Northern climate.",
  },
  {
    num: "03",
    title: "House Rentals",
    text: "Curated listings of family homes and executive apartments for lease.",
  },
  {
    num: "04",
    title: "Real Estate Sales",
    text: "Direct sales of newly built residential and commercial properties.",
  },
];

function Index() {
  const { properties, testimonials, stats } = Route.useLoaderData() as {
    properties: Property[];
    testimonials: Testimonial[];
    stats: Stat[];
  };
  const featured = properties.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <header className="relative flex min-h-[92vh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-24 lg:min-h-screen lg:pt-24 lg:pb-0">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroVilla}
            className="h-full w-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/7578539/7578539-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        </div>

        <div className="absolute top-0 right-0 h-full w-1/2 bg-linear-to-bl from-clay/10 to-transparent z-10" />
        <div className="animate-glow-pulse absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-clay/20 blur-[120px] z-10" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:gap-12 lg:grid-cols-2 z-10 relative">
          <div className="z-10">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-[11px] font-bold tracking-widest text-clay uppercase sm:mb-6 sm:text-xs"
            >
              Tamale's Premier Developer
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 font-display text-4xl leading-[0.95] font-bold sm:text-5xl md:text-6xl md:leading-[0.9] lg:text-7xl xl:text-8xl"
            >
              Building the <span className="text-clay">Future</span> of the North.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 max-w-md text-base leading-relaxed opacity-70 sm:mb-10 sm:text-lg"
            >
              Specializing in premium land plots, luxury house rentals, and strategic property
              development across the Northern Region of Ghana.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 glass-panel flex w-full max-w-lg items-center rounded-full p-2 shadow-lg"
            >
              <div className="flex-1 px-4 sm:px-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-xs">Location</p>
                <select className="w-full bg-transparent text-sm font-medium outline-none appearance-none cursor-pointer">
                  <option>Anywhere</option>
                  <option>Tamale</option>
                  <option>Sagnarigu</option>
                </select>
              </div>
              <div className="h-8 w-px bg-border/50 mx-1 sm:mx-2" />
              <div className="flex-1 px-4 sm:px-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-xs">Property Type</p>
                <select className="w-full bg-transparent text-sm font-medium outline-none appearance-none cursor-pointer">
                  <option>All Types</option>
                  <option>Land Plots</option>
                  <option>Houses</option>
                </select>
              </div>
              <Link
                to="/properties"
                className="grid size-12 sm:size-14 shrink-0 place-items-center rounded-full bg-clay text-primary-foreground transition-all hover:bg-clay/90 hover:scale-105 shadow-md"
                aria-label="Search properties"
              >
                <Search className="size-5 sm:size-6" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={heroVilla}
                className="h-full w-full object-cover"
              >
                <source src="https://videos.pexels.com/video-files/7578539/7578539-uhd_2560_1440_25fps.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="glass-strong animate-float-slow absolute -bottom-6 left-2 max-w-[16rem] rounded-2xl p-5 shadow-xl sm:-bottom-8 sm:-left-4 sm:max-w-xs sm:rounded-[2rem] sm:p-8 md:-left-16">
              <p className="mb-2 font-display text-lg font-bold italic sm:text-2xl">
                "Trust is our foundation."
              </p>
              <div className="flex items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-clay/20 sm:size-10">
                  <div className="size-2 rounded-full bg-clay" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">150+ Plots Sold</p>
                  <p className="truncate text-xs opacity-60">Across Tamale &amp; Sagnarigu</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats */}
      <StatsBand stats={stats} />

      {/* Featured Properties */}
      <section className="px-5 py-20 sm:px-6 sm:py-28 md:py-32">

        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
                Featured Properties
              </h2>
              <p className="max-w-sm opacity-60">
                Handpicked land and residential opportunities in prime locations.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex gap-4">
              <Link
                to="/properties"
                search={{ type: "plot" }}
                className="rounded-full border border-earth/10 px-6 py-4 transition-colors hover:bg-clay/5"
              >
                Plot Sales
              </Link>
              <Link
                to="/properties"
                search={{ type: "rental" }}
                className="rounded-full border border-earth/10 px-6 py-4 transition-colors hover:bg-clay/5"
              >
                Rentals
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featured.map((p, i) => (
              <Link key={p.id} to="/properties/$id" params={{ id: p.id }} className="block">
                <PropertyCard property={p} delay={i * 0.12} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative bg-clay/5 py-20 sm:py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="mb-14 text-center md:mb-20">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Integrated Services
            </h2>
            <p className="mx-auto max-w-lg opacity-60">
              From land acquisition to architectural mastery, we handle every stage of your
              property journey.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal
                key={s.num}
                delay={i * 0.1}
                className="glass-panel rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-2 sm:p-8"
              >
                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-clay font-bold text-primary-foreground">
                  {s.num}
                </div>
                <h4 className="mb-3 text-xl font-bold">{s.title}</h4>
                <p className="text-sm leading-relaxed opacity-60">{s.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-14 text-center md:mt-16">
            <Link
              to="/services"
              className="inline-block rounded-2xl bg-earth px-8 py-4 font-bold text-earth-foreground transition-colors hover:bg-clay"
            >
              Explore All Services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Leave a Review */}
      <ReviewForm />
    </main>
  );
}
