from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view()
def get_routes(request):
    return Response('hello')


@api_view()
def get_products(request):
    return Response(products)


@api_view()
def get_product(request, pk):
    product = None
    for item in products:
        if item['_id'] == str(pk):
            product = item
            break
    return Response(product)
