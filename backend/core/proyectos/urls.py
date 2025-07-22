from django.urls import path
from .views import ProyectoList, ProyectoDetail

urlpatterns = [
    path('', ProyectoList.as_view(), name='proyecto-list'),
    path('<int:pk>/', ProyectoDetail.as_view(), name='proyecto-detail'),
]