# Create your views here.
from rest_framework import generics
from .models import Tarea
from .serializers import TareaSerializer

class TareaListCreate(generics.ListCreateAPIView):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

class TareaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer