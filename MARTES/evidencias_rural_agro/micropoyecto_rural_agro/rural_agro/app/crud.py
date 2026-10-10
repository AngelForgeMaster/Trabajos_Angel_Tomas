from sqlalchemy.orm import Session
from app.models import UsuarioModel, FincaModel, ParcelaModel, CultivoModel
from app.schemas import (
    UsuarioCreate, UsuarioUpdate,
    FincaCreate, FincaUpdate,
    ParcelaCreate, ParcelaUpdate,
    CultivoCreate, CultivoUpdate
)
from app.security import encriptar_password

#  CRUD USUARIOS 
def obtener_usuarios(db: Session):
    return db.query(UsuarioModel).all()

def obtener_usuario_por_id(db: Session, usuario_id: int):
    return db.query(UsuarioModel).filter(UsuarioModel.id_usuarios == usuario_id).first()

def crear_usuario(db: Session, usuario: UsuarioCreate):
    password_segura = encriptar_password(usuario.password)
    nuevo_usuario = UsuarioModel(
        nombre=usuario.nombre,
        email=usuario.email,
        password=password_segura,
        rol=usuario.rol
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

# CRUD FINCAS 
def obtener_fincas(db: Session):
    return db.query(FincaModel).all()

def crear_finca(db: Session, finca: FincaCreate):
    nueva_finca = FincaModel(**finca.model_dump())
    db.add(nueva_finca)
    db.commit()
    db.refresh(nueva_finca)
    return nueva_finca

# CRUD PARCELAS 
def obtener_parcelas_por_finca(db: Session, finca_id: int):
    return db.query(ParcelaModel).filter(ParcelaModel.fincas_id == finca_id).all()

def crear_parcela(db: Session, parcela: ParcelaCreate):
    nueva_parcela = ParcelaModel(**parcela.model_dump())
    db.add(nueva_parcela)
    db.commit()
    db.refresh(nueva_parcela)
    return nueva_parcela

# CRUD CULTIVOS 
def obtener_cultivos_por_parcela(db: Session, parcela_id: int):
    return db.query(CultivoModel).filter(CultivoModel.parcelas_id == parcela_id).all()

def crear_cultivo(db: Session, cultivo: CultivoCreate):
    nuevo_cultivo = CultivoModel(**cultivo.model_dump())
    db.add(nuevo_cultivo)
    db.commit()
    db.refresh(nuevo_cultivo)
    return nuevo_cultivo