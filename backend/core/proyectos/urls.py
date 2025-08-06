from django.urls import path
from .views import ProyectoList, ProyectoDetail, TableroCreate

urlpatterns = [
    path('', ProyectoList.as_view(), name='proyecto-list'),
    path('<int:pk>/', ProyectoDetail.as_view(), name='proyecto-detail'),

    path('tableros/', TableroCreate.as_view(), name='tablero-create'),  # Nueva ruta para crear tableros    
]