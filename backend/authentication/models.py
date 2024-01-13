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

class ChatSession(models.Model):
    sessionID= models.BigAutoField(primary_key=True)
    userID= models.ForeignKey(User, on_delete= models.CASCADE)
    file= models.FileField(upload_to='./media')
    isActive= models.BooleanField()

class Chats(models.Model):
    msgID = models.BigAutoField(primary_key= True)
    msg= models.CharField(max_length=1000)
    query= models.CharField(max_length=1000)
    senderID= models.BigIntegerField()
    sessionID= models.ForeignKey(ChatSession,on_delete= models.CASCADE)
    time= models.TimeField(auto_now_add=True)
    mark= models.BooleanField(null=True)