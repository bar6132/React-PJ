# Generated by Django 4.2 on 2023-05-19 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game_shop', '0007_alter_game_console'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='console',
            field=models.CharField(max_length=15),
        ),
    ]
