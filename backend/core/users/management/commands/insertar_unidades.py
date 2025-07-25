from django.core.management.base import BaseCommand
from core.users.models import Unidad

class Command(BaseCommand):
    help = "Inserta una jerarquía de unidades para prueba"

    def handle(self, *args, **options):
        # Opcional: limpiar todo antes de insertar
        Unidad.objects.all().delete()

        # Nivel 1: Gerencia General
        gerencia_general = Unidad.objects.create(nombre="Gerencia General", codigo="001")
        self.stdout.write(self.style.SUCCESS(f"✅ Creada: {gerencia_general.nombre}"))

        # Nivel 2: Gerencia de Sistemas
        gerencia_sistemas = Unidad.objects.create(
            nombre="Gerencia de Sistemas",
            codigo="002",
            parent=gerencia_general
        )
        self.stdout.write(self.style.SUCCESS(f"  └─ Creada: {gerencia_sistemas.nombre}"))

        # Nivel 3: Coordinaciones que reportan a Gerencia de Sistemas
        coord_soporte = Unidad.objects.create(
            codigo="003",
            nombre="Coordinación de Soporte",
            parent=gerencia_sistemas
        )
        self.stdout.write(self.style.SUCCESS(f"      └─ Creada: {coord_soporte.nombre}"))

        coord_desarrollo = Unidad.objects.create(
            codigo="004",
            nombre="Coordinación de Desarrollo",
            parent=gerencia_sistemas
        )
        self.stdout.write(self.style.SUCCESS(f"      └─ Creada: {coord_desarrollo.nombre}"))

        # Nivel 4: Unidades bajo Coordinación de Soporte
        Unidad.objects.create(
            nombre="Unidad de Helpdesk",
            codigo="005",
            parent=coord_soporte
        )
        self.stdout.write(self.style.SUCCESS(f"          └─ Creada: Unidad de Helpdesk"))

        Unidad.objects.create(
            nombre="Unidad de Redes",
            codigo="006",
            parent=coord_soporte
        )
        self.stdout.write(self.style.SUCCESS(f"          └─ Creada: Unidad de Redes"))

        # Nivel 4: Unidades bajo Coordinación de Desarrollo
        Unidad.objects.create(
            nombre="Unidad de Backend",
            codigo="007",
            parent=coord_desarrollo
        )
        self.stdout.write(self.style.SUCCESS(f"          └─ Creada: Unidad de Backend"))

        Unidad.objects.create(
            nombre="Unidad de Frontend",
            codigo="008",
            parent=coord_desarrollo
        )
        self.stdout.write(self.style.SUCCESS(f"          └─ Creada: Unidad de Frontend"))

        self.stdout.write(self.style.SUCCESS("🎉 Jerarquía insertada correctamente."))
