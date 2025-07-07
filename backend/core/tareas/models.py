from django.db import models

class Tarea(models.Model):
    class Estado(models.TextChoices):
        POR_HACER = 'Por hacer'
        EN_PROGRESO = 'En progreso'
        EN_REVISION = 'En revisión'
        COMPLETADA = 'Completada'
        RECHAZADA = 'Rechazada'


    class Prioridad(models.TextChoices):
        BAJA = 'Baja'
        BAJA_MEDIA = 'Baja media'
        MEDIA = 'Media'
        MEDIA_ALTA = 'Media alta'
        ALTA = 'Alta'
    
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    prioridad = models.CharField(max_length=20, choices=Prioridad.choices, default=Prioridad.BAJA)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.POR_HACER)
    comentarios = models.TextField()
    proyecto = models.ForeignKey("proyectos.Proyecto", related_name="tareas", on_delete=models.CASCADE)
    sup_tarea = models.ForeignKey("self", related_name="sub_tareas", on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = "Tarea"
        verbose_name_plural = "Tareas"