from django.contrib import admin
from .models import Blog
from django.conf import settings

# Register your models here.
admin.site.register(Blog)
