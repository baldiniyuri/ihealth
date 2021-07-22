from django.db import models
from authentication.models import User


class Pacient(models.Model):
    age = models.IntegerField()
    gender = models.CharField(max_length=255)
    imc = models.IntegerField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)