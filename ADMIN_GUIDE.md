# Malanga 1 Admin Dashboard Guide

## Accessing the Dashboard

1. Go to **https://malanga1-backend.onrender.com/admin/login**
2. Enter your password: `Ma0201629806@`
3. You'll be redirected to the main dashboard
4. To log out, click **Logout** in the top-right corner

> **Note:** If the page shows "Not Found" on first load, wait 30 seconds and refresh. The server sleeps after inactivity and needs to wake up.

---

## Dashboard Overview

When you first log in, you'll see:
- **Stats bar** at the top showing counts of Properties, Testimonials, Messages, Stats, and Gallery Images
- **Tab navigation** to switch between sections: Properties, Gallery, Testimonials, Messages, Stats

---

## Managing Properties

### Viewing Properties
- Click the **Properties** tab
- All properties are listed in a table with ID, Title, Price, Location, Type, Tag, and Featured status

### Adding a Property
1. Scroll to the **Add Property** form at the bottom of the Properties tab
2. Fill in the required fields:
   - **Title** — Property name (e.g., "The Savanna Villa")
   - **Price** — Display price (e.g., "GHc 1,850,000")
   - **Location** — Area name (e.g., "Airport Ridge")
   - **Type** — Select Plot, House, or Rental
   - **Description** — Short description (shown on property cards)
3. Fill in optional fields:
   - **Tag** — Badge text (e.g., "Featured", "For Sale", "Land Sale")
   - **Featured** — Check to mark as featured property
4. Upload images:
   - **Main Image** — Click "Upload" or drag-and-drop the hero/display image
   - **Additional Images** — Click "Upload Files" to select multiple images at once, or paste URLs one per line
5. Click **Add Property**

### Editing a Property
1. Find the property in the table
2. Click the **Edit** button
3. Update any fields you need
4. To add more gallery images, paste URLs in the "Additional Images" box or click "Upload Files"
5. Click **Save**

### Deleting a Property
1. Find the property in the table
2. Click the **Delete** button
3. Confirm the deletion

---

## Managing Gallery Images

### Viewing Gallery
- Click the **Gallery** tab
- See all images across all properties

### Adding Gallery Images to a Property
1. Scroll to **Add Gallery Images**
2. Select the property from the dropdown
3. Upload method:
   - **Single image:** Click "Upload" and select one file, or paste a URL
   - **Multiple images:** Paste multiple URLs (one per line) in the text area
4. Optionally add a caption
5. Click **Add Images**

### Editing a Gallery Image
1. Find the image in the table
2. Click **Edit**
3. Update the image URL, caption, or reassign to a different property
4. Click **Save**

### Deleting a Gallery Image
1. Find the image in the table
2. Click **Delete**
3. Confirm

---

## Managing Testimonials

### Viewing Testimonials
- Click the **Testimonials** tab
- See all testimonials with their approval status (Approved or Pending)

### Approving a Testimonial
- Click the **Approve** button next to a pending testimonial
- It will now show on the public website

### Editing a Testimonial
1. Click **Edit**
2. Update the name, role, rating (1-5), or quote
3. Click **Save**

### Deleting a Testimonial
- Click **Delete** and confirm

---

## Managing Contact Messages

### Viewing Messages
- Click the **Messages** tab
- See all enquiry messages submitted through the website

### Editing a Message
- Click **Edit** to update name, phone, email, or message content
- Click **Save**

### Deleting a Message
- Click **Delete** and confirm

---

## Managing Stats (Counter Numbers)

The stats section controls the numbers shown on the homepage (e.g., "150+ Plots Sold").

### Adding a Stat
1. Scroll to **Add Stat**
2. Enter:
   - **Label** — What the number represents (e.g., "Plots Sold")
   - **Value** — The number (e.g., 150)
   - **Suffix** — What comes after the number (+, %, etc.)
3. Click **Add Stat**

### Editing a Stat
- Click **Edit**, update the values, click **Save**

### Deleting a Stat
- Click **Delete** and confirm

---

## Uploading Images

Every image field in the dashboard has two options:

### Option 1: Upload (Recommended)
1. Click the **Upload** button (purple) next to any image field
2. Select an image from your device
3. It uploads to Cloudinary automatically and fills in the URL
4. You can also **drag and drop** an image onto the drop zone

### Option 2: Paste URL
1. Get an image URL from any hosting service (imgbb.com, imgur.com, etc.)
2. Paste it into the image URL field

### Uploading Multiple Images
- In the **Additional Images** textarea on property forms, click **Upload Files**
- Hold **Ctrl** (Windows) or **Cmd** (Mac) to select multiple files
- Each image uploads and its URL is added to the list automatically

---

## Tips

- **Mobile friendly** — The dashboard works on phones. Tables scroll horizontally, forms stack vertically
- **Session stays active** for 24 hours. After that, you'll need to log in again
- **Images are hosted on Cloudinary** — they load fast and won't disappear
- **Always add a main image** — This is the image shown on property cards and the property page hero
- **Gallery images** appear as thumbnails below the main image on the property detail page

---

## URLs to Remember

| Page | URL |
|------|-----|
| Admin Login | https://malanga1-backend.onrender.com/admin/login |
| Admin Dashboard | https://malanga1-backend.onrender.com/admin/ |
| API (Properties) | https://malanga1-backend.onrender.com/api/properties/ |
| API (Testimonials) | https://malanga1-backend.onrender.com/api/testimonials/ |
| API (Stats) | https://malanga1-backend.onrender.com/api/stats/ |
| Frontend Website | https://malanga1companyltd-main-1.onrender.com |
