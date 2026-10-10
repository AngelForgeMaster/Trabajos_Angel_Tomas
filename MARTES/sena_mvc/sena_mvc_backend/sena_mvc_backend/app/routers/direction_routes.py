from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app import crud, schemas
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(
    prefix="/direcciones",
    tags=["Direcciones"]
)


@router.get(
    "/",
    response_model=list[schemas.DireccionResponse]
)
async def listar_direcciones(
    db: AsyncSession = Depends(get_db)
):
    return await crud.obtener_direcciones(db)


@router.get(
    "/{direccion_id}",
    response_model=schemas.DireccionResponse
)
async def obtener_direccion(
    direccion_id: int,
    db: AsyncSession = Depends(get_db)
):
    direccion = await crud.obtener_direccion_por_id(
        db,
        direccion_id
    )

    if not direccion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dirección no encontrada"
        )

    return direccion


@router.post(
    "/",
    response_model=schemas.DireccionResponse,
    status_code=status.HTTP_201_CREATED
)
async def registrar_direccion(
    direccion: schemas.DireccionCreate,
    db: AsyncSession = Depends(get_db),
    admin_actual: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if admin_actual.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de Administrador."
        )

    return await crud.crear_direccion(
        db,
        direccion
    )


@router.put(
    "/{direccion_id}",
    response_model=schemas.DireccionResponse
)
async def actualizar_direccion(
    direccion_id: int,
    direccion_data: schemas.DireccionUpdate,
    db: AsyncSession = Depends(get_db),
    admin_actual: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if admin_actual.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de Administrador."
        )

    direccion = await crud.actualizar_direccion(
        db,
        direccion_id,
        direccion_data
    )

    if not direccion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dirección no encontrada"
        )

    return direccion


@router.delete(
    "/{direccion_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def eliminar_direccion(
    direccion_id: int,
    db: AsyncSession = Depends(get_db),
    admin_actual: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if admin_actual.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de Administrador."
        )

    eliminado = await crud.eliminar_direccion(
        db,
        direccion_id
    )

    if not eliminado:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dirección no encontrada"
        )

    return None