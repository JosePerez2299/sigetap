
# core/login/views.py - Vista del login
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from .serializers import GenericTokenObtainPairSerializer
from rest_framework.response import Response
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Vista para logout - NO necesita atributos en el body
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError


class LoginView(TokenObtainPairView):
    serializer_class = GenericTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        refresh_token = response.data.pop('refresh', None)
        
        if refresh_token:
            refresh_max_age = int(api_settings.REFRESH_TOKEN_LIFETIME.total_seconds())
            
            # Usando configuración del settings
            jwt_settings = getattr(settings, 'SIMPLE_JWT', {})
            
            response.set_cookie(
                key=jwt_settings.get('REFRESH_COOKIE_NAME', 'refresh_token'),
                value=refresh_token,
                max_age=refresh_max_age,
                path=jwt_settings.get('REFRESH_COOKIE_PATH', '/'),
                secure=jwt_settings.get('REFRESH_COOKIE_SECURE', False),
                httponly=jwt_settings.get('REFRESH_COOKIE_HTTP_ONLY', True),
                samesite=jwt_settings.get('REFRESH_COOKIE_SAMESITE', 'Lax'),
                domain=jwt_settings.get('REFRESH_COOKIE_DOMAIN', None),
            )
        
        return response


class RefreshTokenView(TokenRefreshView):

    
    def post(self, request, *args, **kwargs):
        # Obtenemos el refresh token de la cookie
        jwt_settings = getattr(settings, 'SIMPLE_JWT', {})
        cookie_name = jwt_settings.get('REFRESH_COOKIE_NAME', 'refresh_token')
        refresh_token = request.COOKIES.get(cookie_name)
        
        if not refresh_token:
            return Response(
                {'detail': 'Refresh token no encontrado en cookies'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            
            return Response({
                'access': access_token,
                'detail': 'Token actualizado exitosamente'
            })
            
        except TokenError as e:
            return Response(
                {'error': 'Refresh token inválido o expirado'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        """
        Logout que obtiene automáticamente los tokens de:
        - Refresh token: Cookie (automático)
        - Access token: Header Authorization (automático)
        
        NO necesita datos en el body del request
        """

        print(request)
        jwt_settings = getattr(settings, 'SIMPLE_JWT', {})
        cookie_name = jwt_settings.get('REFRESH_COOKIE_NAME', 'refresh_token')
        
        # Obtenemos el refresh token de la cookie (automático)
        refresh_token = request.COOKIES.get(cookie_name)
        
        # Obtenemos el access token del header Authorization (automático)
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        access_token = None
        if auth_header.startswith('Bearer '):
            access_token = auth_header.split(' ')[1]
        
        response = Response({
            'detail': 'Logout exitoso'
        }, status=status.HTTP_200_OK)
        
        # Invalidamos el refresh token si existe
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                pass  # Token ya inválido, no importa
        
        # Invalidamos el access token si existe
        if access_token:
            try:
                token = AccessToken(access_token)
                token.blacklist()
            except TokenError:
                pass  # Token ya inválido, no importa
        
        # Eliminamos la cookie del refresh token
        response.delete_cookie(
            key=cookie_name,
            path=jwt_settings.get('REFRESH_COOKIE_PATH', '/'),
            domain=jwt_settings.get('REFRESH_COOKIE_DOMAIN', None),
        )
        
        return response

# Versión si