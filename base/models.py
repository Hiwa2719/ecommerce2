from datetime import datetime

import pytz
from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse

User = get_user_model()


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    brand = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='image/', blank=True, null=True, default='/image/resolution.jpg')
    category = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    numReviews = models.IntegerField(blank=True, null=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    countInStock = models.IntegerField(blank=True, null=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def get_absolute_url(self):
        return reverse('base:get_product', kwargs={'pk': self.pk})

    def __str__(self):
        return self.name or super().__str__()

    def update_rating_reviews(self):
        reviews = self.review_set.all()
        num_reviews = reviews.count()
        total = sum([review.rating for review in reviews])

        self.rating = total / num_reviews
        self.numReviews = num_reviews
        self.save()


class Review(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    rating = models.IntegerField(blank=True, null=True, default=0)
    comment = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, blank=True, null=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(blank=True, null=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    stripe_session_id = models.TextField(blank=True)

    def __str__(self):
        return str(self.createdAt)

    def make_paid(self):
        self.isPaid = True
        self.paidAt = datetime.now(tz=pytz.UTC)
        self.save()

    def make_delivered(self):
        self.isDelivered = True
        self.deliveredAt = datetime.now(tz=pytz.UTC)
        self.save()


class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    qty = models.IntegerField(default=0, blank=True, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    image = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name or ''


class ShippingAddress(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=200, blank=True, null=True)
    postalCode = models.CharField(max_length=200, blank=True, null=True)
    country = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.address or ''
