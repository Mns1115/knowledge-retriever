
from urllib.parse import urlencode
from rest_framework import serializers
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from .mixins import PublicApiMixin, ApiErrorsMixin,ApiAuthMixin
from .utils import google_get_access_token, google_get_user_info, generate_tokens_for_user
from .models import User
from rest_framework import status
from .serializers import UserSerializer
import jwt
class Dummy( ApiErrorsMixin, APIView):
    def post(self, request, *args, **kwargs):
        
        access= (request.headers['Authorization'].split(' '))[1]
        print("Entered dummy post request\n")
        print(access)
        # user= google_get_user_info(access_token=access)
        decoded = jwt.decode(access,algorithms=['HS256'], options={"verify_signature": False}) # works in PyJWT >= v2.0
        print (decoded)
        print (decoded["user_id"])
        details= User.objects.get(id=int(decoded["user_id"]))
        print(details)
        return Response(request.POST, status=status.HTTP_200_OK)


class GoogleLoginApi(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        print("Entered get method")
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')

        login_url = f'{settings.BASE_FRONTEND_URL}/auth'
    
        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        redirect_uri = 'http://localhost:3000/'
        print("Code"+code+"\nredirect url:"+redirect_uri)
        access_token = google_get_access_token(code=code, 
                                               redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)
        print(user_data)
        try:
            user = User.objects.get(email=user_data['email'])
            access_token, refresh_token = generate_tokens_for_user(user)
            response_data = {
                'user': UserSerializer(user).data,
                'access_token': str(access_token),
                'refresh_token': str(refresh_token),
                'profile':str(user_data['picture'])
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            # username = user_data['email'].split('@')[0]
            first_name = user_data.get('given_name', '')
            last_name = user_data.get('family_name', '')
            print("email:",user_data['email'],"\nfirst_name",first_name)
            user = User.objects.create(
                email=user_data['email'],
                first_name=first_name,
                last_name=last_name,
                registration_method='google'
            )
            
            access_token, refresh_token = generate_tokens_for_user(user)
            response_data = {
                'user': UserSerializer(user).data,
                'access_token': str(access_token),
                'refresh_token': str(refresh_token)
            }
            return Response(response_data, status=status.HTTP_200_OK)
