import os  # <-- Esta línea debe ser la PRIMERA

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()  # <-- carga las variables del archivo .env


os.environ["PGCLIENTENCODING"] = "utf-8"
os.environ["PYTHONIOENCODING"] = "utf-8"

# 1. Definimos la URL de conexión para PostgreSQL usando el driver psycopg2
DATABASE_URL = os.getenv("DATABASE_URL")

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
