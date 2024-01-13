from django.urls import path
from . import views, chat

urlpatterns = [
   path("auth/google/", views.GoogleLoginApi.as_view(), name="login-with-google"),
      path("newsession", chat.newSession.as_view(), name="new-session"),
      path("query", chat.query.as_view(),name="new-query"),
      path("gethistory", chat.gethistory.as_view(),name="getsessionmsgs"),
      path("dummy", views.Dummy.as_view(), name="dummy"),
]
