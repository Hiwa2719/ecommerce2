from django.contrib.auth import get_user_model
from django.contrib.auth import password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product, Order, OrderItem, ShippingAddress

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    _id = serializers.SerializerMethodField()
    isAdmin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = 'id', '_id', 'username', 'email', 'name', 'isAdmin'

    def get_name(self, obj):
        return obj.first_name or obj.email

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff
    # def run_validation(self, data=empty):

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = 'id', '_id', 'username', 'email', 'name', 'isAdmin', 'token'

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class UserRegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    username = serializers.EmailField(max_length=200)
    password = serializers.CharField(style={'input_type': 'password'}, required=False)

    def validate_username(self, username):
        queryset = User.objects.filter(username=username)
        if self.instance:
            queryset = queryset.exclude(username=self.instance.username)
        if queryset.exists():
            raise serializers.ValidationError('this username already exists')
        return username

    def validate_password(self, password):
        try:
            password_validation.validate_password(password)
        except ValidationError as exc:
            raise serializers.ValidationError(exc.messages)
        return password

    def create(self, validated_data):
        name = validated_data.get('name')
        username = validated_data.get('username')
        password = validated_data.get('password')
        return User.objects.create_user(first_name=name, username=username, email=username, password=password)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('name')
        instance.username = validated_data.get('username')
        instance.email = validated_data.get('username')
        if validated_data.get('is_staff'):
            instance.is_staff = validated_data.get('is_staff')
        if validated_data.get('password') != '':
            instance.password = make_password(validated_data.get('password'))
        instance.save()
        return instance


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField()
    shippingAddress = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, order):
        items = order.orderitem_set.all()
        serializer = OrderItemsSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, order):
        try:
            shipping_address = order.shippingaddress
            data = ShippingAddressSerializer(shipping_address).data
        except:
            data = False
        return data

    def get_user(self, order):
        serializer = UserSerializer(order.user)
        return serializer.data
    

class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'
