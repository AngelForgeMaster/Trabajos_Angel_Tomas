import asyncio

from sqlalchemy import select, insert

from app.database import AsyncSessionLocal
from app.models import (
    DireccionModel,
    DepartamentoModel,
    UsuarioModel,
    ProyectoModel,
    usuario_proyecto
)
from app.security import encriptar_password


async def seed_database():

    async with AsyncSessionLocal() as db:

        # =====================================================
        # DIRECCIONES
        # =====================================================

        direcciones_data = [
            "Dirección de Formación Profesional",
            "Dirección de Innovación y Emprendimiento",
            "Dirección de Transformación Digital"
        ]

        direcciones = {}

        for nombre in direcciones_data:

            result = await db.execute(
                select(DireccionModel).where(
                    DireccionModel.nombre == nombre
                )
            )

            direccion = result.scalars().first()

            if not direccion:
                direccion = DireccionModel(nombre=nombre)
                db.add(direccion)
                await db.flush()

            direcciones[nombre] = direccion

        await db.commit()

        print("✅ Direcciones creadas")

        # =====================================================
        # DEPARTAMENTOS
        # =====================================================

        departamentos_data = [
            {
                "nombre": "Desarrollo de Software",
                "codigo": "DS001",
                "direccion": "Dirección de Formación Profesional"
            },
            {
                "nombre": "Análisis de Datos",
                "codigo": "AD001",
                "direccion": "Dirección de Formación Profesional"
            },
            {
                "nombre": "Infraestructura TI",
                "codigo": "IT001",
                "direccion": "Dirección de Transformación Digital"
            },
            {
                "nombre": "Gestión de Proyectos",
                "codigo": "GP001",
                "direccion": "Dirección de Innovación y Emprendimiento"
            }
        ]

        departamentos = {}

        for item in departamentos_data:

            result = await db.execute(
                select(DepartamentoModel).where(
                    DepartamentoModel.codigo == item["codigo"]
                )
            )

            departamento = result.scalars().first()

            if not departamento:

                departamento = DepartamentoModel(
                    nombre=item["nombre"],
                    codigo=item["codigo"],
                    direccion_id=direcciones[item["direccion"]].id
                )

                db.add(departamento)
                await db.flush()

            departamentos[item["nombre"]] = departamento

        await db.commit()

        print("✅ Departamentos creados")

        # =====================================================
        # USUARIOS
        # =====================================================

        usuarios_data = [
            {
                "nombre": "Administrador General",
                "email": "admin@sena.edu.co",
                "rol": "admin",
                "password": "Admin123*",
                "departamento": "Desarrollo de Software"
            },
            {
                "nombre": "Juan Pérez",
                "email": "juan.perez@sena.edu.co",
                "rol": "user",
                "password": "User123*",
                "departamento": "Desarrollo de Software"
            },
            {
                "nombre": "María Gómez",
                "email": "maria.gomez@sena.edu.co",
                "rol": "user",
                "password": "User123*",
                "departamento": "Análisis de Datos"
            },
            {
                "nombre": "Carlos Rodríguez",
                "email": "carlos.rodriguez@sena.edu.co",
                "rol": "user",
                "password": "User123*",
                "departamento": "Infraestructura TI"
            },
            {
                "nombre": "Laura Ramírez",
                "email": "laura.ramirez@sena.edu.co",
                "rol": "user",
                "password": "User123*",
                "departamento": None
            }
        ]

        usuarios = {}

        for item in usuarios_data:

            result = await db.execute(
                select(UsuarioModel).where(
                    UsuarioModel.email == item["email"]
                )
            )

            usuario = result.scalars().first()

            if not usuario:

                departamento_id = None

                if item["departamento"] is not None:
                    departamento_id = departamentos[
                        item["departamento"]
                    ].id

                usuario = UsuarioModel(
                    nombre=item["nombre"],
                    email=item["email"],
                    rol=item["rol"],
                    password=encriptar_password(
                        item["password"]
                    ),
                    departamento_id=departamento_id
                )

                db.add(usuario)
                await db.flush()

            usuarios[item["email"]] = usuario

        await db.commit()

        print("✅ Usuarios creados")

        # =====================================================
        # PROYECTOS
        # =====================================================

        proyectos_data = [
            {
                "nombre": "Sistema de Gestión ADSO",
                "descripcion": "Aplicación para la gestión académica ADSO"
            },
            {
                "nombre": "Plataforma Analítica SENA",
                "descripcion": "Análisis de indicadores institucionales"
            },
            {
                "nombre": "Portal de Innovación",
                "descripcion": "Gestión de iniciativas y emprendimientos"
            }
        ]

        proyectos = {}

        for item in proyectos_data:

            result = await db.execute(
                select(ProyectoModel).where(
                    ProyectoModel.nombre == item["nombre"]
                )
            )

            proyecto = result.scalars().first()

            if not proyecto:

                proyecto = ProyectoModel(
                    nombre=item["nombre"],
                    descripcion=item["descripcion"]
                )

                db.add(proyecto)
                await db.flush()

            proyectos[item["nombre"]] = proyecto

        await db.commit()

        print("✅ Proyectos creados")

        # =====================================================
        # RELACIONES USUARIO - PROYECTO
        # =====================================================

        relaciones = [
            (
                "juan.perez@sena.edu.co",
                "Sistema de Gestión ADSO"
            ),
            (
                "maria.gomez@sena.edu.co",
                "Sistema de Gestión ADSO"
            ),
            (
                "juan.perez@sena.edu.co",
                "Plataforma Analítica SENA"
            ),
            (
                "carlos.rodriguez@sena.edu.co",
                "Plataforma Analítica SENA"
            ),
            (
                "laura.ramirez@sena.edu.co",
                "Portal de Innovación"
            ),
            (
                "maria.gomez@sena.edu.co",
                "Portal de Innovación"
            ),
            (
                "carlos.rodriguez@sena.edu.co",
                "Portal de Innovación"
            )
        ]

        for email, nombre_proyecto in relaciones:

            usuario = usuarios[email]
            proyecto = proyectos[nombre_proyecto]

            existe = await db.execute(
                select(usuario_proyecto).where(
                    usuario_proyecto.c.usuario_id == usuario.id,
                    usuario_proyecto.c.proyecto_id == proyecto.id
                )
            )

            if existe.first() is None:

                await db.execute(
                    insert(usuario_proyecto).values(
                        usuario_id=usuario.id,
                        proyecto_id=proyecto.id
                    )
                )

        await db.commit()

        print("✅ Relaciones usuario-proyecto creadas")
        print("✅ Seed ejecutado correctamente")


if __name__ == "__main__":
    asyncio.run(seed_database())