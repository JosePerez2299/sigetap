from django.db import models

# Create your models here.
class Proyecto(models.Model):
    class Estado(models.TextChoices):
        PLANIFICADO = 'Planificado'
        EJECUCION = 'Ejecución'
        PAUSADO = 'Pausado'
        FINALIZADO = 'Finalizado'

  
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.PLANIFICADO)
    
    # TO DO: Relacionar con la unidad responsable, lider y miembros
    unidad_responsable = models.CharField(max_length=100) 
    lider = models.ForeignKey("users.User", verbose_name=("Líder"), on_delete=models.CASCADE)

    # TO DO: Implementar codigo con prefijo PR , unico
    codigo = models.CharField(max_length=10, unique=True, auto_created=True)


    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"
    