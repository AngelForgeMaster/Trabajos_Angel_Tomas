from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(prefix="/parcelas", tags=["Parcelas"])


# 1. Endpoint para consultar las parcelas de una finca específica
@router.get("/finca/{finca_id}", response_model=list[schemas.ParcelaResponse])
def listar_parcelas_por_finca(
    finca_id: int, 
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual)
):
    """Retorna todas las parcelas asociadas a una finca determinada."""
    return crud.obtener_parcelas_por_finca(db, finca_id)


# 2. Endpoint para registrar una nueva parcela (Protegido por JWT)
@router.post("/", response_model=schemas.ParcelaResponse, status_code=status.HTTP_201_CREATED)
def registrar_parcela(
    parcela: schemas.ParcelaCreate, 
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual)
):
    """Crea una nueva parcela delimitada con sus coordenadas y área física."""
    return crud.crear_parcela(db, parcela)