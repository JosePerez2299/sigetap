from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Unidad
User = get_user_model()


class UnidadSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField()
    codigo = serializers.CharField()

    class Meta:
        model = Unidad
        fields = ['id', 'nombre', 'codigo']

class UserSerializer(serializers.ModelSerializer):
    unidad = UnidadSerializer()
    class Meta: 
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'p00', 
                   'unidad', 'nom_coordinacion', 'nom_departamento']
        read_only_fields = ['id']  # Make 'id' read-only if you don't want it to be editable
    

class UnidadTreeSerializer(serializers.ModelSerializer):
    hijos = serializers.SerializerMethodField()

    class Meta:
        model = Unidad
        fields = ['id', 'nombre', 'codigo', 'hijos']

    def get_hijos(self, obj):
        children = obj.get_children()
        return UnidadTreeSerializer(children, many=True).data
