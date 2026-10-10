from pydantic import BaseModel, EmailStr


# =====================================================
# PROYECTOS
# =====================================================

class ProyectoBase(BaseModel):
    nombre: str
    descripcion: str | None = None


class ProyectoCreate(ProyectoBase):
    pass


class ProyectoUpdate(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None


class ProyectoResponse(ProyectoBase):
    id: int

    class Config:
        from_attributes = True


# =====================================================
# DIRECCIONES
# =====================================================

class DireccionBase(BaseModel):
    nombre: str


class DireccionCreate(DireccionBase):
    pass


class DireccionUpdate(BaseModel):
    nombre: str | None = None


class DireccionResponse(DireccionBase):
    id: int

    class Config:
        from_attributes = True


# =====================================================
# DEPARTAMENTOS
# =====================================================

class DepartamentoBase(BaseModel):
    nombre: str
    codigo: str


class DepartamentoCreate(DepartamentoBase):
    direccion_id: int | None = None


class DepartamentoUpdate(BaseModel):
    nombre: str | None = None
    codigo: str | None = None
    direccion_id: int | None = None


class DepartamentoResponse(DepartamentoBase):
    id: int
    direccion_id: int | None = None
    direccion: DireccionResponse | None = None

    class Config:
        from_attributes = True


# =====================================================
# USUARIOS
# =====================================================

class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr
    rol: str = "user"


class UsuarioCreate(UsuarioBase):
    password: str
    departamento_id: int | None = None


class UsuarioUpdate(BaseModel):
    nombre: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    rol: str | None = None
    departamento_id: int | None = None


class UsuarioResponse(UsuarioBase):
    id: int
    departamento_id: int | None = None
    departamento: DepartamentoResponse | None = None
    proyectos: list[ProyectoResponse] = []

    class Config:
        from_attributes = True


# =====================================================
# AUTENTICACION JWT
# =====================================================

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


# =====================================================
# RESPUESTAS COMPLETAS
# =====================================================

class ProyectoDetalleResponse(ProyectoResponse):
    empleados: list[UsuarioResponse] = []

    class Config:
        from_attributes = True


class DepartamentoDetalleResponse(DepartamentoResponse):
    usuarios: list[UsuarioResponse] = []

    class Config:
        from_attributes = True


class DireccionDetalleResponse(DireccionResponse):
    departamentos: list[DepartamentoResponse] = []

    class Config:
        from_attributes = True