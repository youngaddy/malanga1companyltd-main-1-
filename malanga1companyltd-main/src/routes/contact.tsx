import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { MapPin, Phone, Mail, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS, whatsappUrl } from "@/lib/contact";
import { canonical, DEFAULT_OG_IMAGE, organizationJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Malanga 1 in Tamale | Land, Houses & Rentals" },
      {
        name: "description",
        content:
          "Reach Malanga 1 Company Limited at Naa Luro Estates (Choggu Yapalsi), Kumbungu Main Road, Tamale — enquiries on land, houses for sale and rentals.",
      },
      { property: "og:title", content: "Contact Malanga 1 in Tamale | Land, Houses & Rentals" },
      {
        property: "og:description",
        content: "Reach our Tamale office for land, house sales and rental enquiries.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical("/contact") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: canonical("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          ...organizationJsonLd,
          "@type": ["RealEstateAgent", "LocalBusiness"],
          openingHours: "Mo-Sa 08:00-18:00",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ),
      },
    ],
  }),
  component: ContactPage,
});

const info = [
  {
    icon: MapPin,
    title: "Office",
    lines: ADDRESS,
  },
  { icon: Phone, title: "Phone", lines: [PHONE_DISPLAY, PHONE_TEL] },
  { icon: Mail, title: "Email", lines: [EMAIL] },
  { icon: Clock, title: "Hours", lines: ["Mon – Sun: 8:00 AM – 6:00 PM", "Open 7 Days a Week"] },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="px-6 pt-40 pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-2xl">
          <span className="mb-6 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
            Get in Touch
          </span>
          <h1 className="mb-6 font-display text-5xl leading-[0.95] font-bold md:text-7xl">
            Contact <span className="text-clay">Us</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed opacity-70">
            Whether you're buying land, looking for a home, or need a rental — our Tamale team is
            ready to help.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mb-10">
          <a
            href={whatsappUrl("Hello Malanga 1, I'd like to make an enquiry.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 font-bold text-white transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="size-4" /> Chat on WhatsApp instantly
          </a>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            {info.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="glass-panel flex gap-5 rounded-3xl p-6">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-clay text-primary-foreground">
                  <item.icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1 font-bold">{item.title}</h3>
                  {item.lines.map((l) => (
                    <p key={l} className="text-sm opacity-60">
                      {l}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="glass-strong rounded-[2.5rem] p-8 shadow-xl md:p-12">
              {sent ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <CheckCircle2 className="mb-6 size-16 text-clay" />
                  <h2 className="mb-2 font-display text-3xl font-bold">Message Received!</h2>
                  <p className="max-w-sm opacity-60">
                    Thank you for reaching out. Our team will get back to you within one business
                    day.
                  </p>
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
                          email: formData.get("email") || "",
                          message: `[Interest: ${formData.get("interest")}] ${formData.get("message")}`,
                        }),
                      });
                      if (!res.ok) throw new Error("Failed to send message");
                      setSent(true);
                    } catch (err) {
                      console.error("Contact submission error:", err);
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-input bg-card px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+233 ..."
                        className="w-full rounded-2xl border border-input bg-card px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="interest" className="mb-2 block text-sm font-semibold">
                      I'm interested in
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full rounded-2xl border border-input bg-card px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option>Buying a plot of land</option>
                      <option>Buying a house</option>
                      <option>Renting a house</option>
                      <option>Property development</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your budget, preferred location, and timeline..."
                      className="w-full resize-none rounded-2xl border border-input bg-card px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-clay px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-[1.02] md:w-auto"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-16">
          <div className="glass-strong overflow-hidden rounded-[2.5rem] shadow-xl">
            <div className="grid gap-0 lg:grid-cols-3">
              <div className="bg-clay p-8 text-primary-foreground md:p-10 lg:col-span-1">
                <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">Visit Our Office</h2>
                <p className="mb-6 text-sm leading-relaxed opacity-90">
                  Find us at Naa Luro Estates along the Kumbungu Main Road in Tamale. We welcome
                  walk-in enquiries during business hours.
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Naa+Luro+Estates,+Choggu+Yapalsi,+Kumbungu+Main+Road,+Tamale,+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary-foreground px-5 py-2.5 text-sm font-bold text-clay transition-transform hover:scale-[1.02]"
                >
                  <MapPin className="size-4" /> Open in Google Maps
                </a>
              </div>
              <div className="lg:col-span-2">
                <iframe
                  title="Naa Luro Estates, Tamale location map"
                  src="https://www.google.com/maps?q=Naa+Luro+Estates,+Choggu+Yapalsi,+Kumbungu+Main+Road,+Tamale,+Ghana&output=embed"
                  className="h-80 w-full border-0 lg:h-full min-h-[360px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
