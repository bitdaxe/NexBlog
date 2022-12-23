from rest_framework import generics
from django.contrib.auth.models import User
from .serializer import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    model = User
    serializer_class = RegisterSerializer