# Generated by Django 4.2 on 2023-06-12 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game_shop', '0030_delete_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='content',
            field=models.TextField(max_length=15),
        ),
        migrations.AlterField(
            model_name='message',
            name='sender',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='message',
            name='subject',
            field=models.CharField(max_length=20),
        ),
    ]
