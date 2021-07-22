from django.urls import path
from .views import MedicView


urlpatterns = [
    path('register/<int:user_id>/medic/', MedicView.as_view()),
]