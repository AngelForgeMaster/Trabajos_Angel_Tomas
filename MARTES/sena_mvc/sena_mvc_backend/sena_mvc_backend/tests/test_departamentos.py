import pytest


@pytest.mark.asyncio
async def test_listar_departamentos(client):

    response = await client.get(
        "/departamentos/"
    )

    assert response.status_code == 200

    departamentos = response.json()

    assert isinstance(
        departamentos,
        list
    )

    assert len(departamentos) > 0


@pytest.mark.asyncio
async def test_departamento_ds001_existe(client):

    response = await client.get(
        "/departamentos/"
    )

    departamentos = response.json()

    existe = any(
        dep["codigo"] == "DS001"
        for dep in departamentos
    )

    assert existe