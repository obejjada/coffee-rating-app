from django.shortcuts import render
from django.utils import timezone
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CoffeeDatabase
from .searializer import CoffeeSerializer
import requests


@api_view(['GET'])
def get_all_coffee_drinks(request):
    ''' api endpoint for returning a JSON object with all the entries in the
    database'''
    items = CoffeeDatabase.objects.all()
    serializer = CoffeeSerializer(items, many=True)
    return Response(serializer.data)


def home(request):
    '''Method to return the use to the home page'''
    template = "coffee_database/home.html"
    return render(request, template)


def database_return(request):
    '''Method to return the entire entries in the database using
       get_all_coffee_drinks API endpoint'''
    url = "http://127.0.0.1:8000/coffee_database/api/coffee_drinks/all/"
    response = requests.get(url)
    if response.status_code == 200:
        api_return = response.json()
    else:
        api_return = []
    template = "coffee_database/All-Coffee-Drinks.html"
    return render(request, template, {"api_return": api_return})


def submit_form(request):
    '''Method that displays the entry form to the database'''
    template = "coffee_database/Coffee-Drink-Entry-Form.html"
    return render(request, template)


def submit_record(request):
    '''Method to add record to the database'''
    entry = CoffeeDatabase(date_time=timezone.now(),
                           coffee_shop=request.POST['coffee_shop'].title(),
                           coffee_beverage=request.POST['coffee_beverage'].title(),
                           rating=request.POST['rating'])
    entry.save()
    response = redirect('/coffee_database/All-Coffee-Drinks')
    return response


def delete_entry(request):
    '''Method to delete selected records from the database'''
    for checked in request.POST.getlist('checkbox'):
        entry = CoffeeDatabase.objects.get(id=checked)
        entry.delete()
    response = redirect('/coffee_database/All-Coffee-Drinks')
    return response
