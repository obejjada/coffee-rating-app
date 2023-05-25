from django.shortcuts import render
from django.http import HttpResponse
from .models import CoffeeDatabase


def database_return(request):
    '''Method to return the entire entries in the database'''
    database_entries = CoffeeDatabase.objects.all()
    output = []
    for item in database_entries:
        output.append(str(item))
    return HttpResponse(output)
