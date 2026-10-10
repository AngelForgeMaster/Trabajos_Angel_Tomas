from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas
from app.auth import obtener_usuario_actual
from app.models import UsuarioModel

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

# 1. Listar todos los usuarios (Ruta protegida para Admin)
@router.get("/", response_model=list[schemas.UsuarioResponse])
def listar_usuarios(
    db: Session = Depends(get_db),
    usuario_autenticado: UsuarioModel = Depends(obtener_usuario_actual)
):
    if usuario_autenticado.rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Operación no permitida. Se requieren permisos de Administrador."
        )

    return crud.obtener_usuarios(db)


# 2. Buscar usuario por su ID de PostgreSQL (id_usuarios)
@router.get("/{usuario_id}", response_model=schemas.UsuarioResponse)
def buscar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = crud.obtener_usuario_por_id(db, usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario


# 3. Registrar un nuevo usuario (Agricultor / Cliente)
@router.post("/", response_model=schemas.UsuarioResponse, status_code=status.HTTP_201_CREATED)
def registrar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return crud.crear_usuario(db, usuario)


# 4. Modificar datos de un usuario
@router.put("/{usuario_id}", response_model=schemas.UsuarioResponse)
def modificar_usuario(usuario_id: int, usuario_data: schemas.UsuarioUpdate, db: Session = Depends(get_db)):
    usuario = crud.actualizar_usuario(db, usuario_id, usuario_data)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario


# 5. Eliminar un usuario
@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def borrar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    exito = crud.eliminar_usuario(db, usuario_id)
    if not exito:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return None