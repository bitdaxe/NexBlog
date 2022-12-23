from django.urls import path, include
from nextblog_app.api.views import GetBlogsView,CreateBlogsView

urlpatterns = [
    path('blogs/', GetBlogsView.as_view(), name="blogs"),
    path('create-blog/',CreateBlogsView.as_view(), name="create-blogs")
]
