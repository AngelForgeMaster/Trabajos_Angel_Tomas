import asyncio
from sqlalchemy import select

from app.database import AsyncSessionLocal
from app.models import UsuarioModel
from app.security import encriptar_password


async def crear_admin():

    async with AsyncSessionLocal() as db:

        result = await db.execute(
            select(UsuarioModel).where(
                UsuarioModel.email == "admin@sena.edu.co"
            )
        )

        usuario = result.scalars().first()

        if usuario:
            print("El usuario administrador ya existe.")
            return

        admin = UsuarioModel(
            nombre="Administrador",
            email="admin@sena.edu.co",
            password=encriptar_password("Admin123*"),
            rol="admin"
        )

        db.add(admin)

        await db.commit()

        print("Administrador creado correctamente.")


if __name__ == "__main__":
    asyncio.run(crear_admin())