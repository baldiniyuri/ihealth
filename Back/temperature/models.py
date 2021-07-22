from django.db import models
from authentication.models import User


class Temperature(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    temperature = models.FloatField()
    date_time = models.DateTimeField()
    
    class Meta:
        ordering = ['id']
        indexes = [ models.Index(fields=['date_time'])]