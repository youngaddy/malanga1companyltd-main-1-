from rest_framework import serializers
from .models import Property, PropertyImage, ContactMessage, Testimonial, Stat

class PropertyImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'caption', 'url']

    def get_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return ""

class PropertySerializer(serializers.ModelSerializer):
    gallery = serializers.SerializerMethodField()
    display_image = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = '__all__'

    def get_display_image(self, obj):
        request = self.context.get('request')
        if obj.image_file:
            if request:
                return request.build_absolute_uri(obj.image_file.url)
            return obj.image_file.url
        return obj.image or ""

    def get_gallery(self, obj):
        request = self.context.get('request')
        urls = []
        for img in obj.gallery_images.all():
            if img.image:
                if request:
                    urls.append(request.build_absolute_uri(img.image.url))
                else:
                    urls.append(img.image.url)
        return urls

class GalleryImageSerializer(serializers.Serializer):
    src = serializers.URLField()
    caption = serializers.CharField()
    tall = serializers.BooleanField(default=False)

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    rating = serializers.IntegerField(min_value=1, max_value=5, required=False)

    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'role', 'quote', 'rating', 'created_at']
        read_only_fields = ['id', 'created_at']

class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ['id', 'label', 'value', 'suffix']
