import stripe
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
from django.db.models import Q
from django.shortcuts import redirect
from django.urls import reverse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

import STRIPE_API_KEYS
from .models import Product, Order, OrderItem, ShippingAddress, Review
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, UserRegisterSerializer, \
    OrderSerializer

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view()
@permission_classes([IsAuthenticated])
def get_user_profile(request, pk):
    if pk == 'profile':
        user = request.user
    else:
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserRegisterSerializer(user, request.data)
    if serializer.is_valid():
        user = serializer.save()
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
        data = {
            'name': request.data.get('name'),
            'username': request.data.get('email')
        }
        serializer = UserRegisterSerializer(user, data)
        if serializer.is_valid():
            serializer.save(is_staff=request.data.get('isAdmin'))
            user.refresh_from_db()
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view()
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
def get_products(request):
    query = request.query_params.get('keyword') or ''
    requested_page = request.query_params.get('page')
    per_page = request.query_params.get('in-page')
    q_obj = Q(name__icontains=query) | Q(brand__icontains=query) | Q(category__icontains=query) | \
            Q(description__icontains=query)

    products = Product.objects.filter(q_obj).order_by('-createdAt')
    paginator = Paginator(products, 2)
    page_obj = paginator.get_page(requested_page)

    serializer = ProductSerializer(page_obj.object_list, many=True)
    return Response({'products': serializer.data, 'pages': paginator.num_pages, 'page': requested_page})


@api_view()
def get_product(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    data = request.data
    serializer = ProductSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    data = request.data
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data

    cart_items = data.get('orderItems')
    if cart_items:
        order = Order.objects.create(
            user=user,
            paymentMethod=data.get('paymentMethod'),
            taxPrice=data.get('taxPrice'),
            shippingPrice=data.get('shippingPrice'),
            totalPrice=data.get('totalPrice'),
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data.get('shippingAddress').get('address'),
            city=data.get('shippingAddress').get('city'),
            postalCode=data.get('shippingAddress').get('postalCode'),
            country=data.get('shippingAddress').get('country'),
        )
        for item in cart_items:
            try:
                product = Product.objects.get(_id=item['product'])
            except Product.DoesNotExist:
                return Response({'detail': 'Product Not Found'}, status=status.HTTP_400_BAD_REQUEST)

            order_item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                image=product.image.url,
                price=item.get('price'),
                qty=item.get('qty'),
            )

            product.countInStock -= item.get('qty')
            product.save()

            serializer = OrderSerializer(order)
            return Response(serializer.data)

    return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)


@api_view()
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view()
@permission_classes([IsAdminUser])
def get_orders(request):
    orders = Order.objects.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view()
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    user = request.user
    try:
        order = Order.objects.get(pk=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order)
            return Response(serializer.data)
        return Response({'detail': 'Not authorized to request this order.'}, status=status.HTTP_400_BAD_REQUEST)
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist.'}, status=status.HTTP_400_BAD_REQUEST)


def check_session(stripe_session_id):
    """this checks stripe session if it's paid or not"""
    return stripe.checkout.Session.retrieve(stripe_session_id).get('payment_status') == 'paid'


@api_view()
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    try:
        order = Order.objects.get(pk=pk)

        if not order.isPaid and check_session(order.stripe_session_id) and order.user == request.user:
            order.make_paid()
            if settings.DEBUG:
                return Response({'detail': 'order is updated now'})
            return redirect(reverse('base:pay-order', kwargs={'pk': order.pk}))

        return Response({'detail': 'You are not authorized to do this action.'}, status=status.HTTP_400_BAD_REQUEST)
    except Order.DoesNotExist:
        return Response({'detail': 'This order does not exist.'}, status=status.HTTP_400_BAD_REQUEST)


stripe.api_key = STRIPE_API_KEYS.SK


@api_view()
@permission_classes([IsAuthenticated])
def stripe_payment(request, pk):
    try:
        order = Order.objects.get(pk=pk)

        if order.isPaid:
            return Response({'detail': 'This order is already being paid.'}, status=status.HTTP_400_BAD_REQUEST)
        elif order.stripe_session_id and check_session(order.stripe_session_id):
            return redirect(reverse('base:pay-order', kwargs={'pk': order.pk}))

        try:
            if settings.DEBUG:
                success_url = f'http://localhost:3000/order/{order._id}/'
            else:
                success_url = reverse('base:pay-order', kwargs={'pk': order.pk})

            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        "price_data": {
                            "unit_amount": int(order.totalPrice * 100),
                            "currency": "usd",
                            "product_data": {'name': 'Buy Receipt From ZagrosShop'},
                        },
                        "quantity": 1,
                    }
                ],
                mode='payment',
                success_url=success_url,
                cancel_url=success_url,
            )
            order.stripe_session_id = checkout_session.id
            order.save()

            return Response({'stripe_checkout_url': checkout_session.url})

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Order.DoesNotExist:
        return Response({'detail': 'This order does not exist.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        product.delete()
        return Response({'detail': 'delete was successful'})
    except Product.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view()
@permission_classes([IsAdminUser])
def update_order_to_delivered(request, pk):
    try:
        order = Order.objects.get(pk=pk)
        order.make_delivered()
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_review(request, pk):
    user = request.user
    data = request.data
    try:
        product = Product.objects.get(pk=pk)
        review = product.review_set.filter(user=user)
        if review.exists():
            return Response(
                {'detail': 'product already reviewed.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if data.get('rating') == 0:
            return Response(
                {'detail': 'please select a rating.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=int(data['rating']),
            comment=data['comment']
        )
        product.update_rating_reviews()
        return Response('review added')

    except Product.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
