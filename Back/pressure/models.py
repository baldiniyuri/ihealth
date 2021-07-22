from django.db import models
from django.db.models.fields import DateTimeField
from authentication.models import User


class BloodPressue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    systolic_level = models.IntegerField()
    diastolic_level = models.IntegerField()
    bpm = models.IntegerField()
    date_time = DateTimeField()