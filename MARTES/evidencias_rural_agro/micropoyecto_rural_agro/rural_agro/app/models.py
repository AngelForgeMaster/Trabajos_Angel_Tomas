from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey, Table, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from app.database import Base

# 1. MODELO USUARIOS Tabla existente en PostgreSQL
class UsuarioModel(Base):
    __tablename__ = "usuarios"

    id_usuarios = Column(Integer, primary_key=True, index=True)

    nombre = Column("nombre_usuarios", String)
    apellido = Column("apellido_usuarios", String)
    email = Column("email_usuarios", String, unique=True, index=True)
    password = Column("contrasenia_usuarios", String)
    rol = Column("rol_usuarios", String)

    # Relación: Un usuario tiene muchas fincas
    fincas = relationship("FincaModel", back_populates="usuario")


# 2. MODELO FINCAS public.fincas
class FincaModel(Base):
    __tablename__ = "fincas"

    id_fincas = Column(Integer, primary_key=True, autoincrement=True)
    usuarios_id = Column(Integer, ForeignKey("usuarios.id_usuarios", ondelete="CASCADE"), nullable=False)
    nombre_fincas = Column(String(50), nullable=False)
    ubicacion_fincas = Column(String(50), nullable=False)
    coordenada_fincas = Column(JSONB, nullable=False)

    # Relaciones ORM
    usuario = relationship("UsuarioModel", back_populates="fincas")
    parcelas = relationship("ParcelaModel", back_populates="finca", passive_deletes=True)


# 3. MODELO PARCELAS  public.parcelas
class ParcelaModel(Base):
    __tablename__ = "parcelas"

    id_parcelas = Column(Integer, primary_key=True, autoincrement=True)
    fincas_id = Column(Integer, ForeignKey("fincas.id_fincas", ondelete="CASCADE"), nullable=False)
    nombre_parcelas = Column(String(30), nullable=False)
    area_parcelas = Column(Numeric(12, 2), nullable=False)
    coordenadas_parcelas = Column(JSONB, nullable=False)

    # Relaciones ORM
    finca = relationship("FincaModel", back_populates="parcelas")
    cultivos = relationship("CultivoModel", back_populates="parcela", passive_deletes=True)


# 4. MODELO CULTIVOS  public.cultivos
class CultivoModel(Base):
    __tablename__ = "cultivos"

    id_cultivos = Column(Integer, primary_key=True, autoincrement=True)
    parcelas_id = Column(Integer, ForeignKey("parcelas.id_parcelas", ondelete="CASCADE"), nullable=False)
    tipo_cultivos = Column(String(20), nullable=False)
    variedad_cultivos = Column(String(30), nullable=False)
    tipo_semilla = Column(String(30), nullable=False)
    cantidad_semilla = Column(Numeric(12, 2), nullable=False)
    precio_semilla = Column(Numeric(12, 2), nullable=False)
    fecha_siembra = Column(Date, nullable=False)
    fecha_estimada_cosecha = Column("fecha_estimada_cosecha_cultivos", Date, nullable=True)
    estado_siembra = Column(String(30), default="en crecimiento", nullable=False)

    # Relación ORM
    parcela = relationship("ParcelaModel", back_populates="cultivos")