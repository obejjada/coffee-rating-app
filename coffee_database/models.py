from django.db import models
from django_countries.fields import CountryField


class CoffeeDatabase(models.Model):
    '''Class that will define the Coffee Rating App's database'''

    date_time = models.DateTimeField()
    coffee_shop = models.TextField()
    coffee_beverage = models.CharField(max_length=300)
    rating = models.FloatField()


class CoffeeOrigin(models.Model):
    """Stores countries where coffee beans are grown."""
    country = CountryField(unique=True)

    def __str__(self):
        return self.country


class FlavourNote(models.Model):
    """Stores possible flavor notes of coffee."""
    flavour_notes = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.flavour_notes
