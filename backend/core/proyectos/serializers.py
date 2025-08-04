from django.contrib.auth import get_user_model
from rest_framework import serializers
from core.users.serializers import UserSerializer
from .models import Proyecto
from core.tareas.serializers import TareaSerializer
from core.users.serializers import UnidadSerializer
User = get_user_model()


class ProyectoSerializer(serializers.ModelSerializer):
    lider = UserSerializer(read_only=True)

    tareas_total = serializers.IntegerField(read_only=True)
    tareas_completadas = serializers.IntegerField(read_only=True)
    tareas_pendientes = serializers.IntegerField(read_only=True)
    tareas = TareaSerializer(many=True, read_only=True)
    unidad_responsable = UnidadSerializer(read_only=True)

    class Meta:
        model = Proyecto
        fields = [
              'id', 
            'nombre',
            'codigo',
            'descripcion',
            'fecha_inicio',
            'fecha_fin',
            'estado',
            'tareas_total',
            'tareas_completadas',
            'tareas_pendientes',
            'unidad_responsable',
            'lider',
            'tareas',
        ]


class ProyectoPaginatedResponseSerializer(serializers.Serializer):
    """Serializer para documentar la respuesta paginada de Proyecto"""
    count = serializers.IntegerField(help_text="Total de elementos")
    total_pages = serializers.IntegerField(help_text="Total de páginas")
    current_page = serializers.IntegerField(help_text="Página actual")
    page_size = serializers.IntegerField(help_text="Elementos por página")
    data = ProyectoSerializer(many=True, help_text="Lista de proyectos")
