from django.urls import path
from . import views


app_name = 'base'


urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('products/', views.get_products, name='get_products'),
    path('products/<int:pk>/', views.get_product, name='get_product'),
]
