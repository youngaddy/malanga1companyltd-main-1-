# Malanga 1 Admin Dashboard Guide

The website and its dashboard now run entirely on Firebase, so there is no
sleeping server and no Render wake-up delay.

## Accessing the Dashboard

1. Go to **https://malanga1company.web.app/admin**
2. Enter your password: `Ma0201629806@`
3. The dashboard opens with your properties, gallery, testimonials, messages and stats
4. Click **Logout** in the top-right corner when you are finished

> Your sign-in is handled by Firebase Authentication using the account
> `admin@malanga1company.com`. You only ever type the password — the email is
> filled in for you.

> **Bookmark it.** `https://malanga1company.com/admin` will also work once the
> custom domain is pointed at Firebase Hosting.

---

## Dashboard Overview

When you log in you see:

- **Stats bar** at the top: counts of Properties, Gallery images, Testimonials, Messages and Stats
- **Tabs** to switch between Properties, Gallery, Testimonials, Messages and Stats

Every change is saved to Firestore immediately and appears on the public site
on the next page load.

---

## Managing Properties

### Viewing properties
Click the **Properties** tab. Each row shows the image, title, price, location,
type, tag and action buttons.

### Adding a property
1. Click **+ Add property**
2. Fill in:
   - **Title** — property name (e.g. "The Savanna Villa")
   - **Price** — display price (e.g. "GH₵ 1,850,000")
   - **Location** — area name (e.g. "Airport Ridge")
   - **Type** — Plot, House or Rental
   - **Description** — the short line shown on property cards
3. Optional fields:
   - **Tag** — badge text such as "Featured", "For Sale", "Land Sale"
   - **Order** — position in the listings (lowest first)
   - **Long description** — the full text on the property page
   - **Features** — one per line
   - **Specs** — one `Label: Value` per line (e.g. `Bedrooms: 5`)
   - **Feature this property on the homepage** — highlights it on the home page
4. Add images:
   - **Main image URL** — click the file picker to upload, or paste a URL
   - **Gallery image URLs** — paste one URL per line, or upload several files at once
5. Click **Add property**

### Editing a property
1. Click **Edit** on the property row
2. Change any field, upload extra gallery images if needed
3. Click **Save changes**

### Deleting a property
Click **Delete** and confirm. This also removes it from the gallery.

### Seeding sample data
On a completely empty database, **Seed sample data** fills in the six demo
properties, the four homepage stats and four approved testimonials. It never
overwrites existing records.

---

## Managing Gallery Images

The **Gallery** tab lists every image used by the site: each property's main
image plus its gallery images.

### Adding gallery images
1. Click **+ Add gallery images**
2. Choose the property
3. Paste URLs (one per line) or upload files
4. Click **Add images**

### Removing a gallery image
Click **Remove** next to the image and confirm. The main image can only be
changed by editing the property itself.

---

## Managing Testimonials

Reviews submitted through the website arrive as **Pending** and stay hidden
until you approve them.

- **Approve** — publishes the review on the website immediately
- **Edit** — change the name, role, quote or rating (1–5 stars)
- **Delete** — remove it permanently

---

## Managing Contact Messages

The **Messages** tab lists every enquiry from the website, newest first, with
the date, name, phone, email and message. Enquiries sent from a property page
also show which property the visitor was viewing.

Click **Delete** to remove a message once you have handled it. Messages are
private: only the admin account can read them, so enquiries are never exposed
on the public site.

---

## Managing Stats (Homepage Numbers)

These are the counters on the homepage, e.g. "150+ Plots Sold".

### Adding a stat
1. Click **+ Add stat**
2. Enter the **Label**, the **Value**, the **Suffix** (`+`, `%`, …) and the **Order**
3. Click **Add stat**

### Editing or deleting
Use **Edit** or **Delete** on the stat row.

---

## Uploading Images

Every image field accepts either method:

### Option 1: Paste a URL
Paste any public image URL (for example from imgbb.com or imgur.com) into the
text field. This always works.

### Option 2: Upload
Click the file picker next to the field and choose an image. It is uploaded to
Firebase Storage and the URL is filled in automatically. You can select several
files at once for gallery fields.

> **Uploads are currently switched off** because Firebase Storage needs billing
> enabled on the project, and no card is on file yet. The dashboard disables the
> file pickers and says so. Use Option 1 until Storage is set up — nothing else
> in the dashboard is affected.

Images must be under 10 MB and must be image files (JPG, PNG, WebP, GIF).

---

## Tips

- **Works on phones** — tables scroll sideways and forms stack vertically
- **Sessions persist** — you stay signed in until you log out
- **Always add a main image** — it is used on property cards and the property page
- **Gallery images** appear as thumbnails under the main image on the property page
- **Order matters** — properties and stats are sorted by their Order number

---

## URLs to Remember

| Page | URL |
|------|-----|
| Admin Dashboard | https://malanga1company.web.app/admin |
| Public Website | https://malanga1company.web.app |
| Firebase Console | https://console.firebase.google.com/project/malanga1company |
