from rest_framework import serializers
from .models import User, ChatSession

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSession
        fields= ['file','isActive']
    