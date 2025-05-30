# Generated by Django 4.2.1 on 2025-05-22 15:21

from django.db import migrations


def add_countries(apps, schema_editor):
    Country = apps.get_model('coffee_database', 'CoffeeOrigin')
    print(Country)
    from django_countries import countries

    for obj in Country.objects.all():
        code = obj.country  
        name = countries.name(code)
        obj.country_name = name
        obj.save()

class Migration(migrations.Migration):

    dependencies = [
        ('coffee_database', '0010_rename_name_coffeeorigin_country_name'),
    ]

    operations = [
        migrations.RunPython(add_countries),
    ]
