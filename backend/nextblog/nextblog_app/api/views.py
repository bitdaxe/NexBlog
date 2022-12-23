from rest_framework import generics
from nextblog_app.models import Blog
from nextblog_app.api.serializer import BlogSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser


# get blogs for (home page)
class GetBlogsView(generics.ListAPIView):
    model = Blog
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    
# create blgos
class CreateBlogsView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    model = Blog
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    
    
    def perform_create(self, serializer):
        req = serializer.context['request']
        serializer.save(owner=req.user)
