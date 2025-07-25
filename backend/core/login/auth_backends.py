# users/auth_backends.py
import random
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.db.models.base import transaction
from core.users.models import Unidad
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
        'cod_unidad': 'GER001',
        'nom_unidad': 'Gerencia General I de Sistemas',
        'nom_unidad_reporta': 'VP001',
    },
    'ger2_ger2': {
        'email': 'ger2_ger2@example.com',
        'p00': '150002',
        'cod_unidad': 'GER002',
        'nom_unidad': 'Gerencia General II de Sistemas',
        'nom_unidad_reporta': 'VP001',
    },

    # Coordinaciones de GER001 (reportan a GER001)
    'coord1_ger1': {
        'email': 'coord1_ger1@example.com',
        'p00': '150003',
        'cod_unidad': 'CD001',
        # código de coordinación
        'nom_unidad': 'Coordinación 1 de Gerencia General I de Sistemas',
        'nom_unidad_reporta': 'GER001',
    },
    'coord2_ger1': {
        'email': 'coord2_ger1@example.com',
        'p00': '150004',
        'cod_unidad': 'CD002',
        'nom_unidad': 'Coordinación 2 de Gerencia General I de Sistemas',
        'nom_unidad_reporta': 'GER001',
    },

    # Coordinaciones de GER002 (reportan a GER002)
    'coord1_ger2': {
        'email': 'coord1_ger2@example.com',
        'p00': '150005',
        'cod_unidad': 'CD003',
        'nom_unidad': 'Coordinación 1 de Gerencia General II de Sistemas',
        'nom_unidad_reporta': 'GER002',
    },
    'coord2_ger2': {
        'email': 'coord2_ger2@example.com',
        'p00': '150006',
        'cod_unidad': 'CD004',
        'nom_unidad': 'Coordinación 2 de Gerencia General II de Sistemas',
        'nom_unidad_reporta': 'GER002',
    },

    # Unidades de coord1_ger1 (reportan a coord1_ger1CD001)
    'und1_coord1_ger1': {
        'email': 'und1_coord1_ger1@example.com',
        'p00': '150007',
        'cod_unidad': 'UD001',
        'nom_unidad': 'Unidad 1 de Coordinación 1 de Gerencia General I de Sistemas',
        'nom_unidad_reporta': 'CD001',
    },
    'und2_coord1_ger1': {
        'email': 'und2_coord1_ger1@example.com',
        'p00': '150008',
        'cod_unidad': 'UD002',
        'nom_unidad': 'Unidad 2 de Coordinación 1 de Gerencia General I de Sistemas',
        'nom_unidad_reporta': 'CD001',
    },

    # Unidades de coord2_ger1 (reportan a CD002)
    'und1_coord2_ger1': {
        'email': 'und1_coord2_ger1@example.com',
        'p00': '150009',
        'cod_unidad': 'UD003',
        'nom_unidad': 'Unidad 1 de Coordinación 2 de Gerencia General I de Sistemas',
        'nom_unidad_reporta': 'CD002',
    },
    'und2_coord2_ger1': {
        'email': 'und2_coord2_ger1@example.com',
        'p00': '150010',
        'cod_unidad': 'UD004',
        'nom_unidad': 'Unidad 2 de Coordinación 2 de Gerencia General I de Sistemas',
        'nom_unidad_reporta': 'CD002',
    },

    # Unidades de coord1_ger2 (reportan a CD003)
    'und1_coord1_ger2': {
        'email': 'und1_coord1_ger2@example.com',
        'p00': '150011',
        'cod_unidad': 'UD005',
        'nom_unidad': 'Unidad 1 de Coordinación 1 de Gerencia General II de Sistemas',
        'nom_unidad_reporta': 'CD003',
    },
    'und2_coord1_ger2': {
        'email': 'und2_coord1_ger2@example.com',
        'p00': '150012',
        'cod_unidad': 'UD006',
        'nom_unidad': 'Unidad 2 de Coordinación 1 de Gerencia General II de Sistemas',
        'nom_unidad_reporta': 'CD003',
    },

    # Unidades de coord2_ger2 (reportan a CD004)
    'und1_coord2_ger2': {
        'email': 'und1_coord2_ger2@example.com',
        'p00': '150013',
        'cod_unidad': 'UD007',
        'nom_unidad': 'Unidad 1 de Coordinación 2 de Gerencia General II de Sistemas',
        'nom_unidad_reporta': 'CD004',
    },
    'und2_coord2_ger2': {
        'email': 'und2_coord2_ger2@example.com',
        'p00': '150014',
        'cod_unidad': 'UD008',
        'nom_unidad': 'Unidad 2 de Coordinación 2 de Gerencia General II de Sistemas',
        'nom_unidad_reporta': 'CD004',
    },
}


class DummyLDAPBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if not username or not password:
            return None

        # Validación de credenciales dummy
        if DUMMY_USERS.get(username) != password:
            return None

        # Datos simulados de LDAP
        user_data = DATA_USERS[username]
        codigo_unidad = user_data['cod_unidad']
        codigo_reporte = user_data.get('nom_unidad_reporta')
        nombre_unidad = user_data['nom_unidad']


        # Creamos el usuario
        user = self.create_user(
            username=username,
            password=password,
            email=user_data['email'],
            p00=user_data['p00'],
            cod_unidad=codigo_unidad,
            nom_unidad=nombre_unidad,
            nom_unidad_reporta=codigo_reporte
        )
        return user

    def get_user(self, user_id):
        return User.objects.filter(pk=user_id).first()


    def create_user(self, username, password=None, email=None, p00=None, cod_unidad=None, nom_unidad=None, nom_unidad_reporta=None):
        padre, _ = Unidad.objects.get_or_create(codigo=nom_unidad_reporta, defaults={
                                             'nombre': nom_unidad_reporta, 'codigo': nom_unidad_reporta, 'parent': None})

        unidad, _ = Unidad.objects.update_or_create(codigo=cod_unidad, defaults={
                                             'nombre': nom_unidad, 'codigo': cod_unidad, 'parent': padre})
        try:
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                p00=p00,
                unidad=unidad,
                is_active=True
            )
            return user
        except Exception as e:
            print(e)
            return None
