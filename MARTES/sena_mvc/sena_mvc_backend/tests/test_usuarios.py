import pytest


@pytest.mark.asyncio
async def test_usuarios_sin_token(client):

    response = await client.get(
        "/usuarios/"
    )

    assert response.status_code == 401


@pytest.mark.asyncio
async def test_listar_usuarios(
    client,
    admin_headers
):

    response = await client.get(
        "/usuarios/",
        headers=admin_headers
    )

    assert response.status_code == 200

    usuarios = response.json()

    assert isinstance(
        usuarios,
        list
    )

    assert len(usuarios) > 0


@pytest.mark.asyncio
async def test_admin_existe(client):

    login = await client.post(
        "/login",
        data={
            "username": "admin@sena.edu.co",
            "password": "Admin123*"
        }
    )

    token = login.json()["access_token"]

    response = await client.get(
        "/usuarios/",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    usuarios = response.json()

    assert any(
        u["email"] == "admin@sena.edu.co"
        for u in usuarios
    )
