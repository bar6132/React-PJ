# Generated by Django 4.2 on 2023-06-12 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game_shop', '0032_alter_message_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='content',
            field=models.TextField(max_length=20),
        ),
    ]
