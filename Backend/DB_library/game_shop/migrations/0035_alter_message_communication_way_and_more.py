# Generated by Django 4.2 on 2023-06-12 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game_shop', '0034_message_communication_way'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='communication_way',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='message',
            name='content',
            field=models.TextField(),
        ),
    ]
