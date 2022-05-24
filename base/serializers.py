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

from django.contrib.auth.forms import UserCreationForm
class UserRegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=200)
    password1 = serializers.CharField(style={'input_type': 'password'})
    password2 = serializers.CharField(style={'input_type': 'password'})

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError('this username already exists')
        return username

    def validate(self, attrs):
        password2 = attrs.get('password2')
        password1 = attrs.get('password1')
        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError('The two password fields did not match')

        try:
            password_validation.validate_password(password2)
        except ValidationError as exc:
            raise serializers.ValidationError(exc.messages)
        return attrs

    def create(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password1')
        return User.objects.create_user(username=username, password=password)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
