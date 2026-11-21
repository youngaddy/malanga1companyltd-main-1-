# Firebase Deployment

The site is hosted on Firebase: the React frontend on Firebase Hosting, the data
in Firestore, and images in Firebase Storage. There is no custom backend server,
so nothing sleeps and there is no Render/FastAPI dependency anymore.

| Thing | Value |
|-------|-------|
| Firebase project | `malanga1company` |
| Custom domain | https://malanga1company.com |
| Hosting URL | https://malanga1company.web.app |
| Admin dashboard | https://malanga1company.com/admin |
| Firestore database | `default` (Native mode, `nam5`) |
| Storage bucket | `malanga1company.firebasestorage.app` |
| Admin account | `admin@malanga1company.com` |

## How the pieces fit

```
Browser
  ├── Firebase Hosting ──► static React app (dist/client)
  │                        ├── prerendered HTML for /, /about, /properties,
  │                        │   /gallery, /contact, /services   (SEO)
  │                        └── /_shell.html fallback ──► client router
  │                            handles any other URL, e.g. /properties/<id>
  ├── Firestore  ──► properties, stats, testimonials, messages
  └── Storage    ──► property photos uploaded from the dashboard
```

- **Public visitors** can read properties, stats and approved testimonials, and
  can create messages and pending testimonials. They cannot read messages,
  cannot read unapproved testimonials, and cannot change anything else.
- **The admin account** (`admin@malanga1company.com`) carries an `admin: true`
  custom claim and can read and write everything. The rules check that claim,
  not the email address, so registering the same email grants nothing.

Rules live in `firestore.rules` and `storage.rules`.

## Building and deploying

```bash
cd malanga1companyltd-main
npm install
npm run build            # two passes: router shell + prerendered pages
cd ..
firebase deploy --only hosting,firestore:rules,storage
```

`npm run build` is not a plain `vite build`. `scripts/build-hosting.mjs` runs:

1. `BUILD_SHELL=1 vite build` → `dist/client/_shell.html`
2. `vite build` → prerendered HTML for the static routes
3. merges the shell back in and checks that both passes produced the same
   asset filenames

Firebase Hosting rewrites `/admin/**` to the dashboard and everything else that
is not a real file to `/_shell.html`. That is what lets property pages created
later in the dashboard work without a rebuild.

## Seeding content

`scripts/seed-firestore.mjs` (at the repository root) inserts the six starter
properties, four stats and four approved testimonials. It uses the Firebase CLI
login, so run `firebase login` first:

```bash
node scripts/seed-firestore.mjs
```

You can also seed from the dashboard with **Seed sample data**, which only runs
when the relevant collections are empty.

## Custom domain

`malanga1company.com` is connected to this Hosting site and serves the live
site. The DNS at Cloudflare has:

| Type | Name | Value |
|------|------|-------|
| A | `malanga1company.com` | `199.36.158.100` |
| TXT | `malanga1company.com` | `hosting-site=malanga1company` |

Both Firebase Auth's authorized-domain list and the Hosting custom-domain
association include `malanga1company.com`, so the dashboard login works on the
custom domain too.

`www.malanga1company.com` is also live. Its Cloudflare DNS has:

| Type | Name | Target / Value |
|------|------|----------------|
| CNAME | `www` | `malanga1company.web.app` |
| TXT | `_acme-challenge.www` | ACME token issued by Firebase (rotates on renewal) |

If the domain ever shows **Site Not Found**, the TXT ownership record is the
usual cause. Add it exactly as above and wait — Firebase polls DNS and can take
up to 24 hours to transfer ownership, even after the record is visible
publicly. Check the state with:

```bash
curl -s -H "Authorization: Bearer $(cat ~/.config/configstore/firebase-tools.json | jq -r .tokens.access_token)" \
  https://firebasehosting.googleapis.com/v1beta1/projects/malanga1company/sites/malanga1company/customDomains/malanga1company.com
```

## Status of the one-time setup

**Authentication is enabled** (Email/Password) and the admin account exists:

- `admin@malanga1company.com` with the `admin: true` custom claim
- Created with `node scripts/set-admin.mjs`, which is safe to re-run if the
  password ever needs resetting

**Storage is the only piece still missing.** Firebase Storage will not
initialise until the project has a billing account, and Google requires a card
on file even though the free tier is generous. Until then:

- Image **uploads** in the dashboard are disabled, with a note explaining why
- Pasting an **image URL** (imgbb.com, imgur.com, Cloudinary, …) works normally
- Everything else — listings, gallery layout, testimonials, messages, stats — is
  fully working

When a card is available:

1. **Enable Blaze**
   https://console.firebase.google.com/project/malanga1company/usage-and-billing
   Add a payment method and switch to the Blaze plan.

2. **Set up Storage**
   https://console.firebase.google.com/project/malanga1company/storage
   Click **Get started**, accept the default bucket
   `malanga1company.firebasestorage.app`.

3. **Deploy the rules**

   ```bash
   firebase deploy --only storage
   ```

Uploads start working immediately afterwards; the dashboard detects the bucket
on its own.

## Data model

| Collection | Fields |
|------------|--------|
| `properties` | `title`, `description`, `price`, `location`, `tag`, `tagFeatured`, `type` (`plot` \| `house` \| `rental`), `image`, `gallery[]`, `longDescription`, `features[]`, `specs[{label,value}]`, `order`, `createdAt`, `updatedAt` |
| `stats` | `label`, `value`, `suffix`, `order` |
| `testimonials` | `name`, `role`, `quote`, `rating`, `approved`, `createdAt` |
| `messages` | `name`, `phone`, `email`, `message`, `propertyId`, `createdAt` |

Property image paths written by the seed script look like
`/src/assets/hero-villa.jpg`. The frontend maps those to the hashed files that
Vite produces at build time, so they keep working in production.

## The old Render backend

`backend/` and `render.yaml` are no longer used by the website and can be
removed whenever you are comfortable doing so. They are left in place so the
previous implementation stays available for reference.
