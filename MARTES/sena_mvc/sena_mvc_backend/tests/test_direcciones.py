import pytest


@pytest.mark.asyncio
async def test_listar_direcciones(client):

    response = await client.get(
        "/direcciones/"
    )

    assert response.status_code == 200

    direcciones = response.json()

    assert len(direcciones) > 0


@pytest.mark.asyncio
async def test_direccion_formacion_existe(client):

    response = await client.get(
        "/direcciones/"
    )

    direcciones = response.json()

    existe = any(
        d["nombre"]
        == "Dirección de Formación Profesional"
        for d in direcciones
    )

    assert existe
