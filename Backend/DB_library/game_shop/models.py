from django.db import models
from django.contrib.auth.models import User


class Person(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    city = models.CharField(null=False, max_length=50)
    phone = models.PositiveIntegerField(null=False)
    user = models.OneToOneField(null=True, to=User, on_delete=models.CASCADE)

    class Meta:
        db_table = "Person"

    def __str__(self):
        return f"{self.user}\n" \
               f"{self.id}\n" \
               f"{self.phone}" \



class Game(models.Model):
    CONSOLE_CHOICES = (
        ('PS3', 'PS3'), ('PS4', 'PS4'), ('PS5', 'PS5'),
        ('Xbox 360', 'Xbox 360'), ('Xbox One', 'Xbox One'),
        ('Xbox Series X/S', 'Xbox Series X/S'), ('Nintendo Switch', 'Nintendo Switch'))
    
    console = models.CharField(max_length=15, choices=CONSOLE_CHOICES, null=False, blank=False)
    game_name = models.CharField(null=False, max_length=50)
    price = models.PositiveIntegerField(null=False)
    game_img = models.ImageField(null=True, blank=True, upload_to="images/")
    uploader = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = "Game"

    def __str__(self):
        return f"{self.console , self.game_name}"




class OldSchool(models.Model):
    CONSOLE_CHOICES = (
        ('PS2', 'PS2'), ('PS ONE', 'PS ONE'), ('Wii', 'Wii'), ('PSP', 'PSP'),
        ('Game Boy', 'Game Boy'), ('Atari', 'Atari'), ('Nintendo DS', 'Nintendo DS'),
        ('Xbox Original', 'Xbox Original'), ('PC', 'PC')
    )
    
    console = models.CharField(max_length=13, choices=CONSOLE_CHOICES, null=False, blank=False)
    game_name = models.CharField(null=False, max_length=50)
    price = models.PositiveIntegerField(null=False)
    game_img = models.ImageField(null=True, blank=True, upload_to="images/")
    uploader = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)   
    
    class Meta:
        db_table = "Old School"
    
    def __str__(self):
        return f"{self.console , self.game_name}"


def upload_path(instance, filename):
    return '/'.join(['game_img',str(instance.game_name), filename])