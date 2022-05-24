from django.urls import path, include
from . import views

app_name = 'base'


urlpatterns = [
    path('products/', views.get_products, name='get_products'),
    path('products/<int:pk>/', views.get_product, name='get_product'),
    path('users/', include([
        path('', views.get_users, name='users'),
        path('register/', views.register_user, name='user-register'),
        path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('profile/', views.get_user_profile, name='user-profile')
    ]))
]
