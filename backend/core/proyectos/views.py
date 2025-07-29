
from rest_framework import generics
from .models import Proyecto
from .serializers import ProyectoSerializer
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProyectoFilter
from .pagination import ProyectoPagination
from drf_spectacular.utils import OpenApiParameter

class ProyectoList(generics.ListAPIView):
    pagination_class = ProyectoPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProyectoFilter
    search_fields = ['nombre', 'lider__username'    ]
    ordering_fields = ['nombre', 'lider', 'unidad_responsable']
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

    


class ProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

