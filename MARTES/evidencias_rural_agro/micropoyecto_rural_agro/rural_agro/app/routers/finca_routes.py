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
    if usuario_actual.rol != "admin":
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