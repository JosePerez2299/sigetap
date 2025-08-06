from django.contrib.auth import get_user_model
from rest_framework import serializers
from core.users.models import Unidad
from core.users.serializers import UserSerializer
from .models import Proyecto, Tablero
from core.tareas.serializers import TareaSerializer
from core.users.serializers import UnidadSerializer
User = get_user_model()


class ProyectoSerializer(serializers.ModelSerializer):
    # Campos calculados de solo lectura
    tareas_total = serializers.IntegerField(read_only=True)
    tareas_completadas = serializers.IntegerField(read_only=True)
    tareas_pendientes = serializers.IntegerField(read_only=True)
    
    # Para GET: mostramos objetos completos
    lider = UserSerializer(read_only=True)
    unidad_responsable = UnidadSerializer(read_only=True)
    estado = serializers.ChoiceField( choices=Proyecto.Estado.choices, help_text="Estado del proyecto")
    
    # Para POST/PUT: mismo nombre, solo acepta IDs
    lider_id= serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        write_only=True,
        help_text="ID del líder del proyecto"
    )
    unidad_responsable_id = serializers.PrimaryKeyRelatedField(
        queryset=Unidad.objects.all(), 
        write_only=True,
        help_text="ID de la unidad responsable"
    )


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
            'unidad_responsable_id',
            'lider',
            'lider_id',
            'lider',
        ]

    

class ProyectoPaginatedResponseSerializer(serializers.Serializer):
    """Serializer para documentar la respuesta paginada de Proyecto"""
    count = serializers.IntegerField(help_text="Total de elementos")
    total_pages = serializers.IntegerField(help_text="Total de páginas")
    current_page = serializers.IntegerField(help_text="Página actual")
    page_size = serializers.IntegerField(help_text="Elementos por página")
    data = ProyectoSerializer(many=True, help_text="Lista de proyectos")


class TableroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tablero  # Accede al modelo intermedio
        fields = ['id', 'nombre', 'proyecto', 'icono', 'color_fondo']
        read_only_fields = ['id']
