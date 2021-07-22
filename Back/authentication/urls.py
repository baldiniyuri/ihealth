from django.urls import path
from .views import UserView, LoginView, ProtectedView

urlpatterns = [
    path('register/', UserView.as_view()),
    path('login/', LoginView.as_view()),
    path('protected/', ProtectedView.as_view())
]