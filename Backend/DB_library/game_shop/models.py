from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    location = models.CharField(null=False, max_length=50)
    age = models.PositiveIntegerField()
    phone = models.PositiveIntegerField(null=False)
    email = models.EmailField(null=False)
    user = models.OneToOneField(null=True, to=User, on_delete=models.CASCADE)

    class Meta:
        db_table = "User Profile"

    def __str__(self):
        return f"{self.user}\n"


class Game(models.Model):
    CONSOLE_CHOICES = [
        ('PS3', 'PS3'), ('PS4', 'PS4'), ('PS5', 'PS5'),
        ('Xbox 360', 'Xbox 360'), ('Xbox One', 'Xbox One'),
        ('Xbox Series X/S', 'Xbox Series X/S'), ('Nintendo Switch', 'Nintendo Switch'),
        ('PS2', 'PS2'), ('PS ONE', 'PS ONE'), ('Wii', 'Wii'), ('PSP', 'PSP'),
        ('Game Boy', 'Game Boy'), ('Atari', 'Atari'), ('Nintendo DS', 'Nintendo DS'),
        ('Xbox Original', 'Xbox Original'), ('PC', 'PC')
    ]

    GAME_TYPE_CHOICES = [
        ('New', 'New'),
        ('Old', 'Old'),
    ]

    game_type = models.CharField(max_length=3, choices=GAME_TYPE_CHOICES)
    console = models.CharField(max_length=15, null=False, blank=False)
    game_name = models.CharField(null=False, max_length=50)
    price = models.PositiveIntegerField(null=False)
    game_img = models.ImageField(null=True, blank=True, upload_to="images/")
    uploader = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = "Games"

    def __str__(self):
        return f"{self.game_type} - {self.console} - {self.game_name}"

