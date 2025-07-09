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
