from rest_framework import serializers
from .models import OldSchool, Game, Person , User


class OldSchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = OldSchool
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Person
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
                }

