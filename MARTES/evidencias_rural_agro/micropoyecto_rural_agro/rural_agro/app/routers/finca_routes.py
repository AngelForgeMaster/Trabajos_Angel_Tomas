from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(prefix="/fincas", tags=["Fincas"])

# 1. Endpoint público/general para listar fincas
@router.get("/", response_model=list[schemas.FincaResponse])
def listar_fincas(db: Session = Depends(get_db)):
    return crud.obtener_fincas(db)
    
# 2. Endpoint protegido para registrar fincas (exige Token JWT y rol de admin)
@router.post("/", response_model=schemas.FincaResponse, status_code=status.HTTP_201_CREATED)
def registrar_finca(
    finca: schemas.FincaCreate, 
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual)
):
    if usuario_actual.rol != "administrador":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Permisos insuficientes para registrar fincas en Rural Agro."
        )
    return crud.crear_finca(db, finca)

# 3. Endpoint para consultar las parcelas de una finca específica
@router.get("/{finca_id}/parcelas", response_model=list[schemas.ParcelaResponse])
def obtener_parcelas_de_finca(
    finca_id: int, 
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual)
):
    parcelas = crud.obtener_parcelas_por_finca(db, finca_id)
    if parcelas is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="No se encontraron parcelas asociadas a la finca especificada."
        )
    return parcelas

@router.put("/{finca_id}", response_model=schemas.FincaResponse)
def editar_finca(
    finca_id: int,
    finca: schemas.FincaUpdate,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual)
):
    if usuario_actual.rol != "administrador":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permisos insuficientes.")
    finca_actualizada = crud.actualizar_finca(db, finca_id, finca)
    if not finca_actualizada:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Finca no encontrada.")
    return finca_actualizada


@router.delete("/{finca_id}", status_code=status.HTTP_204_NO_CONTENT)
def borrar_finca(
    finca_id: int,
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual)
):
    if usuario_actual.rol != "administrador":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permisos insuficientes.")
    finca_eliminada = crud.eliminar_finca(db, finca_id)
    if not finca_eliminada:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Finca no encontrada.")