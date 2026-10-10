from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Any

# ESQUEMAS DE USUARIOSss
class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr
    rol: str = "user"

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioUpdate(BaseModel):
    nombre: str | None = None
    email: EmailStr | None = None
    password: str | None = None

class UsuarioResponse(UsuarioBase):
    id_usuarios: int

    class Config:
        from_attributes = True


# ESQUEMAS DE FINCAS 
class FincaBase(BaseModel):
    nombre_fincas: str
    ubicacion_fincas: str
    coordenada_fincas: dict | Any  # Permite recibir objetos JSON de coordenadas

class FincaCreate(FincaBase):
    usuarios_id: int

class FincaUpdate(BaseModel):
    nombre_fincas: str | None = None
    ubicacion_fincas: str | None = None
    coordenada_fincas: dict | Any | None = None

class FincaResponse(FincaBase):
    id_fincas: int
    usuarios_id: int

    class Config:
        from_attributes = True


#ESQUEMAS DE PARCELAS
class ParcelaBase(BaseModel):
    nombre_parcelas: str
    area_parcelas: float
    coordenadas_parcelas: dict | Any

class ParcelaCreate(ParcelaBase):
    fincas_id: int

class ParcelaUpdate(BaseModel):
    nombre_parcelas: str | None = None
    area_parcelas: float | None = None
    coordenadas_parcelas: dict | Any | None = None

class ParcelaResponse(ParcelaBase):
    id_parcelas: int
    fincas_id: int

    class Config:
        from_attributes = True


#ESQUEMAS DE CULTIVo 
class CultivoBase(BaseModel):
    tipo_cultivos: str
    variedad_cultivos: str
    tipo_semilla: str
    cantidad_semilla: float
    precio_semilla: float
    fecha_siembra: date
    fecha_estimada_cosecha: date | None = None
    estado_siembra: str = "en crecimiento"

class CultivoCreate(CultivoBase):
    parcelas_id: int

class CultivoUpdate(BaseModel):
    tipo_cultivos: str | None = None
    variedad_cultivos: str | None = None
    cantidad_semilla: float | None = None
    precio_semilla: float | None = None
    estado_siembra: str | None = None

class CultivoResponse(CultivoBase):
    id_cultivos: int
    parcelas_id: int

    class Config:
        from_attributes = True