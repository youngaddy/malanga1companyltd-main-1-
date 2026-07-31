from django.contrib import admin
from django.utils.html import format_html
from .models import Property, PropertyImage, ContactMessage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'price', 'location', 'tag', 'tagFeatured', 'created_at')
    list_filter = ('type', 'tagFeatured', 'location')
    search_fields = ('title', 'description', 'location')
    list_editable = ('tagFeatured', 'price')
    inlines = [PropertyImageInline]
    ordering = ('-created_at',)
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'price', 'location', 'type', 'tag', 'tagFeatured')
        }),
        ('Image', {
            'fields': ('image', 'image_file'),
            'description': 'Upload a property image or provide a URL path.'
        }),
    )

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ('thumbnail_preview', 'property', 'caption')
    list_filter = ('property',)
    search_fields = ('caption', 'property__title')
    readonly_fields = ('thumbnail_preview',)

    def thumbnail_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return "No image"
    thumbnail_preview.short_description = 'Preview'

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'property_id', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'phone', 'email', 'message')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
