from django.db import models


class CoffeeDatabase(models.Model):
    '''Class that will define the Coffee Rating App's database'''

    date_time = models.DateTimeField(auto_now_add=True)
    coffee_shop = models.TextField()
    coffee_beverage = models.CharField(max_length=300)
    rating = models.FloatField()
