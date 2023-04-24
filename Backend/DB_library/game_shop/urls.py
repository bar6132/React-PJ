from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static


from . import views
from django.contrib.auth.models import User

urlpatterns = [
    path('signup', views.signup),
    path('obtain-token', obtain_auth_token),
    path("games", views.get_ps_games),
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
