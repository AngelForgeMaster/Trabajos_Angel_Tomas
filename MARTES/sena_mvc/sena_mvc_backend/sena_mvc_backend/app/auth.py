import os 
import jwt 
from datetime import datetime, timedelta, timezone 
from dotenv import load_dotenv 
from fastapi import Depends, HTTPException, status 
from fastapi.security import OAuth2PasswordBearer 
from sqlalchemy.ext.asyncio import AsyncSession 
from sqlalchemy.future import select 
from app.database import get_db 
from app.models import UsuarioModel 
 
load_dotenv() 
 
SECRET_KEY = os.getenv("JWT_SECRET_KEY") 
ALGORITHM = os.getenv("JWT_ALGORITHM") 
ACCESS_TOKEN_EXPIRE_MINUTES = 30 
 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login") 
 
def crear_token_acceso(data: dict) -> str: 
    datos_a_cifrar = data.copy() 
    tiempo_expiracion = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES) 
    datos_a_cifrar.update({"exp": tiempo_expiracion}) 
    return jwt.encode(datos_a_cifrar, SECRET_KEY, algorithm=ALGORITHM) 
 
async def obtener_usuario_actual( 
    token: str = Depends(oauth2_scheme),  
    db: AsyncSession = Depends(get_db) 
): 
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
             
    result = await db.execute(select(UsuarioModel).filter(UsuarioModel.email == email)) 
    usuario = result.scalars().first() 
    if usuario is None: 
        raise credenciales_exception 
    return usuario 
