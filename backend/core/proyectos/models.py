from django.db import models

# Create your models here.
class Proyecto(models.Model):
    class Estado(models.TextChoices):
        PLANIFICADO = 'Planificado'
        EJECUCION = 'Ejecucion'
        PAUSADO = 'Pausado'
        FINALIZADO = 'Finalizado'

  
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.PLANIFICADO)
    
    # TO DO: Relacionar con la unidad responsable, lider y miembros
    unidad_responsable = models.ForeignKey("users.Unidad", verbose_name=("Unidad responsable"), on_delete=models.CASCADE)
    lider = models.ForeignKey("users.User", verbose_name=("Líder"), on_delete=models.CASCADE)

    # TO DO: Implementar codigo con prefijo PR , unico
    codigo = models.CharField(max_length=10, unique=True, auto_created=True)


    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"
    

class Tablero(models.Model):
    nombre = models.CharField(max_length=100)
    proyecto = models.ForeignKey(Proyecto, verbose_name=("Proyecto"), on_delete=models.CASCADE, related_name="tableros")
    icono = models.CharField(max_length=50, blank=True, null=True)  # Puedes usar una librería de iconos o simplemente almacenar el nombre del icono
    color_fondo = models.CharField(max_length=7, blank=True, null=True)  # Almacena el color en formato HEX, por ejemplo: #FFFFFF

    def __str__(self):
        return f"{self.nombre} - {self.proyecto.nombre}"
    
    class Meta:
        verbose_name = "Tablero"
        verbose_name_plural = "Tableros"
        ordering = ['nombre']


