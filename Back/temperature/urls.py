from django.urls import path
from .views import TemperatureView


urlpatterns = [
    path('temperature/<int:user_id>/', TemperatureView.as_view()),
    path("temperature?date=<date_time>", TemperatureView.as_view()),
]