from django.contrib.auth import get_user_model
from rest_framework import serializers
from core.users.serializers import UserSerializer
from .models import Proyecto

User = get_user_model()


class ProyectoSerializer(serializers.ModelSerializer):
    lider = UserSerializer(read_only=True)
    lider_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='lider', write_only=True
    )

    class Meta:
        model = Proyecto
        fields = [
            'id', 'nombre',
            'descripcion',
            'fecha_inicio',
            'fecha_fin',
            'estado',
            'unidad_responsable',
            'codigo',
            'lider',
            'lider_id',
        ]

class ProyectoPaginatedResponseSerializer(serializers.Serializer):
    """Serializer para documentar la respuesta paginada de Proyecto"""
    count = serializers.IntegerField(help_text="Total de elementos")
    total_pages = serializers.IntegerField(help_text="Total de páginas")
    current_page = serializers.IntegerField(help_text="Página actual")
    page_size = serializers.IntegerField(help_text="Elementos por página")
    data = ProyectoSerializer(many=True, help_text="Lista de proyectos")
