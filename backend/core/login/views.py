from django.shortcuts import render

# Create your views here.
# users/views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LDAPTokenObtainPairSerializer

class LoginView(TokenObtainPairView):
    """
    Recibe { "username": "...", "password": "..." }:
    - Valida contra LDAP ( por ahora data dummy).
    - Devuelve JSON { access: "...", refresh: "..." }.
    """
    serializer_class = LDAPTokenObtainPairSerializer
