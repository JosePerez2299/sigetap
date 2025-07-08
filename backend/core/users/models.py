from django.db import models
from django.contrib.auth.models import AbstractUser


# Utilidades para roles de usuario
class UserRole:
        ADMINISTRADOR = 'Administrador'
        GERENTE = 'Gerente'
        COORDINADOR = 'Coordinador'
        MIEMBRO = 'Miembro'
        LIDER = 'Lider'

# Create your models here.
class User(AbstractUser):
    """
    Modelo de usuario personalizado que extiende AbstractUser para incluir campos adicionales
    AbstractUser proporciona campos básicos como username, password, email, first_name, last_name,
    is_staff, is_active, date_joined, last_login, y otros campos relacionados con la autenticación y autorización de usuarios.
    """
    
    # Datos personales
    p00 = models.CharField(max_length=100,unique=True, null=True, help_text="Identificador único del usuario")
    telefono = models.CharField(max_length=15, blank=True, null=True)

    # Campos del LDAP
    nom_gerencia_general = models.CharField(max_length=100, blank=True, null=True)
    nom_unidad = models.CharField(max_length=100, blank=True, null=True)
    nom_unidad_reporta = models.CharField(max_length=100, blank=True, null=True)

    # Campos adicionales
    nom_coordinacion = models.CharField(max_length=100, blank=True, null=True)
    nom_departamento = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['username']

    def __str__(self):
        return self.get_full_name() or self.username
    
    @property
    def es_admin(self):
        return self.groups.filter(name=UserRole.ADMINISTRADOR).exists()
    @property
    def es_gerente(self):
        return self.groups.filter(name=UserRole.GERENTE).exists()
    @property
    def es_coordinador(self):
        return self.groups.filter(name=UserRole.COORDINADOR).exists()
    @property
    def es_miembro(self):
        return self.groups.filter(name=UserRole.MIEMBRO).exists()
    @property
    def es_lider(self):
        return self.groups.filter(name=UserRole.LIDER).exists()
