import pytest


@pytest.mark.asyncio
async def test_listar_proyectos(client):

    response = await client.get(
        "/proyectos/"
    )

    assert response.status_code == 200

    proyectos = response.json()

    assert len(proyectos) > 0


@pytest.mark.asyncio
async def test_proyecto_adso_existe(client):

    response = await client.get(
        "/proyectos/"
    )

    proyectos = response.json()

    existe = any(
        p["nombre"]
        == "Sistema de Gestión ADSO"
        for p in proyectos
    )

    assert existe