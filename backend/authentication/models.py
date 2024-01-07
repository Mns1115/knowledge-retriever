from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Add any additional fields you want in your custom user model
    # For example:
    username = None

    email = models.EmailField(max_length=250, unique=True, db_index=True)

    REGISTRATION_CHOICES = [
        ('email', 'Email'),
        ('google', 'Google'),
    ]
    registration_method = models.CharField(
        max_length=10,
        choices=REGISTRATION_CHOICES,
        default='email'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=[]
    def __str__(self):
       return self.email
   
