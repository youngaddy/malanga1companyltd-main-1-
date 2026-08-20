import os
import json
import secrets
import hashlib
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request as StarletteRequest
from starlette.responses import RedirectResponse as StarletteRedirect
from fastapi import FastAPI, Depends, Request, Form, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from database import Base, engine, get_db
from models import Property, PropertyImage, ContactMessage, Testimonial, Stat

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Ma0201629806@")
ADMIN_TOKEN = secrets.token_hex(32)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AdminAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: StarletteRequest, call_next):
        path = request.url.path
        if path.startswith("/admin") and path not in ("/admin/login", "/admin/logout") and request.method == "POST":
            token = request.cookies.get("admin_token")
            if token != ADMIN_TOKEN:
                return StarletteRedirect("/admin/login")
        return await call_next(request)

app.add_middleware(AdminAuthMiddleware)

Base.metadata.create_all(bind=engine)

templates = Jinja2Templates(directory="templates")


# --- Pydantic Schemas ---

class PropertyOut(BaseModel):
    id: int
    title: str
    description: str
    price: str
    location: str
    image: Optional[str] = None
    display_image: Optional[str] = None
    type: str
    tag: Optional[str] = None
    tagFeatured: bool = False
    gallery: list[str] = []

    model_config = {"from_attributes": True}


class ContactCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: str
    property_id: Optional[str] = None


class TestimonialOut(BaseModel):
    id: int
    name: str
    role: Optional[str] = None
    quote: str
    rating: int = 5
    created_at: Optional[str] = None

    model_config = {"from_attributes": True}


class TestimonialCreate(BaseModel):
    name: str
    role: Optional[str] = None
    quote: str
    rating: int = 5


class StatOut(BaseModel):
    id: int
    label: str
    value: int
    suffix: str = "+"

    model_config = {"from_attributes": True}


# --- API Routes ---

@app.get("/api/properties/")
def list_properties(db: Session = Depends(get_db)):
    props = db.query(Property).order_by(Property.created_at.desc()).all()
    return [_property_to_dict(p) for p in props]


@app.get("/api/properties/{property_id}")
def get_property(property_id: int, db: Session = Depends(get_db)):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return _property_to_dict(prop)


@app.post("/api/contact/")
def create_contact(msg: ContactCreate, db: Session = Depends(get_db)):
    contact = ContactMessage(**msg.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return {"id": contact.id, "message": "Message sent successfully"}


@app.get("/api/testimonials/")
def list_testimonials(db: Session = Depends(get_db)):
    items = db.query(Testimonial).filter(Testimonial.is_approved == True).order_by(Testimonial.created_at.desc()).all()
    return [
        {"id": t.id, "name": t.name, "role": t.role, "quote": t.quote, "rating": t.rating}
        for t in items
    ]


@app.post("/api/testimonials/")
def create_testimonial(data: TestimonialCreate, db: Session = Depends(get_db)):
    t = Testimonial(**data.model_dump(), is_approved=False)
    db.add(t)
    db.commit()
    db.refresh(t)
    return {"id": t.id, "message": "Testimonial submitted for review"}


@app.get("/api/stats/")
def list_stats(db: Session = Depends(get_db)):
    stats = db.query(Stat).order_by(Stat.order).all()
    return [{"id": s.id, "label": s.label, "value": s.value, "suffix": s.suffix} for s in stats]


@app.get("/api/gallery/")
def list_gallery(db: Session = Depends(get_db)):
    props = db.query(Property).all()
    items = []
    for prop in props:
        if prop.image:
            items.append({"src": prop.image, "caption": f"{prop.title} — {prop.description}", "tall": True})
        for img in prop.gallery_images:
            items.append({"src": img.image_url, "caption": img.caption or f"{prop.title} gallery", "tall": False})
    return items


def _property_to_dict(prop: Property) -> dict:
    features = []
    specs = []
    if prop.features:
        try:
            features = json.loads(prop.features)
        except (json.JSONDecodeError, TypeError):
            pass
    if prop.specs:
        try:
            specs = json.loads(prop.specs)
        except (json.JSONDecodeError, TypeError):
            pass
    return {
        "id": prop.id,
        "title": prop.title,
        "description": prop.description,
        "price": prop.price,
        "location": prop.location,
        "image": prop.image,
        "display_image": prop.image,
        "type": prop.type,
        "tag": prop.tag,
        "tagFeatured": prop.tagFeatured,
        "longDescription": prop.longDescription or prop.description or "",
        "features": features,
        "specs": specs,
        "gallery": [img.image_url for img in prop.gallery_images],
        "created_at": prop.created_at.isoformat() if prop.created_at else None,
    }


# --- Admin Dashboard ---

def check_admin(request: Request):
    token = request.cookies.get("admin_token")
    if token == ADMIN_TOKEN:
        return True
    return False

@app.get("/admin/login", response_class=HTMLResponse)
def admin_login_page(request: Request, error: str = ""):
    return templates.TemplateResponse(request, "login.html", {"error": error})

@app.post("/admin/login")
def admin_login_submit(request: Request, response: Response, password: str = Form(...)):
    if password == ADMIN_PASSWORD:
        response = RedirectResponse("/admin/", status_code=303)
        response.set_cookie("admin_token", ADMIN_TOKEN, httponly=True, max_age=86400)
        return response
    return RedirectResponse("/admin/login?error=1", status_code=303)

@app.get("/admin/logout")
def admin_logout():
    response = RedirectResponse("/admin/login", status_code=303)
    response.delete_cookie("admin_token")
    return response

@app.get("/admin", response_class=HTMLResponse)
@app.get("/admin/", response_class=HTMLResponse)
def admin_dashboard(request: Request, db: Session = Depends(get_db)):
    if not check_admin(request):
        return RedirectResponse("/admin/login", status_code=303)
    properties = db.query(Property).order_by(Property.created_at.desc()).all()
    testimonials = db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()
    contacts = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
    stats = db.query(Stat).order_by(Stat.order).all()
    gallery_images = db.query(PropertyImage).all()
    return templates.TemplateResponse(request, "admin.html", {
        "properties": properties,
        "testimonials": testimonials,
        "contacts": contacts,
        "stats": stats,
        "gallery_images": gallery_images,
    })


@app.post("/admin/properties/add")
def admin_add_property(
    title: str = Form(...),
    description: str = Form(...),
    price: str = Form(...),
    location: str = Form(...),
    type: str = Form(...),
    image: str = Form(""),
    tag: str = Form(""),
    tagFeatured: bool = Form(False),
    longDescription: str = Form(""),
    features: str = Form(""),
    specs: str = Form(""),
    db: Session = Depends(get_db),
):
    prop = Property(
        title=title, description=description, price=price, location=location,
        type=type, image=image or None, tag=tag or None, tagFeatured=tagFeatured,
        longDescription=longDescription or None, features=features or None, specs=specs or None,
    )
    db.add(prop)
    db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/properties/{property_id}/delete")
def admin_delete_property(property_id: int, db: Session = Depends(get_db)):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if prop:
        db.delete(prop)
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/properties/{property_id}/edit")
def admin_edit_property(
    property_id: int,
    title: str = Form(...),
    description: str = Form(...),
    price: str = Form(...),
    location: str = Form(...),
    type: str = Form(...),
    image: str = Form(""),
    tag: str = Form(""),
    tagFeatured: bool = Form(False),
    longDescription: str = Form(""),
    features: str = Form(""),
    specs: str = Form(""),
    db: Session = Depends(get_db),
):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if prop:
        prop.title = title
        prop.description = description
        prop.price = price
        prop.location = location
        prop.type = type
        prop.image = image or None
        prop.tag = tag or None
        prop.tagFeatured = tagFeatured
        prop.longDescription = longDescription or None
        prop.features = features or None
        prop.specs = specs or None
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/testimonials/{testimonial_id}/approve")
def admin_approve_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if t:
        t.is_approved = True
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/testimonials/{testimonial_id}/edit")
def admin_edit_testimonial(
    testimonial_id: int,
    name: str = Form(...),
    role: str = Form(""),
    quote: str = Form(...),
    rating: int = Form(5),
    db: Session = Depends(get_db),
):
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if t:
        t.name = name
        t.role = role or None
        t.quote = quote
        t.rating = rating
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/testimonials/{testimonial_id}/delete")
def admin_delete_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if t:
        db.delete(t)
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/contacts/{contact_id}/delete")
def admin_delete_contact(contact_id: int, db: Session = Depends(get_db)):
    c = db.query(ContactMessage).filter(ContactMessage.id == contact_id).first()
    if c:
        db.delete(c)
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/contacts/{contact_id}/edit")
def admin_edit_contact(
    contact_id: int,
    name: str = Form(...),
    phone: str = Form(...),
    email: str = Form(""),
    message: str = Form(...),
    db: Session = Depends(get_db),
):
    c = db.query(ContactMessage).filter(ContactMessage.id == contact_id).first()
    if c:
        c.name = name
        c.phone = phone
        c.email = email or None
        c.message = message
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/stats/add")
def admin_add_stat(
    label: str = Form(...),
    value: int = Form(...),
    suffix: str = Form("+"),
    db: Session = Depends(get_db),
):
    order = db.query(Stat).count()
    stat = Stat(label=label, value=value, suffix=suffix, order=order)
    db.add(stat)
    db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/stats/{stat_id}/delete")
def admin_delete_stat(stat_id: int, db: Session = Depends(get_db)):
    s = db.query(Stat).filter(Stat.id == stat_id).first()
    if s:
        db.delete(s)
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/stats/{stat_id}/edit")
def admin_edit_stat(
    stat_id: int,
    label: str = Form(...),
    value: int = Form(...),
    suffix: str = Form("+"),
    db: Session = Depends(get_db),
):
    s = db.query(Stat).filter(Stat.id == stat_id).first()
    if s:
        s.label = label
        s.value = value
        s.suffix = suffix
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/gallery/add")
def admin_add_gallery_image(
    property_id: int = Form(...),
    image_url: str = Form(""),
    image_urls: str = Form(""),
    caption: str = Form(""),
    db: Session = Depends(get_db),
):
    urls = []
    if image_url:
        urls.append(image_url)
    if image_urls:
        for line in image_urls.strip().splitlines():
            line = line.strip()
            if line:
                urls.append(line)
    for url in urls:
        db.add(PropertyImage(property_id=property_id, image_url=url, caption=caption or None))
    db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/gallery/{image_id}/delete")
def admin_delete_gallery_image(image_id: int, db: Session = Depends(get_db)):
    img = db.query(PropertyImage).filter(PropertyImage.id == image_id).first()
    if img:
        db.delete(img)
        db.commit()
    return RedirectResponse("/admin/", status_code=303)


@app.post("/admin/gallery/{image_id}/edit")
def admin_edit_gallery_image(
    image_id: int,
    property_id: int = Form(...),
    image_url: str = Form(...),
    caption: str = Form(""),
    db: Session = Depends(get_db),
):
    img = db.query(PropertyImage).filter(PropertyImage.id == image_id).first()
    if img:
        img.property_id = property_id
        img.image_url = image_url
        img.caption = caption or None
        db.commit()
    return RedirectResponse("/admin/", status_code=303)
