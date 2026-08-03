export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Fuseini Adam",
    role: "Plot buyer, Sagnarigu",
    quote:
      "Malanga 1 sold me a plot in Sagnarigu with full documentation and a genuine indenture. The process was straightforward and I never once worried about a double sale.",
    rating: 5,
    initials: "FA",
  },
  {
    id: "2",
    name: "Mariama Iddrisu",
    role: "Homeowner, Vittin",
    quote:
      "We moved into our family home in Vittin within weeks. The finish is superb and the team walked us through every step, from viewing to handover.",
    rating: 5,
    initials: "MI",
  },
  {
    id: "3",
    name: "Kwame Boateng",
    role: "Investor, Accra",
    quote:
      "As an investor based in Accra, I needed a partner I could trust in the North. Malanga 1 handled titling, site inspections and reporting with total transparency.",
    rating: 4,
    initials: "KB",
  },
  {
    id: "4",
    name: "Yakubu Sulley",
    role: "Tenant, Kalpohin",
    quote:
      "The rental we secured through Malanga 1 was exactly as advertised — clean, modern and priced fairly. Best property experience we've had in Tamale.",
    rating: 5,
    initials: "YS",
  },
];

export const defaultStats: Stat[] = [
  { id: "1", label: "Plots Sold", value: 150, suffix: "+" },
  { id: "2", label: "Homes Delivered", value: 40, suffix: "+" },
  { id: "3", label: "Estate Projects", value: 10, suffix: "+" },
  { id: "4", label: "Verified Titles", value: 100, suffix: "%" },
];

interface TestimonialApiResponse {
  id: number;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
}

interface StatApiResponse {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

const BASE_API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function makeInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function mapTestimonial(t: TestimonialApiResponse): Testimonial {
  return {
    id: String(t.id),
    name: t.name,
    role: t.role || "",
    quote: t.quote,
    rating: Number(t.rating) || 5,
    initials: makeInitials(t.name),
  };
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${BASE_API}/testimonials/`);
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map(mapTestimonial);
    }
    return defaultTestimonials;
  } catch (error) {
    console.warn("Could not connect to backend API, using local testimonials:", error);
    return defaultTestimonials;
  }
}

export async function fetchStats(): Promise<Stat[]> {
  try {
    const res = await fetch(`${BASE_API}/stats/`);
    if (!res.ok) throw new Error("Failed to fetch stats");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map((s: StatApiResponse) => ({
        id: String(s.id),
        label: s.label,
        value: Number(s.value),
        suffix: s.suffix || "",
      }));
    }
    return defaultStats;
  } catch (error) {
    console.warn("Could not connect to backend API, using local stats:", error);
    return defaultStats;
  }
}

export async function submitTestimonial(input: {
  name: string;
  role: string;
  quote: string;
  rating: number;
}): Promise<void> {
  const res = await fetch(`${BASE_API}/testimonials/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to submit testimonial");
}
