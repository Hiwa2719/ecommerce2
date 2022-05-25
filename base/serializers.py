from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError

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
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(style={'input_type': 'password'})

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
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
        return User.objects.create_user(first_name=name, username=username, password=password)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
