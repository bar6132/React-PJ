# Generated by Django 4.1.7 on 2023-06-08 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game_shop', '0028_alter_images_background_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='images',
            name='name',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='images',
            name='background_img',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
