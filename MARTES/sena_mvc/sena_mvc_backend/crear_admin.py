import asyncio
from app.database import AsyncSessionLocal
from app.models import UsuarioModel
from app.security import encriptar_password  # Verifica que en app/security.py la función se llame así

async def crear_usuario():
    async with AsyncSessionLocal() as db:
        hashed_password = encriptar_password("admin123")
        
        nuevo_usuario = UsuarioModel(
            nombre="Administrador",
            email="admin@sena.edu.co",
            password=hashed_password,
            rol="admin"
        )
        
        db.add(nuevo_usuario)
        await db.commit()
        print("¡Usuario admin creado con éxito!")

if __name__ == "__main__":
    asyncio.run(crear_usuario())