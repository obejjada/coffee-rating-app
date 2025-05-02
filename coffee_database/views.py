from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import CoffeeDatabase
from .searializer import CoffeeSerializer


@api_view(['GET'])
def get_all_coffee_drinks(request):
    ''' api endpoint for returning a JSON object with all the entries in the
    database'''
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
