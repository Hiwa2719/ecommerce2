from django.urls import path, include

from . import views

app_name = 'base'

product_urls = [
    path('', views.get_products, name='get_products'),
    path('<int:pk>/', views.get_product, name='get_product'),
]

users_urls = [
    path('', views.get_users, name='users'),
    path('register/', views.register_user, name='user-register'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.get_user_profile, name='user-profile'),
    path('profile/update/', views.update_user_profile, name='update-user-profile'),
]

urlpatterns = [
    path('products/', include(product_urls)),
    path('users/', include(users_urls))
]
