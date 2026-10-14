from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app import crud, schemas
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(
    prefix="/proyectos",
    tags=["Proyectos"]
)


@router.get(
    "/",
    response_model=list[schemas.ProyectoResponse]
)
async def listar_proyectos(
    db: AsyncSession = Depends(get_db)
):
    return await crud.obtener_proyectos(db)


@router.get(
    "/mis-proyectos",
    response_model=list[schemas.ProyectoDetalleResponse]
)
async def listar_mis_proyectos(
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    return await crud.obtener_proyectos_por_usuario(
        db,
        usuario_autenticado.id
    )


@router.get(
    "/{proyecto_id}",
    response_model=schemas.ProyectoDetalleResponse

)
async def obtener_proyecto(
    proyecto_id: int,
    db: AsyncSession = Depends(get_db)
):
    proyecto = await crud.obtener_proyecto_por_id(
        db,
        proyecto_id
    )

    if not proyecto:
        raise HTTPException(
            status_code=404,
            detail="Proyecto no encontrado"
        )

    return proyecto


@router.post(
    "/",
    response_model=schemas.ProyectoResponse,
    status_code=status.HTTP_201_CREATED
)
async def registrar_proyecto(
    proyecto: schemas.ProyectoCreate,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    return await crud.crear_proyecto(
        db,
        proyecto
    )


@router.put(
    "/{proyecto_id}",
    response_model=schemas.ProyectoResponse
)
async def actualizar_proyecto(
    proyecto_id: int,
    proyecto_data: schemas.ProyectoUpdate,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    proyecto = await crud.actualizar_proyecto(
        db,
        proyecto_id,
        proyecto_data
    )

    if not proyecto:
        raise HTTPException(
            status_code=404,
            detail="Proyecto no encontrado"
        )

    return proyecto


@router.delete(
    "/{proyecto_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def eliminar_proyecto(
    proyecto_id: int,
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if usuario_autenticado.rol != "admin":
        raise HTTPException(
            status_code=403,
            detail="Permisos insuficientes."
        )

    eliminado = await crud.eliminar_proyecto(
        db,
        proyecto_id
    )

    if not eliminado:
        raise HTTPException(
            status_code=404,
            detail="Proyecto no encontrado"
        )

    return None


@router.post(
    "/{proyecto_id}/asignar-usuario/{usuario_id}",
    response_model=schemas.UsuarioResponse
)
async def vincular_usuario_a_proyecto(
    proyecto_id: int,
    usuario_id: int,
    db: AsyncSession = Depends(get_db),
    admin_actual: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if admin_actual.rol != "admin":
        raise HTTPException(
            status_code=403,
            detail="Permisos insuficientes para asignar proyectos."
        )

    resultado = await crud.asignar_empleado_a_proyecto(
        db,
        usuario_id,
        proyecto_id
    )

    if not resultado:
        raise HTTPException(
            status_code=404,
            detail="Usuario o Proyecto no encontrado."
        )

    return resultado


@router.delete(
    "/{proyecto_id}/quitar-usuario/{usuario_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
async def desvincular_usuario_de_proyecto(
    proyecto_id: int,
    usuario_id: int,
    db: AsyncSession = Depends(get_db),
    admin_actual: UsuarioModel = Depends(
        obtener_usuario_actual
    )
):
    if admin_actual.rol != "admin":
        raise HTTPException(
            status_code=403,
            detail="Permisos insuficientes para quitar usuarios."
        )

    eliminado = await crud.quitar_empleado_de_proyecto(
        db,
        usuario_id,
        proyecto_id
    )

    if not eliminado:
        raise HTTPException(
            status_code=404,
            detail="Usuario, proyecto o asignacion no encontrada."
        )

    return None