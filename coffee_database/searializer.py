from rest_framework import serializers
from .models import CoffeeDatabase


class CoffeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeDatabase
        fields = '__all__'
