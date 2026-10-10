import pytest


@pytest.mark.asyncio
async def test_login_admin(client):

    response = await client.post(
        "/login",
        data={
            "username": "admin@sena.edu.co",
            "password": "Admin123*"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"