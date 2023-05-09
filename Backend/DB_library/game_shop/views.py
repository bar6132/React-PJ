from rest_framework import status
from django.contrib.auth import get_user_model
from django.http import JsonResponse, Http404
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Game, OldSchool, UserProfile
from .serializers import GameSerializer, OldSchoolSerializer, UserProfileSerializer, UserSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken.views import ObtainAuthToken

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def my_view(request):
    user = request.user
    response_data = {
        'username': user.username,
    }
    return Response(response_data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def get_user_data(request):
    user = request.user
    user_profile = UserProfile.objects.get(user=user)
    user_data = {
        'username': user.username,
    }
    response_data = {
        'user': user_data,
        'email': user.email,
        'location': user_profile.location,
        'age': user_profile.age,
        'phone': user_profile.phone
    }
    return Response(response_data)

# @api_view(['POST'])
# def obtain_token_view(request):
#     # Call the built-in obtain_auth_token view to get the token
#     response = obtain_auth_token(request)
#     # Get the user object using the token from the response
#     token_value = response.data['token']
#     token = Token.objects.get(key=token_value)
#     user = token.user
#     # Customize the response data with additional user information
#     user_dict = {
#         'username': user.username,
#         'email': user.email,
#         'first_name': user.first_name,
#         'last_name': user.last_name,
#         'is_staff': user.is_staff,
#         'date_joined': user.date_joined.strftime('%Y-%m-%d %H:%M:%S')
#     }
#     # Update the response data with the custom user data
#     response.data.update({'user': user_dict})
#     return response


# def obtain_token_view(request):
#     return obtain_auth_token(request)

# @api_view(['POST'])
# def obtain_token_view(request):
#     response = obtain_auth_token(request)
#     # Get user object for authenticated user using token from response
#     user = Token.objects.get(key=response.data['token']).user
#     # Add user data to response and return
#     print(response.data)
#     return Response({
#         'user': {
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name
#         },
#         'token': response.data['token']
#     })

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

# @api_view(['GET'])
# def get_pp(request):
#     P = User.objects.all()
#     serializer = UserSerializer(P, many=True)
#     return Response(serializer.data)
#

User = get_user_model()

@csrf_exempt
@api_view(['POST'])
def signup(request):
    # Get data from request
    username = request.data.get("username", None)
    password = request.data.get("password", None)
    email = request.data.get("email", None)
    location = request.data.get('location', None)
    age = request.data.get('age', None)
    phone = request.data.get('phone', None)

    if not username or not password:
        return Response({'error': 'Missing required fields'}, status=400)

    try:
        user = User.objects.create_user(username=username, password=password, email=email)
    except IntegrityError:
        return Response({'error': 'Username already exists'}, status=400)

    user_profile = UserProfile.objects.create(user=user, location=location, age=age, phone=phone)

    token, created = Token.objects.get_or_create(user=user)

    data = {
        "message": f"New user created with ID: {user.id}",
        "token": token.key,
        'username' : username,
        "user": {
            "id": user.id,
            "email": user.email,
            "username": username,
            "profile": {
                "location": location,
                "age": age,
                "phone": phone,
            }
        }
    }
    return Response(data, status=201)


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
            # set the game's uploader to be the current user
            serializer.validated_data['uploader_id'] = request.user.id
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

@api_view(['POST', 'GET'])
def getPs5(request):    
    if request.method == "GET":
        game = Game.objects.filter(consol='PS5')
        serializer = GameSerializer(game, many=True)
        return Response(serializer)
