from rest_framework import viewsets, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Property, ContactMessage, Testimonial, Stat
from .serializers import (
    PropertySerializer,
    GalleryImageSerializer,
    ContactMessageSerializer,
    TestimonialSerializer,
    StatSerializer,
)

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer

@api_view(['GET'])
def gallery_list(request):
    properties = Property.objects.all().prefetch_related('gallery_images')
    items = []
    for prop in properties:
        if prop.image_file:
            items.append({
                'src': request.build_absolute_uri(prop.image_file.url),
                'caption': f"{prop.title} — {prop.description}",
                'tall': True,
            })
        for img in prop.gallery_images.all():
            if img.image:
                items.append({
                    'src': request.build_absolute_uri(img.image.url),
                    'caption': img.caption or f"{prop.title} gallery",
                    'tall': False,
                })
    serializer = GalleryImageSerializer(items, many=True)
    return Response(serializer.data)

class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class TestimonialViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Testimonial.objects.filter(is_approved=True).order_by('-created_at')
    serializer_class = TestimonialSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(is_approved=False)
        return Response(serializer.data, status=201)

class StatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stat.objects.all().order_by('order')
    serializer_class = StatSerializer
