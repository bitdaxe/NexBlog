from django.urls import path, include
from nextblog_app.api.views import GetBlogsView,CreateBlogsView,GetBlogView, DeleteUpdateBlogView

urlpatterns = [
    path('blogs/', GetBlogsView.as_view(), name="blogs"),
    path('blog/<int:pk>', GetBlogView.as_view(), name='blog'),
    path('create-blog/',CreateBlogsView.as_view(), name="create-blogs"),
    path('blogdu/<int:pk>', DeleteUpdateBlogView.as_view(), name='delete-update-blog')
]
