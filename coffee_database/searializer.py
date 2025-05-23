from rest_framework import serializers
from .models import CoffeeDatabase, CoffeeBeanDatabase, CoffeeOrigin, \
                                    FlavourNote


class CoffeeSerializer(serializers.ModelSerializer):
    formatted_datetime = serializers.DateTimeField(source='date_time',
                                                   format='%Y-%m-%d %H:%M:%S',
                                                   read_only=True)

    class Meta:
        model = CoffeeDatabase
        fields = ['id', 'formatted_datetime', 'coffee_shop',
                  'coffee_beverage', 'rating']


class CoffeeOriginSerializer(serializers.ModelSerializer):

    class Meta:
        model = CoffeeOrigin
        fields = ['id', 'country', 'country_name']


class CoffeeBeanSerializer(serializers.ModelSerializer):
    formatted_datetime = serializers.DateTimeField(source='date_time',
                                                   format='%Y-%m-%d %H:%M:%S',
                                                   read_only=True)

    country_origin = serializers.SlugRelatedField(
        many=True,
        queryset=CoffeeOrigin.objects.all(),
        slug_field="country_name",
    )

    flavour_notes = serializers.SlugRelatedField(
        many=True,
        queryset=FlavourNote.objects.all(),
        slug_field="flavour_notes"
    )

    class Meta:
        model = CoffeeBeanDatabase
        fields = ['id', 'formatted_datetime', 'roast_name', 'coffee_roaster',
                  'is_signle_origin', 'country_roaster', 'country_origin',
                  'region', 'flavour_notes', 'process', 'rating', 'comment']
