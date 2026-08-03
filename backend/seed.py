import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Property, Testimonial, Stat

properties = [
  {
    "title": "Lamashegu Prime Plot",
    "description": "100 x 100 Residential Land",
    "price": "GH₵ 45,000",
    "location": "Tamale South",
    "tag": "For Sale",
    "type": "plot",
    "image": "/src/assets/plot-lamashegu.jpg",
    "tagFeatured": False,
  },
  {
    "title": "The Garden Residency",
    "description": "3 Bedroom Luxury Rental",
    "price": "GH₵ 2,500/mo",
    "location": "Vittin Target",
    "tag": "Featured",
    "tagFeatured": True,
    "type": "rental",
    "image": "/src/assets/rental-vittin.jpg",
  },
  {
    "title": "Kalpohin Hill View",
    "description": "Multi-purpose Commercial Plot",
    "price": "GH₵ 75,000",
    "location": "Kalpohin",
    "tag": "For Sale",
    "type": "plot",
    "image": "/src/assets/plot-kalpohin.jpg",
    "tagFeatured": False,
  },
  {
    "title": "Sagnarigu Family Home",
    "description": "4 Bedroom Detached House",
    "price": "GH₵ 950,000",
    "location": "Sagnarigu",
    "tag": "For Sale",
    "type": "house",
    "image": "/src/assets/house-sale.jpg",
    "tagFeatured": False,
  },
  {
    "title": "The Savanna Villa",
    "description": "Executive 5 Bedroom Villa",
    "price": "GH₵ 1,850,000",
    "location": "Airport Ridge",
    "tag": "Featured",
    "tagFeatured": True,
    "type": "house",
    "image": "/src/assets/hero-villa.jpg",
  },
  {
    "title": "Gurugu Estate Plots",
    "description": "Serviced Plots — Gated Estate",
    "price": "GH₵ 60,000",
    "location": "Gurugu",
    "tag": "Land Sale",
    "type": "plot",
    "image": "/src/assets/gallery-estate.jpg",
    "tagFeatured": False,
  }
]

for p in properties:
    Property.objects.get_or_create(
        title=p['title'],
        defaults=p
    )

stats = [
    {"label": "Plots Sold", "value": 150, "suffix": "+", "order": 0},
    {"label": "Homes Delivered", "value": 40, "suffix": "+", "order": 1},
    {"label": "Estate Projects", "value": 10, "suffix": "+", "order": 2},
    {"label": "Verified Titles", "value": 100, "suffix": "%", "order": 3},
]

for s in stats:
    Stat.objects.get_or_create(label=s['label'], defaults=s)

testimonials = [
    {
        "name": "Fuseini Adam",
        "role": "Plot buyer, Sagnarigu",
        "quote": "Malanga 1 sold me a plot in Sagnarigu with full documentation and a genuine indenture. The process was straightforward and I never once worried about a double sale.",
        "rating": 5,
        "is_approved": True,
    },
    {
        "name": "Mariama Iddrisu",
        "role": "Homeowner, Vittin",
        "quote": "We moved into our family home in Vittin within weeks. The finish is superb and the team walked us through every step, from viewing to handover.",
        "rating": 5,
        "is_approved": True,
    },
    {
        "name": "Kwame Boateng",
        "role": "Investor, Accra",
        "quote": "As an investor based in Accra, I needed a partner I could trust in the North. Malanga 1 handled titling, site inspections and reporting with total transparency.",
        "rating": 4,
        "is_approved": True,
    },
    {
        "name": "Yakubu Sulley",
        "role": "Tenant, Kalpohin",
        "quote": "The rental we secured through Malanga 1 was exactly as advertised — clean, modern and priced fairly. Best property experience we've had in Tamale.",
        "rating": 5,
        "is_approved": True,
    },
]

for t in testimonials:
    Testimonial.objects.get_or_create(
        name=t['name'],
        defaults=t
    )

print("Database seeded successfully!")
