from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app import crud, reports
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(
    prefix="/reportes",
    tags=["Reportes"]
)

EXCEL_MEDIA_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"


def _verificar_admin(usuario: UsuarioModel):
    if usuario.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de administrador"
        )


def _descargar_excel(buffer, nombre_archivo: str) -> StreamingResponse:
    return StreamingResponse(
        buffer,
        media_type=EXCEL_MEDIA_TYPE,
        headers={"Content-Disposition": f"attachment; filename={nombre_archivo}"}
    )


@router.get("/usuarios")
async def exportar_usuarios(
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    _verificar_admin(usuario_autenticado)
    usuarios = await crud.obtener_usuarios(db)
    buffer = reports.generar_excel_usuarios(usuarios)
    return _descargar_excel(buffer, "usuarios.xlsx")


@router.get("/departamentos")
async def exportar_departamentos(
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    _verificar_admin(usuario_autenticado)
    departamentos = await crud.obtener_departamentos(db)
    buffer = reports.generar_excel_departamentos(departamentos)
    return _descargar_excel(buffer, "departamentos.xlsx")


@router.get("/direcciones")
async def exportar_direcciones(
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    _verificar_admin(usuario_autenticado)
    direcciones = await crud.obtener_direcciones(db)
    buffer = reports.generar_excel_direcciones(direcciones)
    return _descargar_excel(buffer, "direcciones.xlsx")


@router.get("/proyectos")
async def exportar_proyectos(
    db: AsyncSession = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    _verificar_admin(usuario_autenticado)
    proyectos = await crud.obtener_proyectos(db)
    buffer = reports.generar_excel_proyectos(proyectos)
    return _descargar_excel(buffer, "proyectos.xlsx")
