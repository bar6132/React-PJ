from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.contrib.auth.models import User


urlpatterns = [
    path('signup', views.signup),
    path('obtain-token', obtain_auth_token),
    path('pp', views.get_pp),
    path('games/', views.games),
    path('games/<int:pk>', views.games),
    path('game/', views.game),
    path('game/<int:pk>', views.game),
    path('oldgames/', views.oldgames),
    path('oldgames/<int:pk>', views.oldgames),
    path('oldgame/<int:pk>', views.oldgame),
    path('oldgame/', views.oldgame)

]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
