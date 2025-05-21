from django.urls import path
from . import views


urlpatterns = [
     path("api/coffee_drinks/all/", views.get_all_coffee_drinks,
          name='get_all_coffee_drinks'),
     path("api/coffee_drinks/create/", views.create_new_entry,
          name='create_new_entry'),
     path("api/coffee_drinks/update/<str:pk>/", views.update_entry,
          name='update_entry'),
     path("api/coffee_drinks/delete/<str:pk>/", views.delete_entry,
          name='delete_entry'),
     path("api/coffee_beans/all/", views.get_all_coffee_beans,
          name='get_all_coffee_beans')
]
