from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.utils import timezone
from django.shortcuts import redirect
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
                   "rating": database_entries[index].get("rating"),
                   "id": database_entries[index].get("id")}
        complete_entries.append(context)
    coffee_dict = {"all_records": complete_entries}
    return HttpResponse(template.render(coffee_dict, request))


def submit_form(request):
    '''Method that displays the entry form to the database'''
    template = "coffee_database/coffee-entry.html"
    return render(request, template)


def submit_record(request):
    '''Method to add record to the database'''
    entry = CoffeeDatabase(date_time=timezone.now(), coffee_shop=request.POST['coffee_shop']
                           .title(), coffee_beverage=request.POST['coffee_beverage'].title(),
                           rating=request.POST['rating'])
    entry.save()
    response = redirect('/coffee_database/all-records')
    return response


def delete_entry(request):
    '''Method to delete selected records from the database'''
    for checked in request.POST.getlist('checkbox'):
        entry = CoffeeDatabase.objects.get(id=checked)
        entry.delete()
    response = redirect('/coffee_database/all-records')
    return response
