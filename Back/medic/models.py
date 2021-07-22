from django.db import models
from authentication.models import User


class Medic(models.Model):
    crm = models.IntegerField(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)