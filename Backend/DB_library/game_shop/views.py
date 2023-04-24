from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import (api_view, authentication_classes, permission_classes)
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.admin import User
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer


@api_view(['POST'])
def signup(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email", None)
    user = User.objects.create_user(username=username, password=password, email=email)
    return Response(f"new user created. id: {user.id}")



@api_view(['GET'])
def get_ps_games(request):
    """
    Get all games
    """
    G = Game.objects.all()
    serializer = GameSerializer(G, many=True)
    return Response(serializer.data)
