from rest_framework import serializers
from .models import Game, UserProfile, User


# class OldSchoolSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OldSchool
#         fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

