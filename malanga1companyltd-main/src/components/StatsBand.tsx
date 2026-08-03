import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { defaultStats, type Stat } from "@/data/site-content";

export function StatsBand({ stats = defaultStats }: { stats?: Stat[] }) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="glass-strong rounded-[2rem] p-8 shadow-xl sm:p-10 md:rounded-[2.5rem] md:p-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08} className="text-center">
                <p className="mb-2 font-display text-4xl font-bold text-clay sm:text-5xl md:text-6xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase opacity-60 sm:text-sm">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
