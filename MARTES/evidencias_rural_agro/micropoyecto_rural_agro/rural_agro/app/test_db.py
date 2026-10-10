import os
import sys
# Truco mágico para Windows: Forzar la codificación antes de que psycopg2 actúe
os.environ["PGCLIENTENCODING"] = "utf-8"
os.environ["PYTHONIOENCODING"] = "utf-8"
sys.stdout.reconfigure(encoding='utf-8')  # truco clave

from app.database import SessionLocal
from sqlalchemy import text

try:
    db = SessionLocal()
    # Envolvemos la cadena en text(...)
    resultado = db.execute(text("SELECT current_database();")).fetchone()
    print(f" Conexión exitosa a la base de datos: {resultado[0]}")
    db.close()
except Exception as e:
    # Capturamos el error y limpiamos cualquier carácter extraño que rompa la consola
    error_limpio = str(e).encode('ascii', 'ignore').decode('ascii')
    print(f" El verdadero error de PostgreSQL es: {error_limpio}")