
from django.urls import path
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', lambda request: JsonResponse({'message': 'Logout View'})),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
