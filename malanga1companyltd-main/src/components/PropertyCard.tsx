import type { Property } from "@/data/properties";
import { Reveal } from "@/components/Reveal";

export function PropertyCard({ property, delay = 0 }: { property: Property; delay?: number }) {
  return (
    <Reveal delay={delay} className="group cursor-pointer">
      <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted">
        <img
          src={property.image}
          alt={`${property.title} — ${property.description}, ${property.location}, Tamale`}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={
            property.tagFeatured
              ? "absolute top-4 right-4 rounded-full bg-clay/90 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur"
              : "glass-strong absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold"
          }
        >
          {property.tag}
        </div>
      </div>
      <h3 className="mb-1 font-display text-2xl font-bold">{property.title}</h3>
      <p className="mb-4 text-sm opacity-50">{property.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-clay">{property.price}</span>
        <span className="text-xs font-semibold tracking-tighter uppercase opacity-40">
          {property.location}
        </span>
      </div>
    </Reveal>
  );
}
