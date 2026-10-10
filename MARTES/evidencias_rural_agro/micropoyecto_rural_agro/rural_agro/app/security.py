from passlib.context import CryptContext

# Configuración del algoritmo de hashing (Bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def encriptar_password(password: str) -> str:
    """Recibe la clave en texto plano y retorna el hash seguro para guardar en DB."""
    return pwd_context.hash(password)


def verificar_password(plain_password: str, hashed_password: str) -> bool:
    """Compara la contraseña ingresada en el login con el hash guardado en DB."""
    return pwd_context.verify(plain_password, hashed_password)