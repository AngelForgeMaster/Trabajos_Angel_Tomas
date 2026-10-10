from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app import crud, schemas
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)


@router.get("/", response_model=list[schemas.UsuarioResponse])
async def listar_usuarios(
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    if usuario_autenticado.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operacion no permitida. Se requieren permisos de Administrador."
        )

    return await crud.obtener_usuarios(db)

# ── AÑADIR antes de "get /{usuario_id}" ─────────────────────────────
@router.get("/me", response_model=schemas.UsuarioResponse)
async def get_me(
    current_user: UsuarioModel = Depends(obtener_usuario_actual),
    db: AsyncSession = Depends(get_db)
):
    """Retorna el perfil del usuario autenticado a partir del token JWT."""
    return current_user


@router.get("/{usuario_id}", response_model=schemas.UsuarioResponse)
async def buscar_usuario(
    usuario_id: int,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    usuario = await crud.obtener_usuario_por_id(db, usuario_id)

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return usuario


@router.post(
    "/",
    response_model=schemas.UsuarioResponse,
    status_code=status.HTTP_201_CREATED
)
async def registrar_usuario(
    usuario: schemas.UsuarioCreate,
    db: AsyncSession = Depends(get_db)
):
    return await crud.crear_usuario(db, usuario)


@router.put("/{usuario_id}", response_model=schemas.UsuarioResponse)
async def modificar_usuario(
    usuario_id: int,
    usuario_data: schemas.UsuarioUpdate,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    usuario = await crud.actualizar_usuario(
        db,
        usuario_id,
        usuario_data
    )

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return usuario


@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
async def borrar_usuario(
    usuario_id: int,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    if usuario_autenticado.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operacion no permitida. Se requieren permisos de Administrador."
        )

    exito = await crud.eliminar_usuario(
        db,
        usuario_id
    )

    if not exito:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return None