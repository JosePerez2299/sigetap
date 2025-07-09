from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'p00', 
                  'nom_gerencia_general', 'nom_unidad', 'nom_unidad_reporta', 
                  'nom_coordinacion', 'nom_departamento']
          # Adjust fields as necessary
        read_only_fields = ['id']  # Make 'id' read-only if you don't want it to be editable
    