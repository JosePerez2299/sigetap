from django.http import JsonResponse
from django.urls import path

urlpatterns = [
    path('login/',  lambda request: JsonResponse({"message": "Hello, World!"})),
]