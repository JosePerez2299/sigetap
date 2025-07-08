from django.urls import path
from .views import ProyectoListCreate, ProyectoDetail

urlpatterns = [
    path('', ProyectoListCreate.as_view(), name='proyecto-list'),
    path('<int:pk>/', ProyectoDetail.as_view(), name='proyecto-detail'),
]