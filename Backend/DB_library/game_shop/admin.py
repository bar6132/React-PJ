from django.contrib import admin

from .models import UserProfile, Game, ContactMsg

admin.site.register(UserProfile)
admin.site.register(Game)
admin.site.register(ContactMsg)

