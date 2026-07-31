import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Property

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

print("Database seeded successfully!")
