from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)
    blog = models.TextField(max_length=5000)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)