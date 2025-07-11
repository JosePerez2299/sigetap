# users/auth_backends.py
import random
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

User = get_user_model()

# Credenciales dummy (usuario: contraseña)
DUMMY_USERS = {
    # Gerencias
    'ger1_ger1': 'password123',
    'ger2_ger2': 'password123',
    # Coordinaciones de GER001
    'coord1_ger1': 'password123',
    'coord2_ger1': 'password123',
    # Coordinaciones de GER002
    'coord1_ger2': 'password123',
    'coord2_ger2': 'password123',
    # Unidades de coord1_ger1
    'und1_coord1_ger1': 'password123',
    'und2_coord1_ger1': 'password123',
    # Unidades de coord2_ger1
    'und1_coord2_ger1': 'password123',
    'und2_coord2_ger1': 'password123',
    # Unidades de coord1_ger2
    'und1_coord1_ger2': 'password123',
    'und2_coord1_ger2': 'password123',
    # Unidades de coord2_ger2
    'und1_coord2_ger2': 'password123',
    'und2_coord2_ger2': 'password123',
}

# Datos que vendrían de LDAP
DATA_USERS = {
    # Gerencias (reportan a VP001)
    'ger1_ger1': {
        'email': 'ger1_ger1@example.com',
        'p00': '150001',
        'nom_gerencia_general': 'GER001',
        'nom_unidad': 'GER001',
        'nom_unidad_reporta': 'VP001',
    },
    'ger2_ger2': {
        'email': 'ger2_ger2@example.com',
        'p00': '150002',
        'nom_gerencia_general': 'GER002',
        'nom_unidad': 'GER002',
        'nom_unidad_reporta': 'VP001',
    },

    # Coordinaciones de GER001 (reportan a GER001)
    'coord1_ger1': {
        'email': 'coord1_ger1@example.com',
        'p00': '150003',
        'nom_gerencia_general': 'GER001',
        'nom_unidad': 'CD001',            # código de coordinación
        'nom_unidad_reporta': 'GER001',
    },
    'coord2_ger1': {
        'email': 'coord2_ger1@example.com',
        'p00': '150004',
        'nom_gerencia_general': 'GER001',
        'nom_unidad': 'CD002',
        'nom_unidad_reporta': 'GER001',
    },

    # Coordinaciones de GER002 (reportan a GER002)
    'coord1_ger2': {
        'email': 'coord1_ger2@example.com',
        'p00': '150005',
        'nom_gerencia_general': 'GER002',
        'nom_unidad': 'CD003',
        'nom_unidad_reporta': 'GER002',
    },
    'coord2_ger2': {
        'email': 'coord2_ger2@example.com',
        'p00': '150006',
        'nom_gerencia_general': 'GER002',
        'nom_unidad': 'CD004',
        'nom_unidad_reporta': 'GER002',
    },

    # Unidades de coord1_ger1 (reportan a CD001)
    'und1_coord1_ger1': {
        'email': 'und1_coord1_ger1@example.com',
        'p00': '150007',
        'nom_gerencia_general': 'GER001',
        'nom_unidad': 'UD001',
        'nom_unidad_reporta': 'CD001',
    },
    'und2_coord1_ger1': {
        'email': 'und2_coord1_ger1@example.com',
        'p00': '150008',
        'nom_gerencia_general': 'GER001',
        'nom_unidad': 'UD002',
        'nom_unidad_reporta': 'CD001',
    },

    # Unidades de coord2_ger1 (reportan a CD002)
    'und1_coord2_ger1': {
        'email': 'und1_coord2_ger1@example.com',
        'p00': '150009',
        'nom_gerencia_general': 'GER001',
        'nom_unidad': 'UD003',
        'nom_unidad_reporta': 'CD002',
    },
    'und2_coord2_ger1': {
        'email': 'und2_coord2_ger1@example.com',
        'p00': '150010',
        'nom_gerencia_general': 'GER001',
        'nom_unidad': 'UD004',
        'nom_unidad_reporta': 'CD002',
    },

    # Unidades de coord1_ger2 (reportan a CD003)
    'und1_coord1_ger2': {
        'email': 'und1_coord1_ger2@example.com',
        'p00': '150011',
        'nom_gerencia_general': 'GER002',
        'nom_unidad': 'UD005',
        'nom_unidad_reporta': 'CD003',
    },
    'und2_coord1_ger2': {
        'email': 'und2_coord1_ger2@example.com',
        'p00': '150012',
        'nom_gerencia_general': 'GER002',
        'nom_unidad': 'UD006',
        'nom_unidad_reporta': 'CD003',
    },

    # Unidades de coord2_ger2 (reportan a CD004)
    'und1_coord2_ger2': {
        'email': 'und1_coord2_ger2@example.com',
        'p00': '150013',
        'nom_gerencia_general': 'GER002',
        'nom_unidad': 'UD007',
        'nom_unidad_reporta': 'CD004',
    },
    'und2_coord2_ger2': {
        'email': 'und2_coord2_ger2@example.com',
        'p00': '150014',
        'nom_gerencia_general': 'GER002',
        'nom_unidad': 'UD008',
        'nom_unidad_reporta': 'CD004',
    },
}

class DummyLDAPBackend(BaseBackend):
    """
    Simula un servidor LDAP: comprueba credenciales en un dict,
    y crea el usuario en DB si no existe.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        """
        Autentica al usuario contra el diccionario dummy
        """
        # Validar que tenemos username y password
        if not username or not password:
            return None
            
        # Aquí iría tu llamada real a LDAP
        if username in DUMMY_USERS and DUMMY_USERS[username] == password:
            try:
                # Intentar obtener el usuario existente
                user = User.objects.get(username=username)
                
                # Actualizar datos del usuario en caso de que hayan cambiado
                user_data = DATA_USERS[username]
                user.email = user_data['email']
                user.p00 = user_data['p00']
                user.nom_gerencia_general = user_data['nom_gerencia_general']
                user.nom_unidad = user_data['nom_unidad']
                user.nom_unidad_reporta = user_data['nom_unidad_reporta']
                
                # Asegurar que el usuario esté activo
                user.is_active = True
                user.save()
                
                return user
                
            except User.DoesNotExist:
                # Crear nuevo usuario si no existe
                user_data = DATA_USERS[username]
                user = User.objects.create_user(
                    username=username,
                    email=user_data['email'],
                    p00=user_data['p00'],
                    nom_gerencia_general=user_data['nom_gerencia_general'],
                    nom_unidad=user_data['nom_unidad'],
                    nom_unidad_reporta=user_data['nom_unidad_reporta'],
                    is_active=True,  # Importante: activar el usuario
                )
                return user
        
        return None

    def get_user(self, user_id):
        """
        Obtiene el usuario por ID
        """
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
    
    def user_can_authenticate(self, user):
        """
        Verifica si el usuario puede autenticarse
        """
        return getattr(user, 'is_active', None)