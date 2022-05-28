from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Product, Order, OrderItem, ShippingAddress
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
def get_user_profile(request):
    serializer = UserSerializer(request.user)
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
    products = Product.objects.all().order_by('-createdAt')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view()
def get_product(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


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
                return Response({'details': 'Product Not Found'}, status=status.HTTP_400_BAD_REQUEST)

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

    return Response({'details': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)


@api_view()
@permission_classes([IsAuthenticated])
def get_orders(request):
    orders = Order.objects.filter(user=request.user)
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
