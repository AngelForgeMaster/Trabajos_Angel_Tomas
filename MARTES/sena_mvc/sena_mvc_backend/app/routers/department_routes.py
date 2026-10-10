from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app import crud, schemas
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(
    prefix="/departamentos",
    tags=["Departamentos"]
)


@router.get(
    "/",
    response_model=list[schemas.DepartamentoResponse]
)
async def listar_departamentos(
    db: AsyncSession = Depends(get_db)
):
    return await crud.obtener_departamentos(db)


@router.get(
    "/{departamento_id}",
    response_model=schemas.DepartamentoResponse
)
async def obtener_departamento(
    departamento_id: int,
    db: AsyncSession = Depends(get_db)
):
    departamento = await crud.obtener_departamento_por_id(
        db,
        departamento_id
    )

    if not departamento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Departamento no encontrado"
        )

    return departamento


@router.post(
    "/",
    response_model=schemas.DepartamentoResponse,
    status_code=status.HTTP_201_CREATED
)
async def registrar_departamento(
    depto: schemas.DepartamentoCreate,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if usuario_autenticado.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de administrador"
        )

    return await crud.crear_departamento(
        db,
        depto
    )


@router.put(
    "/{departamento_id}",
    response_model=schemas.DepartamentoResponse
)
async def actualizar_departamento(
    departamento_id: int,
    depto_data: schemas.DepartamentoUpdate,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if usuario_autenticado.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de administrador"
        )

    departamento = await crud.actualizar_departamento(
        db,
        departamento_id,
        depto_data
    )

    if not departamento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Departamento no encontrado"
        )

    return departamento


@router.delete(
    "/{departamento_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def eliminar_departamento(
    departamento_id: int,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if usuario_autenticado.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de administrador"
        )

    eliminado = await crud.eliminar_departamento(
        db,
        departamento_id
    )

    if not eliminado:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Departamento no encontrado"
        )

    return None