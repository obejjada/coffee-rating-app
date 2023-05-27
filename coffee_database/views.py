from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from .models import CoffeeDatabase


def database_return(request):
    '''Method to return the entire entries in the database'''
    database_entries = CoffeeDatabase.objects.values()
    template = loader.get_template("coffee_database/all-records.html")
    complete_entries = []
    for index in range(len(database_entries)):
        context = {"Date": database_entries[index].get("date_time"),
                   "coffee_shop": database_entries[index].get("coffee_shop"),
                   "coffee_beverage": database_entries[index].get(
                   "coffee_beverage"),
                   "rating": database_entries[index].get("rating")}
        complete_entries.append(context)
    coffee_dict = {"all_records": complete_entries}
    return HttpResponse(template.render(coffee_dict, request))


def submit_form(request):
    '''Method that displays the entry form to the database'''
    template = "coffee_database/coffee-entry.html"
    return render(request, template)
