
from django_filters import rest_framework as filters
from .models import Proyecto
from core.users.models import User
class ProyectoFilter(filters.FilterSet):

    unidad_responsable = filters.CharFilter(field_name='unidad_responsable', lookup_expr='exact')
    class Meta:
        model = Proyecto
        fields = {
            'estado',
            'unidad_responsable',
            'lider',
        }
        


