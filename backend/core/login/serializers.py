# users/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import exceptions
from rest_framework import serializers
from core.users.serializers import UserSerializer  # Assuming you have a UserSerializer defined


class LDAPTokenResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
    user = UserSerializer()
    

class LDAPTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # usando el método estándar para añadir claims extra si quieres
        token = super().get_token(user)
        token['es_lider'] = getattr(user, 'es_lider', False)
        return token

    def validate(self, attrs):
        # 'username' y 'password' vienen del payload
        user = authenticate(
            username=attrs['username'],
            password=attrs['password'],
        )
        if not user:
            raise exceptions.AuthenticationFailed('Credenciales inválidas', 'invalid_credentials')
        # continua con la generación del token
        data = super().validate(attrs)
        data['user'] = UserSerializer(user).data
        return data
