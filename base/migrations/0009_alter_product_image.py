# Generated by Django 4.0.4 on 2022-06-06 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='static/images/resolution.jpg', null=True, upload_to='image/'),
        ),
    ]