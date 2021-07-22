from django.urls import path
from .views import PacientView


urlpatterns = [
    path('register/<int:user_id>/pacient/', PacientView.as_view()),
]