from django.db import models


class CoffeeDatabase(models.Model):
    '''Class that will define the Coffee Rating App's database'''

    date_time = models.DateTimeField()
    coffee_shop = models.TextField()
    coffee_beverage = models.CharField(max_length=300)
    rating = models.FloatField()

    def __str__(self):
        return f"{self.date_time}, {self.coffee_shop}, {self.coffee_beverage},\
                 {self.rating}"
