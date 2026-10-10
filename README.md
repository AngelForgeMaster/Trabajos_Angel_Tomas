# Trabajos_Angel_Tomas

Acá se subirán los trabajos y proyectos del SENA.

---

### ⚠️ Nota importante sobre la descarga e instalación del código

Si al clonar o descargar algún proyecto la aplicación o los scripts no funcionan correctamente, ten en cuenta que por razones de seguridad, peso y buenas prácticas, **Git ignora y no sube** los siguientes archivos y carpetas definidos en el `.gitignore`:

* **`node_modules/`**: Dependencias y paquetes de Node.js / React / Next.js.
* **`venv/` / `.venv/` / `env/`**: Entornos virtuales de Python.
* **`.env` / `.env.local`**: Archivos de variables de entorno y claves secretas.
* **`__pycache__/`**: Archivos compilados temporales de Python.
* **`build/` / `dist/`**: Carpetas de compilación de proyectos.

#### 🛠️ ¿Cómo solucionarlo si vas a ejecutar el código en tu equipo?

1. **Si es un proyecto de Node.js / React / Next.js:**
   Ejecuta en la terminal del proyecto:
   ```bash
   npm install

Si es un proyecto de Python:
Crea tu propio entorno virtual e instala los requerimientos:

Bash
python -m venv venv
source venv/bin/activate  # En Linux/Mac
venv\Scripts\activate     # En Windows
pip install -r requirements.txt

Variables de entorno (.env):
Si el proyecto requiere claves o rutas a bases de datos, crea manualmente un archivo .env en la raíz del proyecto basándote en la plantilla o guía provista.
