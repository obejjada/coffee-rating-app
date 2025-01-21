from rest_framework import serializers
from .models import CoffeeDatabase


class CoffeeSerializer(serializers.ModelSerializer):
    formatted_datetime = serializers.DateTimeField(source='date_time',
                                                   format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = CoffeeDatabase
        fields = ['id', 'formatted_datetime', 'coffee_shop',
                  'coffee_beverage', 'rating']
