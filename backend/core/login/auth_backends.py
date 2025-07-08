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
        # Aquí iría tu llamada real a LDAP
        if username in DUMMY_USERS and DUMMY_USERS[username] == password:
            user, created = User.objects.get_or_create(username=username, defaults={
                'email': DATA_USERS[username]['email'],
                'p00':  DATA_USERS[username]['p00'],
                'nom_gerencia_general': DATA_USERS[username]['nom_gerencia_general'],
                'nom_unidad': DATA_USERS[username]['nom_unidad'],
                'nom_unidad_reporta': DATA_USERS[username]['nom_unidad_reporta'],
            })
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
            
