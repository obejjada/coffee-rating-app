from django.urls import path
from . import views


urlpatterns = [
    path("all-records", views.database_return, name="database_return"),
    path("coffee-entry", views.submit_form, name='submit_form'),
]
