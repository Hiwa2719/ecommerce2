from django.shortcuts import render
from django.http import JsonResponse
from .products import products


def get_routes(request):
    return JsonResponse('hello', safe=False)


def get_products(request):
    return JsonResponse(products, safe=False)

