from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, gallery_list, ContactMessageViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    path('', include(router.urls)),
    path('gallery/', gallery_list, name='gallery-list'),
]
