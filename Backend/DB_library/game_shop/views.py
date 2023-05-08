from rest_framework import status
from django.http import JsonResponse, Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Game, OldSchool, Person
from .serializers import GameSerializer, OldSchoolSerializer, PersonSerializer, UserSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response



def obtain_token_view(request):
    return obtain_auth_token(request)

# @api_view(['POST'])
# def obtain_token_view(request):
#     response = obtain_auth_token(request)
#     user = Token.objects.get(key=response.data['token']).user
#     return Response({
#         'user': {
#             'id': user.id,
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name
#         },
#         'token': response.data['token']
#     })

@api_view(['GET'])
def get_pp(request):
    P = User.objects.all()
    serializer = UserSerializer(P, many=True)
    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def signup(request):
    try:
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email", None)
        user = User.objects.create_user(username=username, password=password, email=email)
        token, created = Token.objects.get_or_create(user=user)
        data = {
            "message": f"New user created with ID: {user.id}",
            "token": token.key,
            "username": username,
            "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": username,
                  }
        }
        return Response(data)
    except Exception as e:
        error = str(e)
        return Response({"error": error}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def games(request, pk=None):
    """
    Get all games or one only
    """
    if request.method == 'GET':
        if pk is None:
            G = Game.objects.all()
            O = OldSchool.objects.all()
            serializer = GameSerializer(G, many=True)
            Oserializer = OldSchoolSerializer(O, many=True)
            return Response(serializer.data + Oserializer.data)
        else:
            G = Game.objects.get(pk=pk)
            serializer = GameSerializer(G)
            return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def game(request, pk=None):
    """
    Get all games or one only
    """
    if request.method == 'GET':
        if pk is None:
            G = Game.objects.all()
            serializer = GameSerializer(G, many=True)
            return Response(serializer.data)
        else:
            G = Game.objects.get(pk=pk)
            serializer = GameSerializer(G)
            return Response(serializer.data)
    elif request.method == 'POST':
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        if pk is not None:
            G = Game.objects.get(pk=pk)
            serializer = GameSerializer(G, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Please provide a valid ID."}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if pk is not None:
            G = Game.objects.get(pk=pk)
            G.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Please provide a valid ID."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def oldgames(request, pk=None):
    """
    Get all games or one only
    """
    if request.method == 'GET':
        if pk is None:
            G = OldSchool.objects.all()
            serializer = OldSchoolSerializer(G, many=True)
            return Response(serializer.data)
        else:
            G = OldSchool.objects.get(pk=pk)
            serializer = OldSchoolSerializer(G)
            return Response(serializer.data)


@api_view(['GET','POST','PUT','DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def oldgame(request, pk=None):
    """
    Get all games or one only
    """
    if request.method == 'GET':
        if pk is None:
            G = OldSchool.objects.all()
            serializer = OldSchoolSerializer(G, many=True)
            return Response(serializer.data)
        else:
            G = OldSchool.objects.get(pk=pk)
            serializer = OldSchoolSerializer(G)
            return Response(serializer.data)
    elif request.method == 'POST':
        serializer = OldSchoolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        if pk is not None:
            G = OldSchool.objects.get(pk=pk)
            serializer = OldSchoolSerializer(G, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Please provide a valid ID."}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if pk is not None:
            G = OldSchool.objects.get(pk=pk)
            G.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Please provide a valid ID."}, status=status.HTTP_400_BAD_REQUEST)

