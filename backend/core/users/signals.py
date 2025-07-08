from django.apps import apps
from django.db.models.signals import post_migrate
from django.contrib.auth.models import Group, Permission
from django.dispatch import receiver
from core.users.models import UserRole

@receiver(post_migrate)
def crear_grupos_roles(sender, **kwargs):
    if sender.name != "core.users":
        return
    
    roles = [
        {'nombre': UserRole.ADMINISTRADOR, 'perms': []}, 
        {'nombre': UserRole.GERENTE, 'perms': []}, 
        {'nombre': UserRole.COORDINADOR, 'perms': []}, 
        {'nombre': UserRole.MIEMBRO, 'perms': []},
        {'nombre': UserRole.LIDER, 'perms': []}

    ]
    for rol in roles:
        grupo, creado = Group.objects.get_or_create(name=rol['nombre'])
        for perm in rol['perms']:
            permiso = Permission.objects.get(codename=perm)
            grupo.permissions.add(permiso)

        
        # Asignar permisos específicos si es necesario
        # Ejemplo: permisos = Permission.objects.filter(codename__in=['add_tarea', 'change_tarea'])
        # grupo.permissions.set(permisos)
