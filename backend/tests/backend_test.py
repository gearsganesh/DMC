import os
from dotenv import dotenv_values

import pytest
import requests

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
BASE_URL = base_url.rstrip("/")

REQUIRED_FIELDS = ["id", "year", "make", "model", "category", "origin", "description", "featured"]


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Module: root / health
class TestRoot:
    def test_root(self, client):
        r = client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json()["status"] == "ok"


# Module: GET /api/cars (seeded data)
class TestListCars:
    def test_list_cars(self, client):
        r = client.get(f"{BASE_URL}/api/cars")
        assert r.status_code == 200
        cars = r.json()
        assert isinstance(cars, list)
        assert len(cars) >= 14, f"expected >=14 seeded cars, got {len(cars)}"
        for c in cars:
            for f in REQUIRED_FIELDS:
                assert f in c, f"missing field {f} in {c}"
            assert "_id" not in c
            assert isinstance(c["id"], str) and len(c["id"]) == 24
        # spot check seed data
        makes = {(c["year"], c["make"]) for c in cars}
        assert ("1924", "Chevrolet") in makes
        assert ("1975", "Mercedes-Benz") in makes
        assert any(c["featured"] for c in cars)

    def test_order_sorted(self, client):
        cars = client.get(f"{BASE_URL}/api/cars").json()
        orders = [c["order"] for c in cars]
        assert orders == sorted(orders)


# Module: POST /api/cars + persistence + DELETE
class TestCarCrud:
    def test_create_persist_delete(self, client):
        payload = {
            "year": "1972",
            "make": "TEST_Porsche",
            "model": "911 Carrera",
            "origin": "German",
            "category": "Sports classic",
            "description": "A test entry",
            "featured": False,
        }
        r = client.post(f"{BASE_URL}/api/cars", json=payload)
        assert r.status_code == 200, r.text
        created = r.json()
        assert created["id"] and "_id" not in created
        for k, v in payload.items():
            assert created[k] == v
        cid = created["id"]

        # GET verifies persistence
        cars = client.get(f"{BASE_URL}/api/cars").json()
        match = [c for c in cars if c["id"] == cid]
        assert len(match) == 1
        assert match[0]["make"] == "TEST_Porsche"

        # DELETE
        d = client.delete(f"{BASE_URL}/api/cars/{cid}")
        assert d.status_code == 200
        assert d.json().get("deleted") is True

        cars = client.get(f"{BASE_URL}/api/cars").json()
        assert all(c["id"] != cid for c in cars)

    def test_create_validation_missing_required(self, client):
        r = client.post(f"{BASE_URL}/api/cars", json={"model": "no year or make"})
        assert r.status_code == 422, r.text

    def test_delete_invalid_id(self, client):
        r = client.delete(f"{BASE_URL}/api/cars/not-an-objectid")
        assert r.status_code == 400

    def test_delete_nonexistent_id(self, client):
        r = client.delete(f"{BASE_URL}/api/cars/64b7f9a2c1d4e5f6a7b8c9d0")
        assert r.status_code == 404
