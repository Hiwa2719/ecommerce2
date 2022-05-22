from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

app_name = 'base'


urlpatterns = [
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.get_routes, name='routes'),
    path('products/', views.get_products, name='get_products'),
    path('products/<int:pk>/', views.get_product, name='get_product'),
]
