from rest_framework import serializers
from .models import OldSchool, Game, Person


class OldSchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = OldSchool
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Person
        fields = '__all__'

