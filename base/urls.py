from django.urls import path
from . import views


app_name = 'base'


urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('products/', views.get_products, name='get_products'),

]