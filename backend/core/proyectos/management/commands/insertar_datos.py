from django.core.management.base import BaseCommand, CommandError
from core.proyectos.models import Proyecto
from django.utils import timezone
from datetime import timedelta
from core.users.models import User
from core.users.models import Unidad
import random

class Command(BaseCommand):
    help = 'Inserta datos de ejemplo en el modelo Proyecto'

    def add_arguments(self, parser):
        # Ejemplo: permitir pasar un número de inserciones
        parser.add_argument(
            '--cantidad',
            type=int,
            default=5,
            help='Número de instancias de Proyecto a crear',
        )

    def handle(self, *args, **options):
        cantidad = options['cantidad']
        creados = 0

        lider = User.objects.first()
        unidad = Unidad.objects.first()
        for i in range(cantidad):
            nombre = f"Proyecto automático {i}"
            descripcion = "Descripción generada automáticamente."
            
            # Evitar duplicados: chequeamos si ya existe
            if Proyecto.objects.filter(nombre=nombre).exists():
                self.stdout.write(self.style.WARNING(f'Ya existe: {nombre}'))
                continue

            proyecto = Proyecto.objects.create(
                nombre=nombre,
                descripcion=descripcion,
                fecha_inicio=timezone.now(),
                fecha_fin=timezone.now() + timedelta(days=30),
                unidad_responsable=unidad,
                lider=lider,
                codigo=f"PR-COD-{i}",
                estado=random.choice([Proyecto.Estado.PLANIFICADO, Proyecto.Estado.EJECUCION, Proyecto.Estado.PAUSADO, Proyecto.Estado.FINALIZADO]),
            )
            creados += 1
            self.stdout.write(self.style.SUCCESS(f'Creado: {proyecto.nombre} (id={proyecto.pk})'))

        self.stdout.write(self.style.NOTICE(f'Total creados: {creados}'))
