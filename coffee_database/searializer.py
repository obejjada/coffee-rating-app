from rest_framework import serializers
from .models import CoffeeDatabase, CoffeeBeanDatabase


class CoffeeSerializer(serializers.ModelSerializer):
    formatted_datetime = serializers.DateTimeField(source='date_time',
                                                   format='%Y-%m-%d %H:%M:%S',
                                                   read_only=True)

    class Meta:
        model = CoffeeDatabase
        fields = ['id', 'formatted_datetime', 'coffee_shop',
                  'coffee_beverage', 'rating']


class CoffeeBeanSerializer(serializers.ModelSerializer):
    formatted_datetime = serializers.DateTimeField(source='date_time',
                                                   format='%Y-%m-%d %H:%M:%S',
                                                   read_only=True)

    class Meta:
        model = CoffeeBeanDatabase
        fields = ['id', 'formatted_datetime', 'roast_name', 'coffee_roaster'
                  'is_single_origin', 'country_roaster', 'country_origin'
                  'region', 'flavour_notes', 'process', 'rating', 'comment']
