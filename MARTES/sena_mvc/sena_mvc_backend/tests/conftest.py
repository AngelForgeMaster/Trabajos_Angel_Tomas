import asyncio
import sys
from pathlib import Path

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(
        asyncio.WindowsSelectorEventLoopPolicy()
    )

BASE_DIR = Path(__file__).resolve().parent.parent

if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

import pytest_asyncio
from httpx import AsyncClient, ASGITransport

from app.main import app


@pytest_asyncio.fixture
async def client():

    transport = ASGITransport(app=app)

    async with AsyncClient(
        transport=transport,
        base_url="http://test"
    ) as ac:
        yield ac


@pytest_asyncio.fixture
async def admin_token(client):

    response = await client.post(
        "/login",
        data={
            "username": "admin@sena.edu.co",
            "password": "Admin123*"
        }
    )

    assert response.status_code == 200

    return response.json()["access_token"]


@pytest_asyncio.fixture
async def admin_headers(admin_token):

    return {
        "Authorization": f"Bearer {admin_token}"
    }