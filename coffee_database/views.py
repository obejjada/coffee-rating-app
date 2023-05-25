from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.forms.models import model_to_dict
from .models import CoffeeDatabase


def database_return(request):
    '''Method to return the entire entries in the database'''
    database_entries = CoffeeDatabase.objects.values()
    template = loader.get_template("coffee_database/all-records.html")

    for query in database_entries:
        date = database_entries[0].get("date_time")
        coffee_shop = database_entries[0].get("coffee_shop")
        coffee_beverage = database_entries[0].get("coffee_beverage")
        rating = database_entries[0].get("rating")
    context = {"Date": date, "coffee_shop": coffee_shop,
               "coffee_beverage": coffee_beverage, "rating": rating}
    return HttpResponse(template.render(context, request))
