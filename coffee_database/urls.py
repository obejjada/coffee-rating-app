from django.urls import path
from . import views


urlpatterns = [
    path("all-records", views.database_return, name="database_return")
]
