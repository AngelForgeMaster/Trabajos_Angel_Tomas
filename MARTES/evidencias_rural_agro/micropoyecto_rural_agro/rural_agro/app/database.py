from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os  # <-- Esta línea debe ser la PRIMERA

os.environ["PGCLIENTENCODING"] = "utf-8"
os.environ["PYTHONIOENCODING"] = "utf-8"
# 1. Definimos la URL de conexión para PostgreSQL usando el driver psycopg2
# Estructura: postgresql://usuario:contrasena@servidor:puerto/nombre_bd
# app/database.py
DATABASE_URL = "postgresql://postgres:acavalacontraseña@localhost:5432/rural_agro?client_encoding=utf8"
# aca es importante agregar la contraseña que se le haya puesto al pogrest
# de la computadora si no no funcionara 

# 2. Creamos el motor de comunicación (A diferencia de SQLite, no requiere argumentos extras)
engine = create_engine(DATABASE_URL)

# 3. Fábrica de sesiones para interactuar con la BD de forma controlada
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Clase Base jerárquica para la creación de los Modelos ORM
Base = declarative_base()

# 5. Generador de Sesiones (Dependencia). Controla la apertura y cierre automático por petición HTTP
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
