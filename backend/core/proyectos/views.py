
from rest_framework import generics
from .models import Proyecto
from .serializers import ProyectoSerializer, TableroSerializer
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProyectoFilter
from .pagination import ProyectoPagination
from drf_spectacular.utils import OpenApiParameter
from django.db.models import Count, Q


class ProyectoList(generics.ListCreateAPIView):
    pagination_class = ProyectoPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProyectoFilter
    search_fields = ['nombre', 'lider__username']
    ordering_fields = ['nombre', 'lider', 'unidad_responsable']
    serializer_class = ProyectoSerializer

    def get_queryset(self):
        qs = Proyecto.objects.all()
        qs = qs.select_related('lider', 'lider__unidad')
        qs = qs.select_related('unidad_responsable')
        qs = qs.annotate(
            tareas_total=Count('tareas'),
            tareas_completadas=Count(
                'tareas__estado', filter=Q(tareas__estado='Completado')),
            tareas_pendientes=Count(
                'tareas__estado', filter=Q(tareas__estado='Pendiente')),
        )

        return qs


class ProyectoDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

    def get_object(self):
        proyecto = super().get_object()
        proyecto.tareas_total = proyecto.tareas.count()
        proyecto.tareas_completadas = proyecto.tareas.filter(
            estado='Completado').count()
        proyecto.tareas_pendientes = proyecto.tareas.filter(
            estado='Pendiente').count()
        return proyecto


class TableroCreate(generics.CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = TableroSerializer
