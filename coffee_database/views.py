from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import CoffeeDatabase, CoffeeBeanDatabase
from .searializer import CoffeeSerializer, CoffeeBeanSerializer


@api_view(['GET'])
def get_all_coffee_drinks(request):
    '''API that returns all objects in the coffee drink database'''
    items = CoffeeDatabase.objects.all()
    serializer = CoffeeSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_new_entry(request):
    '''API to create a new entry into the coffee drink database'''
    serializer = CoffeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_entry(request, pk):
    '''API to update entry in the coffee drink database'''
    entry = CoffeeDatabase.objects.get(id=pk)
    serializer = CoffeeSerializer(instance=entry, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_entry(request, pk):
    '''API to delete entry from coffee drink database'''
    entry = CoffeeDatabase.objects.get(id=pk)
    entry.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_all_coffee_beans(request):
    '''API that returns all objects in the coffee bean database'''
    items = CoffeeBeanDatabase.objects.all()
    serializer = CoffeeBeanSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_new_entry_beans(request):
    '''API to create a new entry into the coffee drink database'''
    serializer = CoffeeBeanSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)