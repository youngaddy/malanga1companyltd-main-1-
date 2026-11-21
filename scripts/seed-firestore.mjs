/**
 * Seeds the Malanga 1 Firestore database with the site's default content.
 *
 * Uses the Firebase CLI's current OAuth token (admin access), so it works even
 * while security rules are locked down. Run once:
 *
 *   node scripts/seed-firestore.mjs
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PROJECT = "malanga1company";
const DATABASE = "default";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/${DATABASE}/documents`;

function accessToken() {
  const paths = [
    join(homedir(), ".config", "configstore", "firebase-tools.json"),
    join(process.env.APPDATA || "", "configstore", "firebase-tools.json"),
  ];
  for (const path of paths) {
    try {
      const raw = JSON.parse(readFileSync(path, "utf8"));
      if (raw?.tokens?.access_token) return raw.tokens.access_token;
    } catch {
      /* try next */
    }
  }
  throw new Error("No Firebase CLI access token found. Run `firebase login` first.");
}

function toValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(toValue) } };
  if (typeof value === "object") return { mapValue: { fields: toFields(value) } };
  return { nullValue: null };
}

function toFields(object) {
  const fields = {};
  for (const [key, value] of Object.entries(object)) fields[key] = toValue(value);
  return fields;
}

async function create(collection, document) {
  const response = await fetch(`${BASE}/${collection}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: toFields(document) }),
  });
  if (!response.ok) {
    throw new Error(`${collection}: ${response.status} ${await response.text()}`);
  }
  const json = await response.json();
  return json.name.split("/").pop();
}

const properties = [
  {
    title: "The Savanna Villa", description: "Executive 5 Bedroom Villa", price: "GH₵ 1,850,000",
    location: "Airport Ridge", tag: "Featured", tagFeatured: true, type: "house",
    image: "/src/assets/hero-villa.jpg",
    gallery: ["/src/assets/hero-villa.jpg", "/src/assets/gallery-interior.jpg", "/src/assets/gallery-kitchen.jpg"],
    longDescription: "An architectural masterpiece located in the exclusive Airport Ridge neighborhood of Tamale. This executive 5-bedroom villa features luxury finishing, spacious living areas, custom kitchen cabinetry, and private master balcony.",
    features: ["5 Ensuite Bedrooms", "Spacious Living & Dining Area", "Fitted Modern Kitchen", "Landscaped Private Yard", "24/7 Security Gate & Perimeter Fence", "Full Title & Land Registry Documentation"],
    specs: [{ label: "Status", value: "Available" }, { label: "Type", value: "House" }, { label: "Bedrooms", value: "5" }, { label: "Location", value: "Airport Ridge" }],
    order: 1,
  },
  {
    title: "Lamashegu Prime Plot", description: "100 x 100 Residential Land", price: "GH₵ 45,000",
    location: "Tamale South", tag: "For Sale", tagFeatured: false, type: "plot",
    image: "/src/assets/plot-lamashegu.jpg",
    gallery: ["/src/assets/plot-lamashegu.jpg", "/src/assets/gallery-construction.jpg", "/src/assets/gallery-estate.jpg"],
    longDescription: "A prime 100 x 100 ft residential plot situated in a fast-developing residential zone of Lamashegu, Tamale South. Fully demarcated, accessible by main feeder roads, and ready for immediate construction.",
    features: ["100 x 100 ft Size", "Demarcated & Pegged", "Electricity & Water Nearby", "Clear Land Title Search", "Good Road Access"],
    specs: [{ label: "Status", value: "For Sale" }, { label: "Type", value: "Plot" }, { label: "Dimensions", value: "100 x 100 ft" }, { label: "Location", value: "Tamale South" }],
    order: 2,
  },
  {
    title: "The Garden Residency", description: "3 Bedroom Luxury Rental", price: "GH₵ 2,500/mo",
    location: "Vittin Target", tag: "Featured", tagFeatured: true, type: "rental",
    image: "/src/assets/rental-vittin.jpg",
    gallery: ["/src/assets/rental-vittin.jpg", "/src/assets/gallery-kitchen.jpg", "/src/assets/gallery-interior.jpg"],
    longDescription: "Modern 3-bedroom residence for lease in Vittin Target. Designed with open plan living, high security walls, paved compound, and reliable water storage systems.",
    features: ["3 Spacious Bedrooms", "Master Ensuite", "Water Tank & Pump System", "Paved Compound & Parking", "Quiet Residential Neighborhood"],
    specs: [{ label: "Status", value: "Available for Rent" }, { label: "Type", value: "Rental" }, { label: "Bedrooms", value: "3" }, { label: "Location", value: "Vittin Target" }],
    order: 3,
  },
  {
    title: "Kalpohin Hill View", description: "Multi-purpose Commercial Plot", price: "GH₵ 75,000",
    location: "Kalpohin", tag: "For Sale", tagFeatured: false, type: "plot",
    image: "/src/assets/plot-kalpohin.jpg",
    gallery: ["/src/assets/plot-kalpohin.jpg", "/src/assets/gallery-construction.jpg", "/src/assets/gallery-estate.jpg"],
    longDescription: "Strategic plot located in Kalpohin with excellent visibility and access. Ideal for apartment complexes, commercial stores, or executive residential build.",
    features: ["High Growth Area", "Topographical Elevation", "Verified Lands Commission Documentation", "Easy Access to Tamale Central"],
    specs: [{ label: "Status", value: "For Sale" }, { label: "Type", value: "Plot" }, { label: "Location", value: "Kalpohin" }],
    order: 4,
  },
  {
    title: "Sagnarigu Family Home", description: "4 Bedroom Detached House", price: "GH₵ 950,000",
    location: "Sagnarigu", tag: "For Sale", tagFeatured: false, type: "house",
    image: "/src/assets/house-sale.jpg",
    gallery: ["/src/assets/house-sale.jpg", "/src/assets/gallery-interior.jpg", "/src/assets/gallery-kitchen.jpg"],
    longDescription: "Beautifully crafted 4-bedroom detached family bungalow in Sagnarigu. Features spacious compound, security gatehouse, modern interior finishes, and mature trees.",
    features: ["4 Bedrooms (2 Ensuite)", "Large Compound for Expansion", "Modern Kitchen Cabinets", "Solar Backup Ready", "Full Site Plan & Indenture"],
    specs: [{ label: "Status", value: "For Sale" }, { label: "Type", value: "House" }, { label: "Bedrooms", value: "4" }, { label: "Location", value: "Sagnarigu" }],
    order: 5,
  },
  {
    title: "Gurugu Estate Plots", description: "Serviced Plots — Gated Estate", price: "GH₵ 60,000",
    location: "Gurugu", tag: "Land Sale", tagFeatured: false, type: "plot",
    image: "/src/assets/gallery-estate.jpg",
    gallery: ["/src/assets/gallery-estate.jpg", "/src/assets/plot-lamashegu.jpg", "/src/assets/gallery-construction.jpg"],
    longDescription: "Gated community plot scheme in Gurugu with planned utility lines, tree-lined streets, and designated park areas. Secure your parcel in Tamale's next luxury neighborhood.",
    features: ["Master-Planned Layout", "Gated Community Concept", "Utility Lines (Electricity & Water)", "Strict Building Codes for Value Retention"],
    specs: [{ label: "Status", value: "Land Sale" }, { label: "Type", value: "Plot" }, { label: "Location", value: "Gurugu" }],
    order: 6,
  },
];

const stats = [
  { label: "Plots Sold", value: 150, suffix: "+", order: 1 },
  { label: "Homes Delivered", value: 40, suffix: "+", order: 2 },
  { label: "Estate Projects", value: 10, suffix: "+", order: 3 },
  { label: "Verified Titles", value: 100, suffix: "%", order: 4 },
];

const testimonials = [
  { name: "Fuseini Adam", role: "Plot buyer, Sagnarigu", rating: 5, quote: "Malanga 1 sold me a plot in Sagnarigu with full documentation and a genuine indenture. The process was straightforward and I never once worried about a double sale." },
  { name: "Mariama Iddrisu", role: "Homeowner, Vittin", rating: 5, quote: "We moved into our family home in Vittin within weeks. The finish is superb and the team walked us through every step, from viewing to handover." },
  { name: "Kwame Boateng", role: "Investor, Accra", rating: 4, quote: "As an investor based in Accra, I needed a partner I could trust in the North. Malanga 1 handled titling, site inspections and reporting with total transparency." },
  { name: "Yakubu Sulley", role: "Tenant, Kalpohin", rating: 5, quote: "The rental we secured through Malanga 1 was exactly as advertised — clean, modern and priced fairly. Best property experience we've had in Tamale." },
];

async function main() {
  const now = new Date();
  for (const property of properties) {
    const id = await create("properties", { ...property, createdAt: now, updatedAt: now });
    console.log(`property  ${id}  ${property.title}`);
  }
  for (const stat of stats) {
    const id = await create("stats", stat);
    console.log(`stat      ${id}  ${stat.label}`);
  }
  for (const testimonial of testimonials) {
    const id = await create("testimonials", { ...testimonial, approved: true, createdAt: now });
    console.log(`review    ${id}  ${testimonial.name}`);
  }
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
