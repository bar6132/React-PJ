# Generated by Django 4.2 on 2023-05-21 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game_shop', '0008_alter_game_console'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='game_type',
            field=models.CharField(choices=[('New', 'New'), ('Old', 'Old')], max_length=3),
        ),
    ]
