from django.db import models

class Tourist(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)




# Create your models here.
