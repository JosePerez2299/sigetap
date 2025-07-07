from django.contrib import admin
from .models import Proyecto

# Register your models here.
@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('id','nombre', 'estado', 'fecha_inicio', 'fecha_fin')
    list_filter = ('estado',)
    search_fields = ('nombre', 'descripcion')
