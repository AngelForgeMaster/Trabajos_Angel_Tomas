from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(prefix="/cultivos", tags=["Cultivos"])


# 1. Endpoint para consultar los cultivos en una parcela específica
@router.get("/parcela/{parcela_id}", response_model=list[schemas.CultivoResponse])
def listar_cultivos_por_parcela(
    parcela_id: int, 
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual)
):
    """Retorna la lista de cultivos sembrados en una parcela dada."""
    return crud.obtener_cultivos_por_parcela(db, parcela_id)


# 2. Endpoint para registrar un nuevo cultivo (Protegido por JWT)
@router.post("/", response_model=schemas.CultivoResponse, status_code=status.HTTP_201_CREATED)
def registrar_cultivo(
    cultivo: schemas.CultivoCreate, 
    db: Session = Depends(get_db),
    usuario_actual: UsuarioModel = Depends(obtener_usuario_actual)
):
    """Registra la siembra de un nuevo cultivo con fechas, variedad y costos de semilla."""
    return crud.crear_cultivo(db, cultivo)