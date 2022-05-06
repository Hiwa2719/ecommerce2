from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


@api_view()
def get_routes(request):
    return Response('hello')


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
