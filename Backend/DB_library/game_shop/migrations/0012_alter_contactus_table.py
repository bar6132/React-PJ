# Generated by Django 4.2 on 2023-05-23 05:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game_shop', '0011_alter_contactus_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='contactus',
            table='Mail',
        ),
    ]