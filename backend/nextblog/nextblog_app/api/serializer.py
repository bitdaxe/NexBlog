from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from nextblog_app.models import Blog
from django.contrib.auth.models import User

class BlogSerializer(ModelSerializer):
    owner = serializers.StringRelatedField(default=serializers.CurrentUserDefault(), read_only=True)
    class Meta:
        model = Blog
        fields = "__all__"
        
