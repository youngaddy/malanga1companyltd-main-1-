export type PropertyType = "plot" | "house" | "rental";

import heroVilla from "@/assets/hero-villa.jpg";
import plotLamashegu from "@/assets/plot-lamashegu.jpg";
import rentalVittin from "@/assets/rental-vittin.jpg";
import plotKalpohin from "@/assets/plot-kalpohin.jpg";
import houseSale from "@/assets/house-sale.jpg";
import galleryEstate from "@/assets/gallery-estate.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryConstruction from "@/assets/gallery-construction.jpg";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  tag: string;
  tagFeatured?: boolean;
  type: PropertyType;
  image: string;
  gallery: string[];
  longDescription: string;
  features: string[];
  specs: { label: string; value: string }[];
}

const ASSET_MAP: Record<string, string> = {
  "/src/assets/hero-villa.jpg": heroVilla,
  "/src/assets/plot-lamashegu.jpg": plotLamashegu,
  "/src/assets/rental-vittin.jpg": rentalVittin,
  "/src/assets/plot-kalpohin.jpg": plotKalpohin,
  "/src/assets/house-sale.jpg": houseSale,
  "/src/assets/gallery-estate.jpg": galleryEstate,
  "/src/assets/gallery-interior.jpg": galleryInterior,
  "/src/assets/gallery-construction.jpg": galleryConstruction,
  "/src/assets/gallery-kitchen.jpg": galleryKitchen,
  "hero-villa.jpg": heroVilla,
  "plot-lamashegu.jpg": plotLamashegu,
  "rental-vittin.jpg": rentalVittin,
  "plot-kalpohin.jpg": plotKalpohin,
  "house-sale.jpg": houseSale,
  "gallery-estate.jpg": galleryEstate,
  "gallery-interior.jpg": galleryInterior,
  "gallery-construction.jpg": galleryConstruction,
  "gallery-kitchen.jpg": galleryKitchen,
};

export function resolveImageUrl(url: string): string {
  if (!url) return heroVilla;
  if (ASSET_MAP[url]) return ASSET_MAP[url];
  const filename = url.split("/").pop() || "";
  if (ASSET_MAP[filename]) return ASSET_MAP[filename];
  return url;
}

export const defaultProperties: Property[] = [
  {
    id: "1",
    title: "The Savanna Villa",
    description: "Executive 5 Bedroom Villa",
    price: "GHâ‚µ 1,850,000",
    location: "Airport Ridge",
    tag: "Featured",
    tagFeatured: true,
    type: "house",
    image: heroVilla,
    gallery: [heroVilla, galleryInterior, galleryKitchen],
    longDescription:
      "An architectural masterpiece located in the exclusive Airport Ridge neighborhood of Tamale. This executive 5-bedroom villa features luxury finishing, spacious living areas, custom kitchen cabinetry, and private master balcony.",
    features: [
      "5 Ensuite Bedrooms",
      "Spacious Living & Dining Area",
      "Fitted Modern Kitchen",
      "Landscaped Private Yard",
      "24/7 Security Gate & Perimeter Fence",
      "Full Title & Land Registry Documentation",
    ],
    specs: [
      { label: "Status", value: "Available" },
      { label: "Type", value: "House" },
      { label: "Bedrooms", value: "5" },
      { label: "Location", value: "Airport Ridge" },
    ],
  },
  {
    id: "2",
    title: "Lamashegu Prime Plot",
    description: "100 x 100 Residential Land",
    price: "GHâ‚µ 45,000",
    location: "Tamale South",
    tag: "For Sale",
    tagFeatured: false,
    type: "plot",
    image: plotLamashegu,
    gallery: [plotLamashegu, galleryConstruction, galleryEstate],
    longDescription:
      "A prime 100 x 100 ft residential plot situated in a fast-developing residential zone of Lamashegu, Tamale South. Fully demarcated, accessible by main feeder roads, and ready for immediate construction.",
    features: [
      "100 x 100 ft Size",
      "Demarcated & Pegged",
      "Electricity & Water Nearby",
      "Clear Land Title Search",
      "Good Road Access",
    ],
    specs: [
      { label: "Status", value: "For Sale" },
      { label: "Type", value: "Plot" },
      { label: "Dimensions", value: "100 x 100 ft" },
      { label: "Location", value: "Tamale South" },
    ],
  },
  {
    id: "3",
    title: "The Garden Residency",
    description: "3 Bedroom Luxury Rental",
    price: "GHâ‚µ 2,500/mo",
    location: "Vittin Target",
    tag: "Featured",
    tagFeatured: true,
    type: "rental",
    image: rentalVittin,
    gallery: [rentalVittin, galleryKitchen, galleryInterior],
    longDescription:
      "Modern 3-bedroom residence for lease in Vittin Target. Designed with open plan living, high security walls, paved compound, and reliable water storage systems.",
    features: [
      "3 Spacious Bedrooms",
      "Master Ensuite",
      "Water Tank & Pump System",
      "Paved Compound & Parking",
      "Quiet Residential Neighborhood",
    ],
    specs: [
      { label: "Status", value: "Available for Rent" },
      { label: "Type", value: "Rental" },
      { label: "Bedrooms", value: "3" },
      { label: "Location", value: "Vittin Target" },
    ],
  },
  {
    id: "4",
    title: "Kalpohin Hill View",
    description: "Multi-purpose Commercial Plot",
    price: "GHâ‚µ 75,000",
    location: "Kalpohin",
    tag: "For Sale",
    tagFeatured: false,
    type: "plot",
    image: plotKalpohin,
    gallery: [plotKalpohin, galleryConstruction, galleryEstate],
    longDescription:
      "Strategic plot located in Kalpohin with excellent visibility and access. Ideal for apartment complexes, commercial stores, or executive residential build.",
    features: [
      "High Growth Area",
      "Topographical Elevation",
      "Verified Lands Commission Documentation",
      "Easy Access to Tamale Central",
    ],
    specs: [
      { label: "Status", value: "For Sale" },
      { label: "Type", value: "Plot" },
      { label: "Location", value: "Kalpohin" },
    ],
  },
  {
    id: "5",
    title: "Sagnarigu Family Home",
    description: "4 Bedroom Detached House",
    price: "GHâ‚µ 950,000",
    location: "Sagnarigu",
    tag: "For Sale",
    tagFeatured: false,
    type: "house",
    image: houseSale,
    gallery: [houseSale, galleryInterior, galleryKitchen],
    longDescription:
      "Beautifully crafted 4-bedroom detached family bungalow in Sagnarigu. Features spacious compound, security gatehouse, modern interior finishes, and mature trees.",
    features: [
      "4 Bedrooms (2 Ensuite)",
      "Large Compound for Expansion",
      "Modern Kitchen Cabinets",
      "Solar Backup Ready",
      "Full Site Plan & Indenture",
    ],
    specs: [
      { label: "Status", value: "For Sale" },
      { label: "Type", value: "House" },
      { label: "Bedrooms", value: "4" },
      { label: "Location", value: "Sagnarigu" },
    ],
  },
  {
    id: "6",
    title: "Gurugu Estate Plots",
    description: "Serviced Plots â€” Gated Estate",
    price: "GHâ‚µ 60,000",
    location: "Gurugu",
    tag: "Land Sale",
    tagFeatured: false,
    type: "plot",
    image: galleryEstate,
    gallery: [galleryEstate, plotLamashegu, galleryConstruction],
    longDescription:
      "Gated community plot scheme in Gurugu with planned utility lines, tree-lined streets, and designated park areas. Secure your parcel in Tamale's next luxury neighborhood.",
    features: [
      "Master-Planned Layout",
      "Gated Community Concept",
      "Utility Lines (Electricity & Water)",
      "Strict Building Codes for Value Retention",
    ],
    specs: [
      { label: "Status", value: "Land Sale" },
      { label: "Type", value: "Plot" },
      { label: "Location", value: "Gurugu" },
    ],
  },
];

function mapFirestoreProperty(id: string, p: Record<string, any>): Property {
  const primaryImage = resolveImageUrl(p.display_image || p.image || "");
  const gallery: string[] =
    Array.isArray(p.gallery) && p.gallery.length > 0
      ? p.gallery.map((url: string) => resolveImageUrl(url))
      : [primaryImage];

  return {
    id,
    title: p.title || "",
    description: p.description || "",
    price: p.price || "",
    location: p.location || "",
    tag: p.tag || "",
    tagFeatured: Boolean(p.tagFeatured),
    type: (p.type || "plot") as PropertyType,
    image: primaryImage,
    gallery,
    longDescription: p.longDescription || p.description || "",
    features:
      Array.isArray(p.features) && p.features.length > 0
        ? p.features
        : ["Verified documentation", "Premium location", "Full Indenture & Title"],
    specs:
      Array.isArray(p.specs) && p.specs.length > 0
        ? p.specs
        : [
            { label: "Status", value: p.tag || "Available" },
            {
              label: "Type",
              value: (p.type || "").charAt(0).toUpperCase() + (p.type || "").slice(1),
            },
          ],
  };
}

export async function fetchProperties(): Promise<Property[]> {
  try {
    const snapshot = await getDocs(collection(db, "properties"));
    if (snapshot.empty) return defaultProperties;
    return snapshot.docs
      .map((d) => ({ order: Number(d.data().order ?? 0), property: mapFirestoreProperty(d.id, d.data()) }))
      .sort((a, b) => a.order - b.order)
      .map((entry) => entry.property);
  } catch (error) {
    console.warn("Firestore unavailable â€” using bundled property data:", error);
    return defaultProperties;
  }
}

export async function fetchProperty(id: string): Promise<Property | undefined> {
  try {
    const snapshot = await getDoc(doc(db, "properties", id));
    if (snapshot.exists()) {
      return mapFirestoreProperty(snapshot.id, snapshot.data());
    }
  } catch (error) {
    console.warn(`Could not fetch property ${id} from Firestore, checking local data:`, error);
  }
  return defaultProperties.find((p) => p.id === id);
}

export const properties: Property[] = defaultProperties;

export function getProperty(id: string) {
  return properties.find((p) => p.id === id);
}
