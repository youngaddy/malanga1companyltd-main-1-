import json
from database import engine, SessionLocal, Base
from models import Property, PropertyImage, Testimonial, Stat

Base.metadata.create_all(bind=engine)
db = SessionLocal()

properties = [
    {
        "title": "The Savanna Villa",
        "description": "Executive 5 Bedroom Villa",
        "price": "GH\u20b5 1,850,000",
        "location": "Airport Ridge",
        "tag": "Featured",
        "type": "house",
        "image": "/src/assets/hero-villa.jpg",
        "tagFeatured": True,
        "longDescription": "An architectural masterpiece located in the exclusive Airport Ridge neighborhood of Tamale. This executive 5-bedroom villa features luxury finishing, spacious living areas, custom kitchen cabinetry, and private master balcony.",
        "features": json.dumps(["5 Ensuite Bedrooms", "Spacious Living & Dining Area", "Fitted Modern Kitchen", "Landscaped Private Yard", "24/7 Security Gate & Perimeter Fence", "Full Title & Land Registry Documentation"]),
        "specs": json.dumps([{"label": "Status", "value": "Available"}, {"label": "Type", "value": "House"}, {"label": "Bedrooms", "value": "5"}, {"label": "Location", "value": "Airport Ridge"}]),
        "gallery": ["/src/assets/hero-villa.jpg", "/src/assets/gallery-interior.jpg", "/src/assets/gallery-kitchen.jpg"],
    },
    {
        "title": "Lamashegu Prime Plot",
        "description": "100 x 100 Residential Land",
        "price": "GH\u20b5 45,000",
        "location": "Tamale South",
        "tag": "For Sale",
        "type": "plot",
        "image": "/src/assets/plot-lamashegu.jpg",
        "tagFeatured": False,
        "longDescription": "A prime 100 x 100 ft residential plot situated in a fast-developing residential zone of Lamashegu, Tamale South. Fully demarcated, accessible by main feeder roads, and ready for immediate construction.",
        "features": json.dumps(["100 x 100 ft Size", "Demarcated & Pegged", "Electricity & Water Nearby", "Clear Land Title Search", "Good Road Access"]),
        "specs": json.dumps([{"label": "Status", "value": "For Sale"}, {"label": "Type", "value": "Plot"}, {"label": "Dimensions", "value": "100 x 100 ft"}, {"label": "Location", "value": "Tamale South"}]),
        "gallery": ["/src/assets/plot-lamashegu.jpg", "/src/assets/gallery-construction.jpg", "/src/assets/gallery-estate.jpg"],
    },
    {
        "title": "The Garden Residency",
        "description": "3 Bedroom Luxury Rental",
        "price": "GH\u20b5 2,500/mo",
        "location": "Vittin Target",
        "tag": "Featured",
        "type": "rental",
        "image": "/src/assets/rental-vittin.jpg",
        "tagFeatured": True,
        "longDescription": "Modern 3-bedroom residence for lease in Vittin Target. Designed with open plan living, high security walls, paved compound, and reliable water storage systems.",
        "features": json.dumps(["3 Spacious Bedrooms", "Master Ensuite", "Water Tank & Pump System", "Paved Compound & Parking", "Quiet Residential Neighborhood"]),
        "specs": json.dumps([{"label": "Status", "value": "Available for Rent"}, {"label": "Type", "value": "Rental"}, {"label": "Bedrooms", "value": "3"}, {"label": "Location", "value": "Vittin Target"}]),
        "gallery": ["/src/assets/rental-vittin.jpg", "/src/assets/gallery-kitchen.jpg", "/src/assets/gallery-interior.jpg"],
    },
    {
        "title": "Kalpohin Hill View",
        "description": "Multi-purpose Commercial Plot",
        "price": "GH\u20b5 75,000",
        "location": "Kalpohin",
        "tag": "For Sale",
        "type": "plot",
        "image": "/src/assets/plot-kalpohin.jpg",
        "tagFeatured": False,
        "longDescription": "Strategic plot located in Kalpohin with excellent visibility and access. Ideal for apartment complexes, commercial stores, or executive residential build.",
        "features": json.dumps(["High Growth Area", "Topographical Elevation", "Verified Lands Commission Documentation", "Easy Access to Tamale Central"]),
        "specs": json.dumps([{"label": "Status", "value": "For Sale"}, {"label": "Type", "value": "Plot"}, {"label": "Location", "value": "Kalpohin"}]),
        "gallery": ["/src/assets/plot-kalpohin.jpg", "/src/assets/gallery-construction.jpg", "/src/assets/gallery-estate.jpg"],
    },
    {
        "title": "Sagnarigu Family Home",
        "description": "4 Bedroom Detached House",
        "price": "GH\u20b5 950,000",
        "location": "Sagnarigu",
        "tag": "For Sale",
        "type": "house",
        "image": "/src/assets/house-sale.jpg",
        "tagFeatured": False,
        "longDescription": "Beautifully crafted 4-bedroom detached family bungalow in Sagnarigu. Features spacious compound, security gatehouse, modern interior finishes, and mature trees.",
        "features": json.dumps(["4 Bedrooms (2 Ensuite)", "Large Compound for Expansion", "Modern Kitchen Cabinets", "Solar Backup Ready", "Full Site Plan & Indenture"]),
        "specs": json.dumps([{"label": "Status", "value": "For Sale"}, {"label": "Type", "value": "House"}, {"label": "Bedrooms", "value": "4"}, {"label": "Location", "value": "Sagnarigu"}]),
        "gallery": ["/src/assets/house-sale.jpg", "/src/assets/gallery-interior.jpg", "/src/assets/gallery-kitchen.jpg"],
    },
    {
        "title": "Gurugu Estate Plots",
        "description": "Serviced Plots \u2014 Gated Estate",
        "price": "GH\u20b5 60,000",
        "location": "Gurugu",
        "tag": "Land Sale",
        "type": "plot",
        "image": "/src/assets/gallery-estate.jpg",
        "tagFeatured": False,
        "longDescription": "Gated community plot scheme in Gurugu with planned utility lines, tree-lined streets, and designated park areas. Secure your parcel in Tamale's next luxury neighborhood.",
        "features": json.dumps(["Master-Planned Layout", "Gated Community Concept", "Utility Lines (Electricity & Water)", "Strict Building Codes for Value Retention"]),
        "specs": json.dumps([{"label": "Status", "value": "Land Sale"}, {"label": "Type", "value": "Plot"}, {"label": "Location", "value": "Gurugu"}]),
        "gallery": ["/src/assets/gallery-estate.jpg", "/src/assets/plot-lamashegu.jpg", "/src/assets/gallery-construction.jpg"],
    },
]

for p in properties:
    gallery_urls = p.pop("gallery", [])
    existing = db.query(Property).filter(Property.title == p["title"]).first()
    if existing:
        for k, v in p.items():
            setattr(existing, k, v)
        prop = existing
    else:
        prop = Property(**p)
        db.add(prop)
        db.flush()
    for url in gallery_urls:
        exists = db.query(PropertyImage).filter(PropertyImage.property_id == prop.id, PropertyImage.image_url == url).first()
        if not exists:
            db.add(PropertyImage(property_id=prop.id, image_url=url))

stats = [
    {"label": "Plots Sold", "value": 150, "suffix": "+", "order": 0},
    {"label": "Homes Delivered", "value": 40, "suffix": "+", "order": 1},
    {"label": "Estate Projects", "value": 10, "suffix": "+", "order": 2},
    {"label": "Verified Titles", "value": 100, "suffix": "%", "order": 3},
]

for s in stats:
    existing = db.query(Stat).filter(Stat.label == s["label"]).first()
    if not existing:
        db.add(Stat(**s))

testimonials = [
    {"name": "Fuseini Adam", "role": "Plot buyer, Sagnarigu", "quote": "Malanga 1 sold me a plot in Sagnarigu with full documentation and a genuine indenture. The process was straightforward and I never once worried about a double sale.", "rating": 5, "is_approved": True},
    {"name": "Mariama Iddrisu", "role": "Homeowner, Vittin", "quote": "We moved into our family home in Vittin within weeks. The finish is superb and the team walked us through every step, from viewing to handover.", "rating": 5, "is_approved": True},
    {"name": "Kwame Boateng", "role": "Investor, Accra", "quote": "As an investor based in Accra, I needed a partner I could trust in the North. Malanga 1 handled titling, site inspections and reporting with total transparency.", "rating": 4, "is_approved": True},
    {"name": "Yakubu Sulley", "role": "Tenant, Kalpohin", "quote": "The rental we secured through Malanga 1 was exactly as advertised \u2014 clean, modern and priced fairly. Best property experience we've had in Tamale.", "rating": 5, "is_approved": True},
]

for t in testimonials:
    existing = db.query(Testimonial).filter(Testimonial.name == t["name"]).first()
    if not existing:
        db.add(Testimonial(**t))

db.commit()
db.close()
print("Database seeded successfully!")
