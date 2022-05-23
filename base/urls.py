from django.urls import path, include
from . import views

app_name = 'base'


urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('products/', views.get_products, name='get_products'),
    path('products/<int:pk>/', views.get_product, name='get_product'),
    path('users/', include([
        path('', views.get_users, name='users'),
        path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('profile/', views.get_user_profile, name='user-profile')
    ]))
]
