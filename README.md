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

# 📂 Guía de Descarga del Repositorio

¡Bienvenido! Este repositorio contiene las evidencias y proyectos organizados para las actividades del SENA. Dependiendo de lo que necesites, puedes descargar el repositorio completo, una carpeta específica o un solo archivo.

---

## 1. 📦 Descargar el Repositorio Completo

Si deseas tener todas las carpetas y evidencias en tu computadora:

### Opción A: Descargar como ZIP (Sin usar Git)
1. Ve a la página principal del repositorio en GitHub.
2. Haz clic en el botón verde **`<> Code`** (ubicado en la parte superior derecha de la lista de archivos).
3. En el menú desplegable, selecciona **`Download ZIP`**.
4. Descomprime el archivo `.zip` en tu computadora.

### Opción B: Clonar con Git (Para VS Code / Programadores)
Abre la terminal en la carpeta donde deseas guardar el proyecto y ejecuta:
```bash
git clone [https://github.com/AngelForgeMaster/Trabajos_Angel_Tomas.git](https://github.com/AngelForgeMaster/Trabajos_Angel_Tomas.git)

```

*(Para actualizar con los últimos cambios en el futuro, solo ejecuta `git pull origin main` dentro de la carpeta).*

---

## 2. 📂 Descargar una Carpeta en Específico

GitHub no permite descargar una sola carpeta directamente por defecto, pero puedes hacerlo fácilmente sin bajar todo el repositorio:

1. Entra a la carpeta que deseas descargar dentro de GitHub (por ejemplo, `MARTES/sena_mvc`).
2. Copia la **URL completa** desde la barra de direcciones de tu navegador.
3. Entra a la herramienta gratuita [DownGit](https://minhaskamal.github.io/DownGit/) (o [download-directory.github.io](https://download-directory.github.io/)).
4. Pega la URL en la casilla y haz clic en **Download**. Se descargará un archivo `.zip` únicamente con esa carpeta.

---

## 3. 📄 Descargar un Archivo Específico (Documentos, .docx, .sql, etc.)

Si solo necesitas un archivo individual:

1. Navega hasta el archivo que deseas descargar y haz clic sobre él para abrirlo en GitHub.
2. En la esquina superior derecha de la vista previa del archivo, haz clic en el botón **`Download`** (o en el ícono de la flecha hacia abajo ⬇️).
3. El archivo se guardará directamente en tu carpeta de descargas.

---

## 🤝 Guía para Colaboradores: ¿Cómo subir tus cambios al proyecto?

Si ya eres colaborador oficial del repositorio y vas a realizar entregas o ajustes, elige el método según cómo estés trabajando:

---

### 🟢 Método 1: Trabajo con Terminal y Git (Recomendado para programar)

> **⚠️ Requisito importante:** Para usar este método **debes clonar la estructura de carpetas completa en tu PC**.
> 
> **¿Por qué?** Git no gestiona carpetas individuales de forma aislada; controla el historial de versiones, autoría y permisos a nivel de todo el proyecto. Al clonar la estructura completa, Git sabrá exactamente qué modificaste y solo actualizará tus archivos sin tocar el trabajo de los demás.

#### Paso a paso con comandos:

1. **`git pull origin main`**
   * *¿Qué hace?* Descarga y fusiona los últimos cambios subidos por tus compañeros para asegurarte de tener la versión más reciente antes de trabajar.
2. **`git add .`**
   * *¿Qué hace?* Agrupa y prepara todos los archivos que creaste, modificaste o eliminaste para ponerlos en la "lista de espera" de subida.
3. **`git commit -m "Descripción breve de tus cambios"`**
   * *¿Qué hace?* Crea un punto de guardado local con un mensaje claro que explica qué trabajo estás entregando (por ejemplo: `git commit -m "Ajustes en el módulo sena_mvc por Tomás"`).
4. **`git push origin main`**
   * *¿Qué hace?* Envía de forma segura tus commits locales a GitHub para que queden públicos e integrados al proyecto principal.

---

### 🟡 Método 2: Subir cambios directo desde la Web (Si solo bajaste una carpeta)

Si no clonaste el proyecto completo y solo descargaste una carpeta específica (como `sena_mvc` vía ZIP), **no podrás usar comandos de Git en tu terminal**. En su lugar, puedes subir tus cambios directamente desde el navegador:

1. Entra a la carpeta correspondiente en GitHub desde tu navegador (por ejemplo: `MARTES/sena_mvc`).
2. En la esquina superior derecha de la lista de archivos, haz clic en el botón **`Add file`** ➔ **`Upload files`**.
3. Arrastra los archivos o carpetas que modificaste desde tu equipo.
4. En la parte inferior, escribe un mensaje descriptivo en la casilla del commit (ejemplo: *"Ajustes en el frontend por Tomás"*).
5. Haz clic en el botón verde **`Commit changes`**.

¡Y listo! Tus cambios se guardarán automáticamente en esa carpeta sin necesidad de tener todo el repositorio sincronizado en tu computadora.
