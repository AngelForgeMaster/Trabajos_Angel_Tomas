from sqlalchemy.ext.asyncio import AsyncSession 
from sqlalchemy.future import select 
from app import schemas 
from app.models import UsuarioModel, DepartamentoModel, ProyectoModel, DireccionModel 
from app.security import encriptar_password
from sqlalchemy.orm import selectinload
 
# --- USUARIOS --- 
async def obtener_usuarios(db: AsyncSession): 
    result = await db.execute(select(UsuarioModel)) 
    return result.scalars().all() 
 
async def obtener_proyecto_por_id(
    db: AsyncSession,
    proyecto_id: int
):
    result = await db.execute(
        select(ProyectoModel).options(
            selectinload(ProyectoModel.empleados).selectinload(
                UsuarioModel.departamento
            ).selectinload(
                DepartamentoModel.direccion
            ),
            selectinload(ProyectoModel.empleados).selectinload(
                UsuarioModel.proyectos
            )
        ).filter(
            ProyectoModel.id == proyecto_id
        )
    )

    return result.scalars().first()
 
 
async def crear_usuario(db: AsyncSession, usuario: schemas.UsuarioCreate): 
    password_segura = encriptar_password(usuario.password) 
    nuevo_usuario = UsuarioModel( 
        nombre=usuario.nombre, 
        email=usuario.email, 
        password=password_segura, 
        rol=usuario.rol, 
        departamento_id=usuario.departamento_id 
    ) 
    db.add(nuevo_usuario) 
    await db.commit() 
    await db.refresh(nuevo_usuario) 
    return nuevo_usuario 
 
async def actualizar_usuario(db: AsyncSession, usuario_id: int, usuario_data: schemas.UsuarioUpdate): 
    db_usuario = await obtener_usuario_por_id(db, usuario_id) 
    if db_usuario: 
        datos = usuario_data.model_dump(exclude_unset=True) 
        if "password" in datos and datos["password"]: 
            datos["password"] = encriptar_password(datos["password"]) 
        for llave, valor in datos.items(): 
            setattr(db_usuario, llave, valor) 
        await db.commit() 
        await db.refresh(db_usuario) 
    return db_usuario 
 
async def eliminar_usuario(db: AsyncSession, usuario_id: int): 
    db_usuario = await obtener_usuario_por_id(db, usuario_id) 
    if db_usuario: 
        await db.delete(db_usuario) 
        await db.commit() 
        return True 
    return False 
 
# --- DEPARTAMENTOS --- 
async def obtener_departamentos(db: AsyncSession): 
    result = await db.execute(select(DepartamentoModel)) 
    return result.scalars().all() 
 
async def crear_departamento(db: AsyncSession, depto: schemas.DepartamentoCreate): 
    nuevo_depto = DepartamentoModel( 
        nombre=depto.nombre, 
        codigo=depto.codigo, 
        direccion_id=depto.direccion_id 
    ) 
    db.add(nuevo_depto) 
    await db.commit() 
    await db.refresh(nuevo_depto) 
    return nuevo_depto 

async def obtener_departamento_por_id(
    db: AsyncSession,
    departamento_id: int
):
    result = await db.execute(
        select(DepartamentoModel).filter(
            DepartamentoModel.id == departamento_id
        )
    )

    return result.scalars().first()

async def actualizar_departamento(
    db: AsyncSession,
    departamento_id: int,
    departamento_data: schemas.DepartamentoUpdate
):
    departamento = await obtener_departamento_por_id(
        db,
        departamento_id
    )

    if departamento:

        datos = departamento_data.model_dump(
            exclude_unset=True
        )

        for llave, valor in datos.items():
            setattr(departamento, llave, valor)

        await db.commit()
        await db.refresh(departamento)

    return departamento

async def eliminar_departamento(
    db: AsyncSession,
    departamento_id: int
):
    departamento = await obtener_departamento_por_id(
        db,
        departamento_id
    )

    if departamento:
        await db.delete(departamento)
        await db.commit()
        return True

    return False
 
# --- DIRECCIONES --- 
async def obtener_direcciones(db: AsyncSession): 
    result = await db.execute(select(DireccionModel)) 
    return result.scalars().all() 
 
async def obtener_direccion_por_id(
    db: AsyncSession,
    direccion_id: int
):
    result = await db.execute(
        select(DireccionModel).filter(
            DireccionModel.id == direccion_id
        )
    )

    return result.scalars().first() 
 
async def crear_direccion(db: AsyncSession, direccion: schemas.DireccionCreate): 
    nueva_dir = DireccionModel(nombre=direccion.nombre) 
    db.add(nueva_dir) 
    await db.commit() 
    await db.refresh(nueva_dir) 
    return nueva_dir 

async def actualizar_direccion(
    db: AsyncSession,
    direccion_id: int,
    direccion_data: schemas.DireccionUpdate
):
    direccion = await obtener_direccion_por_id(
        db,
        direccion_id
    )

    if direccion:

        datos = direccion_data.model_dump(
            exclude_unset=True
        )

        for llave, valor in datos.items():
            setattr(direccion, llave, valor)

        await db.commit()
        await db.refresh(direccion)

    return direccion

async def eliminar_direccion(
    db: AsyncSession,
    direccion_id: int
):
    direccion = await obtener_direccion_por_id(
        db,
        direccion_id
    )

    if direccion:
        await db.delete(direccion)
        await db.commit()
        return True

    return False
 
# --- PROYECTOS --- 
async def obtener_proyectos(
    db: AsyncSession
):
    result = await db.execute(
        select(ProyectoModel)
    )

    return result.scalars().all()

async def obtener_proyecto_por_id(
    db: AsyncSession,
    proyecto_id: int
):
    result = await db.execute(
        select(ProyectoModel).filter(
            ProyectoModel.id == proyecto_id
        )
    )

    return result.scalars().first()

async def actualizar_proyecto(
    db: AsyncSession,
    proyecto_id: int,
    proyecto_data: schemas.ProyectoUpdate
):
    proyecto = await obtener_proyecto_por_id(
        db,
        proyecto_id
    )

    if proyecto:

        datos = proyecto_data.model_dump(
            exclude_unset=True
        )

        for llave, valor in datos.items():
            setattr(proyecto, llave, valor)

        await db.commit()
        await db.refresh(proyecto)

    return proyecto

async def crear_proyecto(db: AsyncSession, proyecto: schemas.ProyectoCreate): 
    nuevo_proyecto = ProyectoModel(nombre=proyecto.nombre, descripcion=proyecto.descripcion) 
    db.add(nuevo_proyecto) 
    await db.commit() 
    await db.refresh(nuevo_proyecto) 
    return nuevo_proyecto 

async def eliminar_proyecto(
    db: AsyncSession,
    proyecto_id: int
):
    proyecto = await obtener_proyecto_por_id(
        db,
        proyecto_id
    )

    if proyecto:
        await db.delete(proyecto)
        await db.commit()
        return True

    return False
 
async def asignar_empleado_a_proyecto(
    db: AsyncSession,
    usuario_id: int,
    proyecto_id: int
):
    usuario = await obtener_usuario_por_id(
        db,
        usuario_id
    )

    proyecto = await obtener_proyecto_por_id(
        db,
        proyecto_id
    )

    if not usuario or not proyecto:
        return None

    usuario.proyectos.append(proyecto)

    await db.commit()
    await db.refresh(usuario)

    return usuario
