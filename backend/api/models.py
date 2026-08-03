from django.db import models

class Property(models.Model):
    TYPE_CHOICES = [
        ('plot', 'Plot'),
        ('rental', 'Rental'),
        ('house', 'House'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    image = models.CharField(max_length=500, blank=True, null=True)
    image_file = models.ImageField(upload_to='properties/', blank=True, null=True)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    tag = models.CharField(max_length=100, blank=True, null=True)
    tagFeatured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='properties/gallery/')
    caption = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.property.title} Gallery Image"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    message = models.TextField()
    property_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.phone}"

class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, blank=True, null=True)
    quote = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.role or 'Client'}"

class Stat(models.Model):
    label = models.CharField(max_length=100)
    value = models.PositiveIntegerField()
    suffix = models.CharField(max_length=10, default='+', blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.label} ({self.value}{self.suffix})"
