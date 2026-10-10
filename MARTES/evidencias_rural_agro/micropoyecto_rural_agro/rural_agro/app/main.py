from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles

from app.database import engine, Base
from app.routers import auth_routes, user_routes, finca_routes, parcela_routes, cultivo_routes


app = FastAPI(
    title="Rural Agro",
    description="Backend oficial de RuralAgro.",
    version="1.0.0",
    docs_url=None
)

# 2. ponemos al static para ponerle estilos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configuración del Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro de routers
app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(finca_routes.router)
app.include_router(parcela_routes.router)
app.include_router(cultivo_routes.router)

# 3. Endpoint personalizado con CSS puesto

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Swagger UI",
        swagger_js_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="/static/custom_swagger.css",  # Usamos directamente tu CSS personalizado
        swagger_favicon_url="https://fastapi.tiangolo.com/img/favicon.png"
    )

@app.get("/")
def inicio():
    return {"mensaje": "Bienvenido al Backend de Rural Agro"}