from django.contrib import admin
from django.contrib.auth import get_user_model

# Register your models here.

User = get_user_model()

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """
    Admin interface para el modelo de usuario.
    """

    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_active')
    ordering = ('username',)

    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name')
        }),
        ('LDAP info', {
            'fields': ('nom_gerencia_general', 'nom_unidad', 'nom_unidad_reporta', 'nom_coordinacion', 'nom_departamento')
        }), 
        ('Contact info', {
            'fields': ('p00', 'telefono', 'email')
        }),
        ('Permissions', {
            'fields': ('is_staff', 'is_active', 'groups')
        }),
    )