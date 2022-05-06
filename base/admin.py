from django.contrib import admin
from .models import *


@admin.register(Product)
class ProductModelAdmin(admin.ModelAdmin):
    readonly_fields = 'createdAt',


admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(ShippingAddress)
