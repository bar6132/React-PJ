# Generated by Django 4.2 on 2023-06-12 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game_shop', '0035_alter_message_communication_way_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='communication_way',
        ),
        migrations.AddField(
            model_name='message',
            name='email',
            field=models.EmailField(default=1, max_length=254),
            preserve_default=False,
        ),
    ]
