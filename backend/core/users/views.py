from django.shortcuts import render
from rest_framework import generics
from .serializers import UnidadTreeSerializer
from mptt.utils import get_cached_trees
from .models import Unidad
from rest_framework.exceptions import NotFound
# Create your views here
# 
#
class UserHierarchyView(generics.ListAPIView):
    serializer_class = UnidadTreeSerializer
    pagination_class = None

    def get_queryset(self):
        # 1) Obtengo el nodo raíz del subárbol
        codigo = self.kwargs['codigo']

        try:
            nodo = Unidad.objects.get(codigo=codigo)
        except Unidad.DoesNotExist:
            # Esta excepción se convierte en
            # HTTP 404 + {"detail": "…"}
            raise NotFound(detail=f"Unidad con código '{codigo}' no encontrada")
        
        # 2) Recupero él + todos sus descendientes, ordenados
        qs = nodo.get_descendants(include_self=True).order_by('tree_id', 'lft')

        # 3) MPTT agrupa en estructura padre→hijos
        return get_cached_trees(qs)