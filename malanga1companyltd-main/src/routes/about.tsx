import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Phone, MessageCircle, Mail } from "lucide-react";
import aboutTeam from "@/assets/team_new.jpg";
import founderAsset from "@/assets/founder_new.jpg";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, whatsappUrl } from "@/lib/contact";
import { fetchStats, type Stat } from "@/data/site-content";
import { canonical, DEFAULT_OG_IMAGE, organizationJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const stats = await fetchStats();
    return { stats };
  },
  head: () => ({
    meta: [
      { title: "About Malanga 1 | Trusted Real Estate Developer in Tamale" },
      {
        name: "description",
        content:
          "Malanga 1 Company Limited is a trusted real estate developer in Tamale, Northern Region, Ghana — built on transparency, integrity and verified land documentation.",
      },
      { property: "og:title", content: "About Malanga 1 | Trusted Real Estate Developer in Tamale" },
      {
        property: "og:description",
        content: "A trusted real estate developer in Tamale, Northern Region, Ghana.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/about") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: canonical("/about") }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ),
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Transparency",
    text: "Every plot we sell comes with verified documentation. No hidden fees, no double sales, no surprises.",
  },
  {
    title: "Integrity",
    text: "We build long-term relationships with our clients — trust is the foundation of everything we do.",
  },
  {
    title: "Community",
    text: "We are proudly rooted in Tamale, developing the Northern Region one estate at a time.",
  },
];

function AboutPage() {
  const { stats } = Route.useLoaderData() as { stats: Stat[] };
  return (
    <main className="px-4 pt-28 pb-24 sm:px-6 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid items-center gap-12 md:mb-24 md:gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="mb-6 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
              Our Story
            </span>
            <h1 className="mb-6 font-display text-4xl leading-[1] font-bold sm:text-5xl md:text-7xl md:leading-[0.95]">
              About <span className="text-clay">Malanga 1</span>
            </h1>
            <p className="mb-6 max-w-xl text-base leading-relaxed opacity-70 sm:text-lg">
              Malanga 1 Company Limited is a real estate development company headquartered in
              Tamale, Northern Region, Ghana. We specialize in the sale of land and plots, houses
              for sale, and house rentals — serving families, investors and businesses across the
              North.
            </p>
            <p className="max-w-xl text-sm leading-relaxed opacity-70 sm:text-base">
              Founded on the belief that property ownership should be safe and simple, we've grown
              into one of the region's most trusted developers, delivering verified plots and
              quality homes with complete documentation every time.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <img
              src={aboutTeam}
              alt="The Malanga 1 team reviewing development plans in Tamale"
              loading="lazy"
              width={1200}
              height={900}
              className="w-full rounded-[2rem] object-cover shadow-2xl sm:rounded-[2.5rem]"
            />
            <div className="glass-strong animate-float-slow absolute -bottom-6 left-2 rounded-[1.5rem] p-4 shadow-xl sm:-bottom-8 sm:left-4 sm:rounded-[2rem] sm:p-6 md:-left-10">
              <p className="font-display text-xl font-bold text-clay sm:text-2xl">Est. Tamale</p>
              <p className="text-xs opacity-60 sm:text-sm">Northern Region, Ghana</p>
            </div>
          </Reveal>
        </div>


        {/* Founder */}
        <section className="mb-20 md:mb-24">
          <Reveal className="mb-10 max-w-2xl md:mb-12">
            <span className="mb-4 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
              Leadership
            </span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Meet the <span className="text-clay">Founder</span>
            </h2>
          </Reveal>

          <div className="grid gap-8 md:gap-12 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-[2rem] bg-muted shadow-2xl sm:rounded-[2.5rem]">
                <img
                  src={founderAsset}
                  alt="Alhaji Malanga — Founder & Managing Director of Malanga 1 Company Limited"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="w-full object-cover"
                />
                <div className="glass-strong absolute right-3 bottom-3 left-3 rounded-2xl px-4 py-3 sm:right-4 sm:bottom-4 sm:left-4 sm:px-5 sm:py-4">
                  <p className="font-display text-lg font-bold sm:text-xl">Alhaji Malanga</p>
                  <p className="text-xs tracking-wider uppercase opacity-60">
                    Founder & Managing Director
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col justify-center lg:col-span-3">
              <p className="mb-5 text-base leading-relaxed opacity-75 sm:text-lg">
                "I founded Malanga 1 Company Limited to give families in the North a straight,
                honest path to owning land and a home. For too long, buyers here have had to worry
                about double sales, missing documents and broken promises. We built this company to
                change that — one verified plot, one delivered home at a time."
              </p>
              <p className="mb-8 text-sm leading-relaxed opacity-70 sm:text-base">
                With over a decade of experience across land acquisition, titling and residential
                development in Tamale and the wider Northern Region, our founder personally
                oversees every major project — from the first site visit to the final handover.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={whatsappUrl("Hello, I'd like to speak with the Malanga 1 team.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] sm:px-6 sm:py-3 sm:text-base"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-clay px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] sm:px-6 sm:py-3 sm:text-base"
                >
                  <Phone className="size-4" /> {PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="glass-panel inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition-colors hover:bg-clay/5 sm:px-6 sm:py-3 sm:text-base"
                >
                  <Mail className="size-4" /> Email
                </a>
              </div>
            </Reveal>
          </div>
        </section>


        <div className="mb-20 grid grid-cols-2 gap-4 sm:gap-6 md:mb-24 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.id}
              delay={i * 0.08}
              className="glass-panel rounded-2xl p-5 text-center sm:rounded-3xl sm:p-8"
            >
              <p className="mb-2 font-display text-3xl font-bold text-clay sm:text-4xl md:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs font-medium tracking-widest uppercase opacity-60 sm:text-sm">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-10 text-center md:mb-14">
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">What We Stand For</h2>
        </Reveal>

        <div className="mb-20 grid gap-5 sm:gap-6 md:mb-24 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.1}
              className="rounded-3xl border border-earth/10 p-7 sm:p-10"
            >
              <h3 className="mb-3 font-display text-xl font-bold text-clay sm:text-2xl">{v.title}</h3>
              <p className="text-sm leading-relaxed opacity-60 sm:text-base">{v.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="glass-strong flex flex-col items-center justify-between gap-6 rounded-[2rem] p-8 text-center shadow-xl sm:gap-8 sm:rounded-[2.5rem] sm:p-10 md:flex-row md:p-14 md:text-left">
          <div className="min-w-0">
            <h3 className="mb-2 font-display text-2xl font-bold sm:text-3xl">Come see for yourself.</h3>
            <p className="text-sm break-words opacity-60 sm:text-base">
              Visit us at {ADDRESS.join(" — ")} — or book a free site tour.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 rounded-2xl bg-clay px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
          >
            Get in Touch
          </Link>
        </Reveal>

      </div>
    </main>
  );
}
