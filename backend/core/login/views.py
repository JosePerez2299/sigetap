from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LDAPTokenObtainPairSerializer, LDAPTokenResponseSerializer
from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model
from core.users.serializers import UserSerializer
User = get_user_model()

@extend_schema(
    request=LDAPTokenObtainPairSerializer,
    responses={200: LDAPTokenResponseSerializer},
    description="""
    Recibe JSON con username y password.
    Valida contra LDAP (dummy por ahora).
    Devuelve tokens JWT.
    """
)

class LoginView(TokenObtainPairView):
    """
    Recibe { "username": "...", "password": "..." }:
    - Valida contra LDAP ( por ahora data dummy, falta implementar).
    - Devuelve JSON { access: "...", refresh: "..." }
    .
    """
    serializer_class = LDAPTokenObtainPairSerializer
