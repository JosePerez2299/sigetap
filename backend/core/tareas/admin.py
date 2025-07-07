from django.contrib import admin
from .models import Tarea

# Register your models here.
@admin.register(Tarea)
class TareaAdmin(admin.ModelAdmin):
    list_display = ('id','titulo', 'estado', 'fecha_inicio', 'fecha_fin')
    list_filter = ('estado',)
    search_fields = ('titulo', 'descripcion')
