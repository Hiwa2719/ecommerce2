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

order_urls = [
    path('add/', views.add_order_items, name='add-order'),
    path('<int:pk>/', views.get_order_by_id, name='get-order'),
    path('<int:pk>/pay/', views.update_order_to_paid, name='pay-order'),
    path('', views.get_orders, name='get-orders'),
]

urlpatterns = [
    path('products/', include(product_urls)),
    path('users/', include(users_urls)),
    path('orders/', include(order_urls)),
    path('stripe-payment/<int:pk>/', views.stripe_payment, name='stripe-payment'),
]
