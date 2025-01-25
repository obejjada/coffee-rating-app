from django.urls import path
from . import views


urlpatterns = [
    path("home", views.home, name="home"),
    path("all-records", views.database_return, name="database_return"),
    path("coffee-entry", views.submit_form, name='submit_form'),
    path("coffee-entered", views.submit_record, name='submit_record'),
    path("delete-entry", views.delete_entry, name='delete_entry'),
    path("api/coffee_drinks/all/", views.get_all_coffee_drinks,
         name='get_all_coffee_drinks')
]
