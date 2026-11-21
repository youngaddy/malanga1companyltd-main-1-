import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

function makeInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function mapTestimonial(id: string, t: Record<string, any>): Testimonial {
  return {
    id,
    name: t.name || "",
    role: t.role || "",
    quote: t.quote || "",
    rating: Number(t.rating) || 5,
    initials: makeInitials(t.name || ""),
  };
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const snapshot = await getDocs(
      query(collection(db, "testimonials"), where("approved", "==", true)),
    );
    if (snapshot.empty) return defaultTestimonials;
    return snapshot.docs.map((d) => mapTestimonial(d.id, d.data()));
  } catch (error) {
    console.warn("Could not load testimonials from Firestore, using local data:", error);
    return defaultTestimonials;
  }
}

export async function fetchStats(): Promise<Stat[]> {
  try {
    const snapshot = await getDocs(collection(db, "stats"));
    if (snapshot.empty) return defaultStats;
    return snapshot.docs
      .map((d) => ({
        order: Number(d.data().order ?? 0),
        stat: {
          id: d.id,
          label: d.data().label || "",
          value: Number(d.data().value) || 0,
          suffix: d.data().suffix || "",
        },
      }))
      .sort((a, b) => a.order - b.order)
      .map((entry) => entry.stat);
  } catch (error) {
    console.warn("Could not load stats from Firestore, using local data:", error);
    return defaultStats;
  }
}

export async function submitTestimonial(input: {
  name: string;
  role: string;
  quote: string;
  rating: number;
}): Promise<void> {
  await addDoc(collection(db, "testimonials"), {
    ...input,
    approved: false,
    createdAt: serverTimestamp(),
  });
}
