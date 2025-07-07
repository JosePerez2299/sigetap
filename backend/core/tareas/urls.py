from django.urls import path
from .views import TareaListCreate, TareaDetail

urlpatterns = [
    path('', TareaListCreate.as_view(), name='tarea-list'),
    path('<int:pk>/', TareaDetail.as_view(), name='tarea-detail'),
]