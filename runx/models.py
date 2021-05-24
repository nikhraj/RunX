from django.db import models

# Create your models here.

# python manage.py makemigrations
# python manage.py migrate

class database(models.Model):
    uid = models.CharField(max_length=100)
    lang = models.TextField()
    src = models.TextField()
    fname = models.TextField()