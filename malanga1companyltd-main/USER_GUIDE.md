# Malanga 1 Company Limited — User Guide

A complete guide for site administrators and content managers.

---

## Table of Contents

1. [Site Overview](#site-overview)
2. [Running the Site Locally](#running-the-site-locally)
3. [Running the Backend (Django Admin)](#running-the-backend-django-admin)
4. [Managing Property Listings](#managing-property-listings)
5. [Managing Gallery Images](#managing-gallery-images)
6. [Managing Stats Counters](#managing-stats-counters)
7. [Managing Client Reviews](#managing-client-reviews)
8. [Viewing Contact Messages](#viewing-contact-messages)
9. [Updating Site Content](#updating-site-content)
10. [SEO & Sitemap](#seo--sitemap)
11. [Common Tasks](#common-tasks)

---

## Site Overview

The Malanga 1 Company Limited website is a full-stack real estate platform built for the Northern Region of Ghana. It features:

- **Home page** — Hero section, animated stats, featured properties, services overview, testimonials, client review form
- **Properties page** — Filterable listing of all properties (plots, houses, rentals) with grid/map views
- **Property Detail page** — Gallery, specifications, features, enquiry form, related properties
- **Services page** — Construction & Development, Real Estate Services, Materials Supply
- **Gallery page** — Masonry image grid with lightbox viewer
- **About page** — Company story, founder profile, values
- **Contact page** — Contact form, phone, email, WhatsApp, Google Maps embed
- **Sitemap** — Auto-generated XML sitemap (`/sitemap.xml`)

> **Stats counters and client reviews are managed entirely from the Django admin panel** — no code changes needed. See [Managing Stats Counters](#managing-stats-counters) and [Managing Client Reviews](#managing-client-reviews).

---

## Running the Site Locally

### Prerequisites

- **Node.js** v18+ (or **Bun** — recommended)
- **Python** 3.12+ (for the Django backend)

### Frontend (Vite dev server)

```bash
cd malanga1companyltd-main
npm install       # or: bun install
npm run dev       # or: bun run dev
```

The site will be available at **http://localhost:5173**.

### Backend (Django API server)

Open a **second terminal**:

```bash
cd backend
venv\Scripts\activate    # On Windows: .\venv\Scripts\activate
python manage.py runserver
```

The API will be available at **http://127.0.0.1:8000/api/**.

> **Note:** The frontend will work even without the backend running — it falls back to built-in sample data.

---

## Running the Backend (Django Admin)

### 1. Activate the virtual environment

**Windows:**
```bash
cd backend
.\venv\Scripts\activate
```

**Mac / Linux:**
```bash
cd backend
source venv/bin/activate
```

### 2. Start the server

```bash
python manage.py runserver
```

### 3. Access the Django Admin panel

Open **http://127.0.0.1:8000/admin/** in your browser.

**Login credentials** — create a superuser first:

```bash
python manage.py createsuperuser
# Follow the prompts to set username, email, and password
```

### 4. Add sample data (optional)

```bash
python seed.py
```

This creates 6 sample properties: 3 land plots, 1 rental, and 2 houses.

---

## Managing Property Listings

### Adding a new property

1. Go to **Django Admin** → **Properties** → **Add Property**
2. Fill in these fields:

| Field | Description | Required |
|---|---|---|
| **Title** | e.g. "The Savanna Villa" | Yes |
| **Description** | Short tagline, e.g. "Executive 5 Bedroom Villa" | Yes |
| **Long Description** | Detailed property description (shown on detail page) | Managed via Django Admin notes |
| **Price** | e.g. "GH₵ 1,850,000" or "GH₵ 2,500/mo" | Yes |
| **Location** | Area within Tamale, e.g. "Airport Ridge" | Yes |
| **Type** | `plot`, `house`, or `rental` | Yes |
| **Tag** | Badge text, e.g. "Featured" or "For Sale" | No |
| **Tag Featured** | Check to show a "Featured" badge overlay | No |
| **Image** | URL of the main property image | No |
| **Image File** | Upload a main property image | No |

### Editing a property

- Go to **Django Admin** → **Properties** → Click a property title
- Modify any fields and click **Save**

### Deleting a property

- Go to **Django Admin** → **Properties**
- Select the property → Choose **Delete selected properties** from the dropdown → **Go**

### Property images

Each property can have multiple gallery images:

1. Open the property in Django Admin
2. Scroll to **Gallery images** section
3. Click **Add another Gallery image**
4. Upload the image file and add an optional caption
5. Click **Save**

---

## Managing Gallery Images

The **Gallery** page shows a masonry grid of all property images.

### Adding images to the gallery

1. Go to **Django Admin** → **Property images** → **Add Property image**
2. Select the property from the dropdown
3. Upload the image file
4. Add a caption (optional)
5. Click **Save**

The image will automatically appear on the Gallery page.

---

## Managing Stats Counters

The animated counters on the home page (e.g. "150+ Plots Sold") are stored in the backend, so you can update them **without touching any code**.

### Editing a counter

1. Go to **Django Admin** → **Stats**
2. You'll see a table with: Label, Value, Suffix, Order
3. **Value** — the number shown (e.g. `150`)
4. **Suffix** — the symbol after the number (e.g. `+`, `%`). Leave blank for no symbol
5. **Order** — the position in the row (0 = first, 1 = second, ...)
6. Click **Save**

### Adding a new counter

1. Go to **Django Admin** → **Stats** → **Add Stat**
2. Enter a **Label** (e.g. "Communities"), a **Value** (e.g. `5`), a **Suffix** (e.g. `+`), and an **Order**
3. Click **Save** — it appears on the home page immediately

### Removing a counter

- Select the stat → **Delete selected stats** → **Go**

> The four default counters are: Plots Sold (150+), Homes Delivered (40+), Estate Projects (10+), Verified Titles (100%).

---

## Managing Client Reviews

Visitors can leave a review from the home page's **"Share Your Experience"** form. Submissions are **held for approval** and only appear on the site after you approve them.

### Approving a new review

1. Go to **Django Admin** → **Testimonials**
2. New submissions appear at the top with a blank **Approved** checkbox
3. Tick the **Approved** box (or edit the **Rating**) and click **Save**
4. The review now appears in the testimonials carousel on the home page

### Removing a review

- Go to **Django Admin** → **Testimonials** → select the review → **Delete selected testimonials** → **Go**

### Review fields

| Field | Description |
|---|---|
| **Name** | Client's name (displayed) |
| **Role** | How they worked with you (e.g. "Plot buyer, Sagnarigu") |
| **Quote** | The review text |
| **Rating** | 1–5 stars shown on the home page |
| **Approved** | Off = hidden, On = shown on the site |


---

## Viewing Contact Messages

When visitors submit the contact or enquiry forms, messages are stored in the backend.

1. Go to **Django Admin** → **Contact messages**
2. You'll see a table with: Name, Phone, Email, Property ID, Date
3. Click a message to view the full details

You can also **export** messages or **filter** by date / property.

---

## Updating Site Content

### Phone number, email, and social links

Edit `src/lib/contact.ts`:

| Constant | Default | What it controls |
|---|---|---|
| `PHONE_DISPLAY` | `053 400 7070` | Phone shown on site |
| `PHONE_TEL` | `+233534007070` | Click-to-call number |
| `EMAIL` | `Mallanga1ltd@gmail.com` | Email link & form submissions |
| `ADDRESS` | Naa Luro Estates... | Address in footer |
| `SOCIAL.facebook` | `malanga1companyltd` | Facebook link |
| `SOCIAL.instagram` | `malanga1companyltd` | Instagram link |
| `SOCIAL.tiktok` | `malanga1companyltd` | TikTok link |

### Home page hero video

Edit `src/routes/index.tsx` — search for `source src="https://videos.pexels.com/..."` and replace the URL.

### Stats (plots sold, homes delivered, etc.)

Managed in the backend — see [Managing Stats Counters](#managing-stats-counters).

### Testimonials

Managed in the backend — see [Managing Client Reviews](#managing-client-reviews).

### Services

Edit `src/routes/services.tsx` — the `categories` array. Each entry has: `title`, `items` (array of service names).

### Company info on About page

Edit `src/routes/about.tsx` — update the story text, founder details, and values.

### Logo

Replace the image files in `src/assets/`:
- `logo_new.png` — Main logo (navbar, footer)
- `logo_malanga.png` — Favicon

---

## SEO & Sitemap

### Page titles and descriptions

Each route file has a `head()` function with `meta` tags. Edit these to update:

- Browser tab title
- Search engine description
- Open Graph / Twitter card metadata

### Sitemap

The sitemap is dynamically generated at `/sitemap.xml`. It automatically includes all site pages.

To update sitemap priorities or change frequency, edit `src/routes/sitemap[.]xml.ts`.

### Robots

Edit `public/robots.txt` to control search engine crawling.

---

## Common Tasks

### "How do I add a new page?"

1. Create a new file in `src/routes/` (e.g. `careers.tsx`)
2. Use an existing route file as a template
3. Add the page title and description in the `head()` function
4. Add a link in the navbar (`src/components/Navbar.tsx`)
5. Add a link in the footer (`src/components/Footer.tsx`)
6. Restart the dev server — the route is automatically discovered

### "How do I change the site colors?"

Edit `src/styles.css` — look for `:root` and `.dark` CSS custom properties:

- `--clay` — Primary accent (buttons, highlights) — currently a warm red
- `--earth` — Dark background (footer) — currently navy
- `--sand` — Light background — currently warm beige

### "How do I deploy the site?"

See the [Developer Guide](./DEVELOPER_GUIDE.md#deployment) for deployment instructions.

### "Where are images stored?"

- **Local assets:** `src/assets/` — for logos, team photos, and static images
- **Uploaded images:** `backend/media/properties/` — for property and gallery images uploaded via Django Admin

---

## Need Help?

- **Phone:** 053 400 7070
- **Email:** Mallanga1ltd@gmail.com
- **WhatsApp:** [Chat with us](https://wa.me/233534007070)
