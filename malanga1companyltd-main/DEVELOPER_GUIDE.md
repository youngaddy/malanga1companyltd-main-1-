# Malanga 1 Company Limited — Developer Guide

Technical documentation for developers working on the full-stack real estate platform.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Frontend Architecture](#frontend-architecture)
   - [Routing & Pages](#routing--pages)
   - [Components](#components)
   - [Data Flow](#data-flow)
   - [API Integration](#api-integration)
   - [Design System](#design-system)
5. [Backend Architecture](#backend-architecture)
   - [Django Models](#django-models)
   - [API Endpoints](#api-endpoints)
   - [Admin Configuration](#admin-configuration)
6. [Setup & Installation](#setup--installation)
7. [Development Workflow](#development-workflow)
8. [Build & Deployment](#build--deployment)
9. [Configuration Reference](#configuration-reference)
10. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────────────────────────┐
│   TanStack Start (React SSR)    │  ← Vite dev server / Cloudflare Workers
│   Port 5173                     │
└──────────────┬──────────────────┘
               │  HTTP / REST
               ▼
┌─────────────────────────────────┐
│   Django REST Framework         │  ← Python backend
│   Port 8000                     │
│   SQLite (dev) / PostgreSQL     │
└─────────────────────────────────┘
```

**Key principle:** The frontend works independently. If the backend is unavailable, all data-fetching functions gracefully fall back to hardcoded sample data. This makes the site fully functional without the API running.

---

## Tech Stack

### Frontend

| Technology | Purpose | Version |
|---|---|---|
| **React** | UI framework | 19.x |
| **TanStack Start** | Full-stack React SSR framework | 1.168 |
| **TanStack Router** | File-based routing with SSR | 1.170 |
| **Vite** | Build tool & dev server | 8.x |
| **TypeScript** | Type safety | 5.x |
| **Tailwind CSS** | Utility-first styling | 4.x |
| **motion** | Animations (scroll reveals, carousel) | latest |
| **shadcn/ui** | Pre-built UI primitives (46 components) | latest |
| **lucide-react** | Icon library | latest |
| **@tanstack/react-query** | Data fetching (installed but not heavily used) | latest |

### Backend

| Technology | Purpose | Version |
|---|---|---|
| **Django** | Web framework | 6.0.7 |
| **Django REST Framework** | API toolkit | 3.17.1 |
| **django-cors-headers** | CORS management | 4.9.0 |
| **Pillow** | Image processing | 12.3.0 |
| **SQLite** | Development database | (built-in) |

---

## Project Structure

```
malanga1companyltd-main/
├── src/                           # Frontend source
│   ├── routes/                    # File-based route pages
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # 46 shadcn/ui primitives
│   │   ├── Navbar.tsx             # Main navigation
│   │   ├── Footer.tsx             # Site footer
│   │   ├── PropertyCard.tsx       # Property listing card
│   │   ├── Lightbox.tsx           # Image lightbox viewer
│   │   ├── Reveal.tsx             # Scroll-triggered animations
│   │   ├── ThemeToggle.tsx        # Dark/light mode toggle
│   │   ├── StatsBand.tsx          # Animated statistics
│   │   ├── Testimonials.tsx       # Client testimonials carousel
│   │   ├── CountUp.tsx            # Number count-up animation
│   │   ├── WhatsAppFab.tsx        # Floating WhatsApp button
│   │   └── MobileStickyBar.tsx    # Mobile bottom action bar
│   ├── data/                      # Data layer
│   │   └── properties.ts          # Property types, API client, fallback data
│   ├── lib/                       # Utilities & constants
│   │   ├── contact.ts             # Contact details & social links
│   │   ├── seo.ts                 # SEO helpers & JSON-LD generators
│   │   ├── utils.ts               # cn() classname utility
│   │   ├── error-capture.ts       # SSR error capture
│   │   └── error-page.ts          # Fallback error HTML
│   ├── hooks/
│   │   └── use-mobile.tsx         # Mobile breakpoint hook
│   ├── assets/                    # Static images
│   ├── styles.css                 # Global styles, design tokens, utilities
│   ├── router.tsx                 # Router creation (QueryClient + Router)
│   ├── routeTree.gen.ts           # Auto-generated route tree (DO NOT EDIT)
│   ├── server.ts                  # SSR server entry point
│   ├── start.ts                   # TanStack Start instance
│   └── config.ts (implied)        # App configuration
├── backend/                       # Django REST backend
│   ├── api/                       # Django app
│   │   ├── models.py              # Property, PropertyImage, ContactMessage
│   │   ├── views.py               # PropertyViewSet, gallery_list, ContactMessageViewSet
│   │   ├── serializers.py         # Model serializers
│   │   ├── urls.py                # API route definitions
│   │   ├── admin.py               # Admin interface config
│   │   └── migrations/            # Database migrations
│   ├── core/                      # Django project settings
│   │   ├── settings.py            # Project settings
│   │   ├── urls.py                # Root URL config
│   │   └── wsgi.py / asgi.py      # Server entry points
│   ├── manage.py                  # Django management script
│   ├── seed.py                    # Database seeder (6 sample properties)
│   ├── media/                     # Uploaded images
│   └── venv/                      # Python virtual environment
├── vite.config.ts                 # Vite + TanStack Start configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # NPM dependencies & scripts
├── components.json                # shadcn/ui configuration
└── bunfig.toml                    # Bun package manager config
```

---

## Frontend Architecture

### Routing & Pages

TanStack Router uses **file-based routing** in `src/routes/`:

| File | URL | Component | Key Features |
|---|---|---|---|
| `__root.tsx` | (layout shell) | `RootComponent` | Navbar, Outlet, Footer, WhatsApp, MobileStickyBar |
| `index.tsx` | `/` | `Index` | Hero video, StatsBand, featured properties, services, testimonials |
| `properties.index.tsx` | `/properties` | `PropertiesPage` | Filter tabs (plot/house/rental), grid/map toggle, search bar |
| `properties.$id.tsx` | `/properties/$id` | `PropertyDetail` | Gallery, specs, features, enquiry form, related properties |
| `services.tsx` | `/services` | `ServicesPage` | 3 category cards with sub-items, process steps |
| `gallery.tsx` | `/gallery` | `GalleryPage` | Masonry grid with lightbox |
| `about.tsx` | `/about` | `AboutPage` | Company story, founder, stats, values |
| `contact.tsx` | `/contact` | `ContactPage` | Contact form, details card, Google Maps embed |
| `sitemap[.]xml.ts` | `/sitemap.xml` | — | Server-generated XML sitemap |

**Route conventions** (from `src/routes/README.md`):
- `index.tsx` → `/`
- `about.tsx` → `/about`
- `properties/index.tsx` → `/properties`
- `properties/$id.tsx` → `/properties/:id`
- `sitemap[.]xml.ts` → `/sitemap.xml` (escaping dots)
- `__root.tsx` — Root shell, must contain `<Outlet />`
- **Do NOT** use Next.js conventions (`app/`, `pages/`)

### Components

#### Layout Components
| Component | File | Purpose |
|---|---|---|
| `Navbar` | `components/Navbar.tsx` | Fixed glassmorphic nav with mobile hamburger, ThemeToggle |
| `Footer` | `components/Footer.tsx` | Logo, navigation, address, social links |
| `WhatsAppFab` | `components/WhatsAppFab.tsx` | Fixed floating WhatsApp button |
| `MobileStickyBar` | `components/MobileStickyBar.tsx` | Bottom bar (Call + WhatsApp) on mobile |
| `ThemeToggle` | `components/ThemeToggle.tsx` | Dark/light mode toggle |

#### Feature Components
| Component | File | Purpose |
|---|---|---|
| `PropertyCard` | `components/PropertyCard.tsx` | Property card with image, overlay, price |
| `Lightbox` | `components/Lightbox.tsx` | Full-screen image viewer with keyboard nav |
| `Reveal` | `components/Reveal.tsx` | Wrapper for scroll-triggered fade-in animation |
| `StatsBand` | `components/StatsBand.tsx` | Animated statistics band (data from backend API) |
| `Testimonials` | `components/Testimonials.tsx` | Client testimonial carousel with star ratings (data from backend API) |
| `ReviewForm` | `components/ReviewForm.tsx` | Home page "Share Your Experience" review submission form |
| `CountUp` | `components/CountUp.tsx` | RAF-based animated number counter |

### Data Flow

```
User visits page
       │
       ▼
Route loader fires (TanStack Router)
       │
       ├── fetchProperties() / fetchProperty(id)
       │       │
       │       ├── fetch(`${VITE_API_URL}/properties/`)
       │       │       │
       │       │       ├── Success → parse Django response → return properties
       │       │       └── Fail → fallback to hardcoded defaultProperties
       │       │
       │       └── Returns typed `Property[]`
       │
       ▼
Component renders with loader data (useLoaderData)
       │
       ├── useState for UI state (filters, lightbox, active tab)
       └── Reveal animations trigger on scroll
```

**Key pattern: Try API → Fall back to local data.** All fetch functions (`fetchProperties`, `fetchProperty`, gallery fetch) follow this pattern, making the frontend resilient to backend outages.

### API Integration

All API calls use `import.meta.env.VITE_API_URL` (default: `http://127.0.0.1:8000/api`):

| Endpoint | Method | Called From | Notes |
|---|---|---|---|
| `{VITE_API_URL}/properties/` | GET | `data/properties.ts` | Returns all properties |
| `{VITE_API_URL}/properties/{id}/` | GET | `data/properties.ts` | Returns single property |
| `{VITE_API_URL}/contact/` | POST | `contact.tsx`, `properties.$id.tsx` | Submits contact/enquiry form |
| `{VITE_API_URL}/gallery/` | GET | `gallery.tsx` | Returns gallery images |
| `{VITE_API_URL}/testimonials/` | GET | `data/site-content.ts` | Returns approved reviews |
| `{VITE_API_URL}/testimonials/` | POST | `components/ReviewForm.tsx` | Submits a new review (held for approval) |
| `{VITE_API_URL}/stats/` | GET | `data/site-content.ts` | Returns home page counters |

**Data transformation:** `mapDjangoProperty()` in `data/properties.ts` converts Django API response shape to the frontend `Property` interface.

### Design System

Defined in `src/styles.css` using CSS custom properties:

```css
:root {
  --clay: oklch(0.58 0.15 30);       /* Primary accent (warm red) */
  --earth: oklch(0.18 0.04 265);      /* Dark backgrounds (navy) */
  --sand: oklch(0.98 0.03 165);       /* Light backgrounds (mint) */
  --background: oklch(0.99 0.01 150); /* Page background */
}
```

**Design tokens available:**
- `glass-panel` — Frosted glass effect with blur
- `glass-strong` — Stronger frosted glass
- `animate-fade-up` — Fade-in with upward translation
- `animate-float-slow` — Slow floating (6s cycle)
- `animate-glow-pulse` — Pulsing glow (5s cycle)

**Fonts:** Playfair Display (headings) + Outfit (body) — loaded from Google Fonts.

**Dark mode:** Toggled by `.dark` class on `<html>`, persisted in `localStorage("m1-theme")`.

---

## Backend Architecture

### Django Models

**Property**
```python
class Property(models.Model):
    title         = CharField(max_length=255)
    description   = TextField()              # Short tagline
    long_desc     = TextField(blank=True)    # Detailed description
    price         = CharField(max_length=100)
    location      = CharField(max_length=255)
    image         = CharField(max_length=500, blank=True, null=True)  # URL
    image_file    = ImageField(upload_to='properties/', blank=True, null=True)
    type          = CharField(choices=['plot', 'rental', 'house'])
    tag           = CharField(max_length=100, blank=True, null=True)
    tagFeatured   = BooleanField(default=False)
    created_at    = DateTimeField(auto_now_add=True)
```

**PropertyImage** (gallery images)
```python
class PropertyImage(models.Model):
    property = ForeignKey(Property, related_name='gallery_images', on_delete=CASCADE)
    image    = ImageField(upload_to='properties/gallery/')
    caption  = CharField(max_length=255, blank=True, null=True)
```

**ContactMessage**
```python
class ContactMessage(models.Model):
    name        = CharField(max_length=255)
    phone       = CharField(max_length=50)
    email       = EmailField(blank=True, null=True)
    message     = TextField()
    property_id = CharField(max_length=255, blank=True, null=True)
    created_at  = DateTimeField(auto_now_add=True)
```

**Testimonial** (client reviews)
```python
class Testimonial(models.Model):
    name        = CharField(max_length=255)
    role        = CharField(max_length=255, blank=True, null=True)  # e.g. "Plot buyer, Sagnarigu"
    quote       = TextField()
    rating      = PositiveSmallIntegerField(default=5)              # 1–5
    is_approved = BooleanField(default=False)                       # Hidden until approved
    created_at  = DateTimeField(auto_now_add=True)
```

**Stat** (home page counters)
```python
class Stat(models.Model):
    label  = CharField(max_length=100)   # e.g. "Plots Sold"
    value  = PositiveIntegerField()      # e.g. 150
    suffix = CharField(max_length=10, default='+', blank=True)  # e.g. "+" or "%"
    order  = PositiveIntegerField(default=0)  # Display position

    class Meta:
        ordering = ['order']
```

### API Endpoints

| Endpoint | Method | View | Purpose |
|---|---|---|---|
| `/api/properties/` | GET, POST | PropertyViewSet | List / create properties |
| `/api/properties/{id}/` | GET, PUT, PATCH, DELETE | PropertyViewSet | Retrieve / update / delete |
| `/api/contact/` | POST | ContactMessageViewSet | Submit contact message |
| `/api/gallery/` | GET | gallery_list | List all gallery images |
| `/api/testimonials/` | GET | TestimonialViewSet | List **approved** reviews |
| `/api/testimonials/` | POST | TestimonialViewSet | Submit a review (saved unapproved) |
| `/api/stats/` | GET | StatViewSet | List counters in `order` sequence |

> **Approval flow:** `TestimonialViewSet.create` saves with `is_approved=False` and `ListModelMixin.get_queryset()` filters to approved only. Admins approve via Django admin. If the reviewer wants submissions to appear immediately, change `create` to `serializer.save(is_approved=True)`.

**Gallery response format:**
```json
[
  {
    "src": "http://127.0.0.1:8000/media/properties/gallery/photo.jpg",
    "caption": "The Savanna Villa interior",
    "tall": false
  }
]
```

### Admin Configuration

The Django admin (`/admin/`) provides:

- **Property Admin** — List view with filters (type, tag, date), search (title, location), inline gallery images, fieldsets for grouped fields
- **PropertyImage Admin** — Standalone list with thumbnail preview, search by property
- **ContactMessage Admin** — List with filters (date), search (name, phone, email), read-only timestamps
- **Testimonial Admin** — List with filters (approved, rating), inline-editable approval & rating, search
- **Stat Admin** — List with inline-editable value / suffix / order for quick counter updates

---

## Setup & Installation

### Prerequisites

- **Node.js** 18+ or **Bun** 1.x
- **Python** 3.12+
- **Git**

### Frontend Setup

```bash
# Clone the repository
git clone <repository-url>
cd malanga1companyltd-main

# Install dependencies
npm install
# or: bun install

# Create a .env file (optional — defaults work for local dev)
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env

# Start the dev server
npm run dev
# or: bun run dev
```

### Backend Setup

```bash
cd backend

# Activate the virtual environment
# Windows:
.\venv\Scripts\activate
# Mac / Linux:
source venv/bin/activate

# If the venv doesn't exist, create it:
# python -m venv venv
# pip install django djangorestframework django-cors-headers pillow

# Run migrations
python manage.py migrate

# Create a superuser (admin panel login)
python manage.py createsuperuser

# Seed sample data (optional)
python seed.py

# Start the backend
python manage.py runserver
```

---

## Development Workflow

### Running both servers

Open **two terminals**:

**Terminal 1 (Frontend)**
```bash
npm run dev    # http://localhost:5173
```

**Terminal 2 (Backend)**
```bash
cd backend && .\venv\Scripts\activate && python manage.py runserver
# http://127.0.0.1:8000
```

### Code quality

```bash
npm run lint     # ESLint check
npm run format   # Prettier format
npm run build    # Production build (validate no errors)
```

### Common development scenarios

**Adding a new page:**
1. Create route file in `src/routes/`
2. Add `head()` for SEO metadata
3. Add navigation link in `Navbar.tsx` and `Footer.tsx`

**Adding a new API endpoint:**
1. Add the model in `backend/api/models.py`
2. Add serializer in `backend/api/serializers.py`
3. Add view in `backend/api/views.py` or `viewsets.py`
4. Register route in `backend/api/urls.py`
5. Run `python manage.py makemigrations && python manage.py migrate`
6. Add the frontend fetch call in the appropriate route file

**Modifying the design system:**
- Edit CSS variables in `src/styles.css` (`:root` and `.dark`)
- The site uses Tailwind v4 — configure via CSS, not `tailwind.config.js`

### Git conventions

> **IMPORTANT:** This project is connected to Lovable.dev. Do **NOT** rewrite published git history (no force push, rebase, amend, squash). Keep the connected branch in a working state at all times.

---

## Build & Deployment

### Production build

```bash
npm run build
# Output: .output/ (Vite + TanStack Start)
```

The build produces:
- `.output/public/` — Client-side static assets
- `.output/server/` — SSR server bundle (Cloudflare Workers compatible)

### Deploying to Cloudflare Workers

This project is configured for Cloudflare Workers deployment via Wrangler:

```bash
npx wrangler deploy
```

The deployment config is at `.wrangler/deploy/config.json` and points to `.output/server/wrangler.json`.

### Environment variables in production

Set these in your hosting environment (Cloudflare Workers dashboard):

| Variable | Example Value | Purpose |
|---|---|---|
| `VITE_API_URL` | `https://api.malanga1companyltd.com/api` | Backend API URL |

### Alternative deployment: Static hosting

If deploying to a static host (Netlify, Vercel, etc.), you can use:

```bash
npm run build
# Serve .output/public/ as static files
# .output/server/ needs a Node.js server adapter
```

---

## Configuration Reference

### vite.config.ts

```ts
{
  plugins: [
    tanstackStart(),  // TanStack Start SSR plugin
    react(),          // React JSX transform + Fast Refresh
    tailwindcss(),    // Tailwind CSS v4
  ],
  resolve: {
    alias: { "@": "/src" },
    tsconfigPaths: true,
  },
  server: { port: 5173, strictPort: false },
}
```

### Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_URL` | No | `http://127.0.0.1:8000/api` | Django API base URL |

### Package scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite dev` | Start development server |
| `build` | `vite build` | Production build |
| `build:dev` | `vite build --mode development` | Dev-mode build |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Lint all files |
| `format` | `prettier --write .` | Format all files |

---

## Troubleshooting

### "ReferenceError: TSRSplitComponent is not defined"

**Cause:** `autoCodeSplitting: true` was set in `vite.config.ts`, which conflicts with TanStack Start SSR.

**Fix:** Remove `autoCodeSplitting: true` — it is not needed and is incompatible with TanStack Start's server-side rendering. The `tanstackStart()` plugin handles code splitting internally.

### "Duplicate declaration 'hot'"

**Cause:** Using both `TanStackRouterVite()` and `tanstackStart()` in vite.config.ts. Both register plugins that inject `const hot = import.meta.hot` at the module level.

**Fix:** Remove the standalone `TanStackRouterVite()` call. The `tanstackStart()` plugin already registers all necessary router plugins.

### "EPERM: operation not permitted" on routeTree.gen.ts

**Cause:** Windows file-locking race condition in the TanStack Router file watcher.

**Fix:** Kill any lingering Node.js processes, delete `.tanstack/tmp/` and `src/routeTree.gen.ts`, then restart the dev server.

```bash
# Kill node processes
taskkill /F /IM node.exe
# Clean
rm -rf .tanstack/tmp src/routeTree.gen.ts
# Restart
npm run dev
```

### "Module not found: @/components/..."

**Cause:** Path alias not resolved.

**Fix:** Ensure Vite config has `resolve.alias["@"]` set to `/src` and `resolve.tsconfigPaths: true`. Ensure `tsconfig.json` has the `@/*` path mapping.

### Backend CORS errors

**Fix:** The backend has `CORS_ALLOW_ALL_ORIGINS = True` in `settings.py`. If you need stricter control, set `CORS_ALLOWED_ORIGINS` to the frontend URL.

### Frontend shows "0+" stats

**Cause:** The API is not running. The stats counters are placeholders. The backend `seed.py` creates sample data if needed.

**Fix:** Ensure the Django server is running and `VITE_API_URL` points to the correct URL.

### Images not loading

- **Local dev:** Ensure `python manage.py runserver` is running (it serves media files in DEBUG mode)
- **Production:** Ensure your hosting serves the `media/` directory, or use a CDN / cloud storage

---

## Key Files Cheat Sheet

| File | What to do |
|---|---|
| `vite.config.ts` | Add/remove Vite plugins, change dev server port |
| `src/styles.css` | Change colors, fonts, design tokens |
| `src/data/properties.ts` | Update fallback data, API fetching logic |
| `src/data/site-content.ts` | Testimonials & stats data layer (fetch + fallback + submit) |
| `src/lib/contact.ts` | Update phone, email, address, social links |
| `src/lib/seo.ts` | Update default OG image, SEO utilities |
| `src/components/Navbar.tsx` | Add/remove navigation links |
| `src/components/Footer.tsx` | Update footer content |
| `src/components/ReviewForm.tsx` | Home page review submission form |
| `backend/api/models.py` | Add/modify database models |
| `backend/api/views.py` | Add/modify API endpoints |
| `backend/api/serializers.py` | Add/modify data serializers |
| `backend/api/urls.py` | Register API routes |
| `backend/api/admin.py` | Configure Django admin interface |
| `backend/seed.py` | Update sample data seeder |
| `backend/core/settings.py` | Change database, CORS, security settings |
