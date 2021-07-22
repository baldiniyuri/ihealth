from django.core.management.base import BaseCommand
from faker import Faker
import faker
from authentication.models import User
from glucose.models import Glucose
from pressure.models import BloodPressue
from temperature.models import Temperature
from historic.models import Historic
import random

class Command(BaseCommand):
    
    def PopulateBD(self, csvfile):

        fake = Faker()
        users = 1
        for users in range(1000):
            user = User.objects.get_or_create(
            id= users,
            username = "",
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            password = "123456",
            email = fake.free_email(),
            is_staff = False,
            is_superuser = True
            )
            print(user.___dict__)
            
                
 
          
         

