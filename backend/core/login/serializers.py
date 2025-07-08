# users/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import exceptions


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
        data['user'] = {
            'id': user.pk,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'p00': user.p00,
            'nom_gerencia_general': user.nom_gerencia_general,
            'nom_unidad': user.nom_unidad,
            'nom_unidad_reporta': user.nom_unidad_reporta,
            'nom_coordinacion': user.nom_coordinacion,
            'nom_departamento': user.nom_departamento,
        }
        return data
