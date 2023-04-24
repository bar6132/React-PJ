from django.contrib import admin

from .models import Person, Game, OldSchool

admin.site.register(Person)
admin.site.register(Game)
admin.site.register(OldSchool)
