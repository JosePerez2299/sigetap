
from rest_framework import generics
from .models import Proyecto
from .serializers import ProyectoSerializer
from drf_spectacular.utils import extend_schema_view, extend_schema


class ProyectoListCreate(generics.ListCreateAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

class ProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

