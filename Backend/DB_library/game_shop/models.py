from django.db import models
from django.contrib.auth.models import User



def upload_path(instance, filename):
    return '/'.join(['game_img',str(instance.game_name), filename])


# Create your models here.
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
        ('PS3', '1'),('PS4', '2'),('PS5', '3'),
        ('Xbox 360', '4'),('Xbox One', '5'),
        ('Xbox Series X/S', '6'),('Nintendo Switch', '7'),('PS4', '8'),
    )
    
    console = models.CharField(max_length=1, choices=CONSOLE_CHOICES, null=False, blank=False)
    game_name = models.CharField(null=False, max_length=50)
    price = models.PositiveIntegerField(null=False)
    game_img = models.ImageField(null=True, blank=True, upload_to=upload_path)
    uploader = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = "Game"

    def __str__(self):
        return f"{self.console + self.game_name}"



class OldSchool(models.Model):
    CONSOLE_CHOICES = (
        ('PS2', '1'),('PS ONE', '2'),('Wii', '3'),('PSP', '4'),
        ('Game Boy ', '5'),('Atari', '6'),('Nintendo DS', '7'),
        ('Xbox Original', '8'),('PC' , '9')
    )
    
    console = models.CharField(max_length=1, choices=CONSOLE_CHOICES, null=False, blank=False)
    game_name = models.CharField(null=False, max_length=50)
    price = models.PositiveIntegerField(null=False)
    game_img = models.ImageField(null=True, blank=True, upload_to=upload_path)
    uploader = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)   
    
    class Meta:
        db_table = "Old School"
    
    def __str__(self):
        return f"{self.console + self.game_name}"

