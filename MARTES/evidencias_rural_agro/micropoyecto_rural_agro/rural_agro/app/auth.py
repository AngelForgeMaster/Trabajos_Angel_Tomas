import jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import UsuarioModel

# Configuración de clave secreta y algoritmo
SECRET_KEY = "RURAL_AGRO_SECRET_KEY_SUPER_SEGURA"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def crear_token_acceso(data: dict) -> str:
    """Genera un token JWT cifrado con la fecha de expiración."""
    datos_a_cifrar = data.copy()
    tiempo_expiracion = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    datos_a_cifrar.update({"exp": tiempo_expiracion})
    return jwt.encode(datos_a_cifrar, SECRET_KEY, algorithm=ALGORITHM)


def obtener_usuario_actual(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Inyección de dependencia que valida si el Token enviado por el usuario es legítimo."""
    credenciales_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar el token de acceso",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credenciales_exception
    except jwt.PyJWTError:
        raise credenciales_exception

    usuario = db.query(UsuarioModel).filter(UsuarioModel.email == email).first()
    if usuario is None:
        raise credenciales_exception

    return usuario