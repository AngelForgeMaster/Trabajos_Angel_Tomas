from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import verificar_password
from app.auth import crear_token_acceso
from app.models import UsuarioModel

router = APIRouter(tags=["Autenticación"])


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # OAuth2PasswordRequestForm toma 'username' (aquí usaremos el email) y 'password'
    usuario = db.query(UsuarioModel).filter(UsuarioModel.email == form_data.username).first()
    
    if not usuario or not verificar_password(form_data.password, usuario.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Correo o contraseña incorrectos"
        )

    # Inyectamos el email y el rol dentro del payload del token
    token_acceso = crear_token_acceso(data={"sub": usuario.email, "rol": usuario.rol, "id_usuarios": usuario.id_usuarios})
    return {"access_token": token_acceso, "token_type": "bearer"}