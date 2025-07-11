# users/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import exceptions
from rest_framework import serializers
from core.users.serializers import UserSerializer  # Assuming you have a UserSerializer defined

class GenericTokenResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
    user = UserSerializer()
    

class GenericTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # 'username' y 'password' vienen del payload
        user = authenticate(
            username=attrs['username'],
            password=attrs['password'],
        )
        if not user:
            raise exceptions.AuthenticationFailed('Credenciales inválidas')
        # continua con la generación del token
        data = super().validate(attrs)
        data['user'] = UserSerializer(user).data
        
        return data
