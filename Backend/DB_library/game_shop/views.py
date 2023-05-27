from rest_framework import status
from django.db import IntegrityError
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Game, UserProfile, ContactMsg
from .serializers import GameSerializer, UserProfileSerializer, ContactMsgSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def my_view(request):
    user = request.user
    response_data = {
        'username': user.username,
    }
    return Response(response_data)


@api_view(['GET', 'PATCH', 'DELETE'])
@authentication_classes([TokenAuthentication])
def manage_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        user_data = []
        for user in users:
            user_data.append({
                'id': user.id,
                'username': user.username,
                'is_superuser': user.is_superuser,
            })
        return Response(user_data)

    if request.method == 'PATCH':
        user_id = request.data.get('user_id')
        is_superuser = request.data.get('is_superuser')

        try:
            user = User.objects.get(id=user_id)
            user.is_superuser = is_superuser
            user.save()
            return Response({'message': 'Superuser status updated successfully.'})
        except User.DoesNotExist:
            return Response({'message': 'User not found.'}, status=404)

    if request.method == 'DELETE':
        user_id = request.data.get('user_id')

        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({'message': 'User deleted successfully.'})
        except User.DoesNotExist:
            return Response({'message': 'User not found.'}, status=404)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def get_user_data(request):
    user = request.user
    user_profile = UserProfile.objects.get(user=user)
    user_data = {
        'username': user.username,
        'is_superuser': user.is_superuser,
    }
    response_data = {
        'user': user_data,
        'id': user_profile.id,
        'email': user_profile.email,
        'location': user_profile.location,
        'age': user_profile.age,
        'phone': user_profile.phone,
    }
    return Response(response_data)


@api_view(['GET', 'PUT'])
def get_profile(request, pk):
    try:
        profile = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)


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

    UserProfile.objects.create(user=user, location=location, age=age, phone=phone, email=email)

    token, created = Token.objects.get_or_create(user=user)

    data = {
        "message": f"New user created with ID: {user.id}",
        "token": token.key,
        'username': username,
        "user": {
            "id": user.id,
            "username": username,
            "profile": {
                "location": location,
                "age": age,
                "phone": phone,
                "email": email,
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
            g = Game.objects.all()
            serializer = GameSerializer(g, many=True)
            return Response(serializer.data)
        else:
            g = Game.objects.get(pk=pk)
            serializer = GameSerializer(g)
            return Response(serializer.data)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
def game(request, pk=None):

    if request.method == 'GET':
        if pk is None:
            g = Game.objects.all()
            serializer = GameSerializer(g, many=True)
            return Response(serializer.data)
        else:
            g = Game.objects.get(pk=pk)
            serializer = GameSerializer(g)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            uploader = UserProfile.objects.get(user=request.user)
            serializer.save(uploader=uploader)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            error_message = serializer.errors
            print(f"Error adding game: {error_message}")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if pk is not None:
            g = Game.objects.get(pk=pk)
            serializer = GameSerializer(g, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Please provide a valid ID."}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if pk is not None:
            g = Game.objects.get(pk=pk)
            g.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Please provide a valid ID."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PATCH'])
def inbox(request, pk=None):
    if request.method == 'GET':
        if pk is not None:
            try:
                note = ContactMsg.objects.get(pk=pk)
                serializer = ContactMsgSerializer(note)
                return Response(serializer.data)
            except ContactMsg.DoesNotExist:
                return Response({'error': 'Message not found.'}, status=404)
        else:
            notes = ContactMsg.objects.all()
            serializer = ContactMsgSerializer(notes, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data.copy()
        data['status'] = 'in_progress'  # Set the status to 'In Progress'
        serializer = ContactMsgSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    elif request.method == 'PATCH':
        if pk is not None:
            try:
                note = ContactMsg.objects.get(pk=pk)
                note.status = 'completed'
                note.save()
                serializer = ContactMsgSerializer(note)
                return Response(serializer.data)
            except ContactMsg.DoesNotExist:
                return Response({'error': 'Message not found.'}, status=404)
        else:
            return Response({'error': 'Message ID (pk) is required for marking as completed.'}, status=400)

