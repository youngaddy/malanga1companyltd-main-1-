import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { defaultTestimonials, type Testimonial } from "@/data/site-content";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="mb-4 flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={n <= rating ? "size-4 fill-clay text-clay" : "size-4 text-clay/25"}
        />
      ))}
    </div>
  );
}

export function Testimonials({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const [i, setI] = useState(0);
  const t = testimonials[Math.min(i, testimonials.length - 1)];
  const go = (dir: number) =>
    setI((prev) => (prev + dir + testimonials.length) % testimonials.length);

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full bg-clay/10 px-4 py-1.5 text-xs font-bold tracking-widest text-clay uppercase">
            Client Voices
          </span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Trusted across the <span className="text-clay">Northern Region</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-8 shadow-xl sm:p-12 md:p-16">
            <Quote className="absolute -top-2 -left-2 size-24 text-clay/10 sm:size-32" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <p className="mb-8 font-display text-xl leading-relaxed italic sm:text-2xl md:text-3xl">
                  "{t.quote}"
                </p>
                <Stars rating={t.rating} />
                <div className="flex items-center gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-full bg-clay font-bold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{t.name}</p>
                    <p className="truncate text-xs tracking-widest uppercase opacity-60">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Show testimonial ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={
                      idx === i
                        ? "h-2 w-8 rounded-full bg-clay transition-all"
                        : "h-2 w-2 rounded-full bg-clay/30 transition-all"
                    }
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="grid size-10 place-items-center rounded-full border border-earth/10 transition-colors hover:bg-clay/10"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="grid size-10 place-items-center rounded-full border border-earth/10 transition-colors hover:bg-clay/10"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
