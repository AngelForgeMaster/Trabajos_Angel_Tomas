from contextlib import asynccontextmanager 
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware 
from app.database import engine, Base 
from app.routers import auth_routes, user_routes, department_routes, project_routes, direction_routes, report_routes
 
@asynccontextmanager 
async def lifespan(app: FastAPI): 
    async with engine.begin() as conn: 
        await conn.run_sync(Base.metadata.create_all)   
    yield 
 
app = FastAPI( 
    title="SENA MVC Backend - Async PostgreSQL API", 
    description="Backend educativo aplicando el patron MVC Asíncrono con FastAPI y PostgreSQL", 
    version="1.0.0", 
    lifespan=lifespan 
) 
 
app.add_middleware( 
    CORSMiddleware, 
    allow_origins=[
        "http://localhost:5173"], 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
) 
 
app.include_router(auth_routes.router) 
app.include_router(user_routes.router) 
app.include_router(department_routes.router) 
app.include_router(project_routes.router) 
app.include_router(direction_routes.router)
app.include_router(report_routes.router)
 
@app.get("/") 
async def inicio(): 
    return {"mensaje": "Bienvenido al Backend MVC Asincrono con PostgreSQL"} 
