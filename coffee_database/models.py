from django.db import models
from django_countries.fields import CountryField


class CoffeeDatabase(models.Model):
    '''Class that will define the Coffee Rating App's database'''

    date_time = models.DateTimeField(auto_now_add=True)
    coffee_shop = models.TextField()
    coffee_beverage = models.CharField(max_length=300)
    rating = models.FloatField()


class CoffeeOrigin(models.Model):
    """Stores countries where coffee beans are grown."""
    country = CountryField(unique=True)
    country_name = models.CharField(max_length=300)

    def __str__(self):
        return self.country


class FlavourNote(models.Model):
    """Stores possible flavor notes of coffee."""
    flavour_notes = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.flavour_notes


class CoffeeBeanDatabase(models.Model):
    '''Stores Coffee Bean ratings'''
    date_time = models.DateTimeField(auto_now_add=True)
    roast_name = models.CharField(max_length=100)
    coffee_roaster = models.CharField(max_length=100)
    is_signle_origin = models.BooleanField(default=False)
    country_roaster = models.CharField(max_length=100)
    country_origin = models.ManyToManyField(CoffeeOrigin,
                                            related_name='countries')
    region = models.CharField(max_length=100)
    flavour_notes = models.ManyToManyField(FlavourNote,
                                           related_name='flavours')
    process = models.CharField(max_length=100)
    rating = models.FloatField()
    comment = models.CharField(max_length=500, default='')
