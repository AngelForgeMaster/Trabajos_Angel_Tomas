from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.security import verificar_password
from app.auth import crear_token_acceso
from app.models import UsuarioModel

router = APIRouter(tags=["Autenticacion"])


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(UsuarioModel).filter(
            UsuarioModel.email == form_data.username
        )
    )

    usuario = result.scalars().first()

    if not usuario or not verificar_password(
        form_data.password,
        usuario.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Correo o password incorrectos"
        )

    token_acceso = crear_token_acceso(
        data={
            "sub": usuario.email,
            "rol": usuario.rol
        }
    )

    return {
        "access_token": token_acceso,
        "token_type": "bearer"
    }