# Generated by Django 4.0.4 on 2022-06-06 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/images/resolution.jpg', null=True, upload_to='image/'),
        ),
    ]
