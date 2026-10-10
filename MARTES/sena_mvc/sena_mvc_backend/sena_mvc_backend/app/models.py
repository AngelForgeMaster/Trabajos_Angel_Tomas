from sqlalchemy import Column, Integer, String, ForeignKey, Table, Text 
from sqlalchemy.orm import relationship 
from app.database import Base 
 
usuario_proyecto = Table( 
    "usuario_proyecto", 
    Base.metadata, 
    Column("usuario_id", Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), primary_key=True), 
    Column("proyecto_id", Integer, ForeignKey("proyectos.id", ondelete="CASCADE"), primary_key=True) 
) 
 
class DireccionModel(Base): 
    __tablename__ = "direcciones" 
 
    id = Column(Integer, primary_key=True, autoincrement=True) 
    nombre = Column(String, unique=True, nullable=False) 
    departamentos = relationship("DepartamentoModel", back_populates="direccion", lazy="selectin") 

class DepartamentoModel(Base): 
    __tablename__ = "departamentos" 
    id = Column(Integer, primary_key=True, autoincrement=True) 
    nombre = Column(String, unique=True, nullable=False) 
    codigo = Column(String, unique=True, nullable=False) 
    direccion_id = Column(Integer, ForeignKey("direcciones.id"), nullable=True) 
    direccion = relationship("DireccionModel", back_populates="departamentos", lazy="selectin") 
    usuarios = relationship("UsuarioModel", back_populates="departamento", lazy="selectin") 
 
class UsuarioModel(Base): 
    __tablename__ = "usuarios" 
    id = Column(Integer, primary_key=True, autoincrement=True) 
    nombre = Column(String, nullable=False) 
    email = Column(String, unique=True, nullable=False) 
    password = Column(String, nullable=False) 
    rol = Column(String, default="user", nullable=False) 
    departamento_id = Column(Integer, ForeignKey("departamentos.id"), nullable=True) 
 
    departamento = relationship("DepartamentoModel", back_populates="usuarios", lazy="selectin") 
    proyectos = relationship("ProyectoModel", secondary=usuario_proyecto, back_populates="empleados", lazy="selectin") 
 
class ProyectoModel(Base): 
    __tablename__ = "proyectos" 
    id = Column(Integer, primary_key=True, autoincrement=True) 
    nombre = Column(String, nullable=False)
    descripcion = Column(Text, nullable=True) 
    empleados = relationship("UsuarioModel", secondary=usuario_proyecto, back_populates="proyectos", lazy="selectin") 
