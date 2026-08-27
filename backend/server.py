import os
import logging
from datetime import datetime, timezone
from typing import List, Optional, Annotated

from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("dmc")

app = FastAPI(title="Duraimohan Classics Museum API")
api = APIRouter(prefix="/api")


def _to_str(v) -> str:
    return str(v)


PyObjectId = Annotated[str, BeforeValidator(_to_str)]

SEED_VERSION = 4  # bump to reseed


class CarBase(BaseModel):
    year: str
    make: str
    model: str = ""
    category: str = "Classic"
    origin: str = ""
    vehicle_type: str = "CAR"
    description: str = ""
    image_url: str = ""
    featured: bool = False


class CarCreate(CarBase):
    pass


class Car(CarBase):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    order: int = 0
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def wm(name: str) -> str:
    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{name}"


SEED_CARS = [
    {"year": "1924", "make": "Chevrolet", "category": "Cylinder · Early classic", "origin": "American", "vehicle_type": "CAR", "image_url": "", "description": "A survivor from the dawn of the automobile age and the cornerstone of the DMC register.", "featured": False},
    {"year": "1935", "make": "Ford Deluxe Phaeton", "category": "V8 · Pre-war tourer", "origin": "American", "vehicle_type": "CAR", "image_url": "", "description": "A pre-war open tourer with sweeping fenders and an unmistakable art-deco silhouette.", "featured": False},
    {"year": "1936", "make": "Austin", "category": "Cylinder · British classic", "origin": "British", "vehicle_type": "CAR", "image_url": "", "description": "British engineering from the golden pre-war years, restored to its original character.", "featured": False},
    {"year": "1948", "make": "Bell Standard", "category": "Standard Vanguard", "origin": "British", "vehicle_type": "CAR", "image_url": "", "description": "A rounded post-war British saloon, elegant and rare on Indian roads.", "featured": False},
    {"year": "1953", "make": "Ford Mercury Monterey", "category": "V8 · American classic", "origin": "American", "vehicle_type": "CAR", "image_url": "", "description": "Full-figured fifties Americana — chrome, curves and boulevard presence.", "featured": False},
    {"year": "1956", "make": "Citroën 2CV", "category": "French classic", "origin": "French", "vehicle_type": "CAR", "image_url": "", "description": "The charming French people's car — mechanically honest, endlessly loveable. The signature story of the DMC collection.", "featured": True},
    {"year": "1957", "make": "Dodge Kingsway Custom", "category": "American classic", "origin": "American", "vehicle_type": "CAR", "image_url": "", "description": "Tail-fin era Dodge with bold two-tone styling and a commanding stance.", "featured": False},
    {"year": "1959", "make": "Hindustan Ambassador Mark I", "category": "Classic Indian saloon", "origin": "Indian", "vehicle_type": "CAR", "image_url": "", "description": "The definitive Indian classic — the Ambassador that ruled the nation's roads.", "featured": False},
    {"year": "1960", "make": "Fiat 1100 Select", "category": "Fiat 1100 · Italian classic", "origin": "Italian", "vehicle_type": "CAR", "image_url": "", "description": "Compact Italian elegance, a familiar and beloved sight on Indian streets.", "featured": False},
    {"year": "1960", "make": "Willys Jeep Station Wagon", "category": "Classic Willys Jeep", "origin": "American", "vehicle_type": "CAR", "image_url": "", "description": "Rugged, utilitarian and full of character — a true workhorse classic.", "featured": False},
    {"year": "1961", "make": "Chevrolet Impala", "category": "Classic American saloon", "origin": "American", "vehicle_type": "CAR", "image_url": "", "description": "A cinematic American icon — long, low and dripping with sixties glamour.", "featured": True},
    {"year": "1964", "make": "Fiat 1100 Station Wagon", "category": "Familiare · Italian classic", "origin": "Italian", "vehicle_type": "CAR", "image_url": "", "description": "The practical Fiat estate — rare, characterful and beautifully preserved.", "featured": False},
    {"year": "1964", "make": "Volkswagen Beetle", "category": "Type 1 · Heritage Drive participant", "origin": "German", "vehicle_type": "CAR", "image_url": "", "description": "Documented by Autocar India in the 2020 Chennai–Pondy Heritage Drive.", "featured": True},
    {"year": "1965", "make": "Austin Mini Cooper", "category": "Mini Cooper S · British", "origin": "British", "vehicle_type": "CAR", "image_url": "", "description": "The pocket-sized giant killer — pure sixties driving joy.", "featured": False},
    {"year": "1968", "make": "Fiat 1100R", "category": "Fiat 1100 R · Italian", "origin": "Italian", "vehicle_type": "CAR", "image_url": "", "description": "A refined evolution of the beloved 1100 line.", "featured": False},
    {"year": "1969", "make": "Fiat 124 LHD Convertible", "category": "Convertible", "origin": "Italian", "vehicle_type": "CAR", "image_url": "", "description": "An open-top Italian spider — timeless lines and pure driving pleasure.", "featured": False},
    {"year": "1971", "make": "Volkswagen Bus Devon Camper", "category": "Type 2 · Camper", "origin": "German", "vehicle_type": "CAR", "image_url": "", "description": "The legendary VW camper — freedom, road trips and counter-culture charm.", "featured": False},
    {"year": "1975", "make": "Mercedes-Benz W115", "category": "Classic Mercedes-Benz", "origin": "German", "vehicle_type": "CAR", "image_url": "", "description": "Solid, understated German luxury built to last generations.", "featured": False},
    {"year": "1976", "make": "Fiat 126", "category": "City classic", "origin": "Italian", "vehicle_type": "CAR", "image_url": "", "description": "A tiny, cheerful city car with an outsized personality.", "featured": False},
    {"year": "1983", "make": "Mercedes-Benz W123 Sedan", "category": "Sedan", "origin": "German", "vehicle_type": "CAR", "image_url": "", "description": "One of the most durable Mercedes ever built — engineering perfection.", "featured": False},
    {"year": "1983", "make": "Mercedes-Benz W123 Estate", "category": "Station Wagon", "origin": "German", "vehicle_type": "CAR", "image_url": "", "description": "The elegant estate version of the legendary W123.", "featured": False},
    {"year": "1993", "make": "Mercedes-Benz W124 300D", "category": "Diesel", "origin": "German", "vehicle_type": "CAR", "image_url": "", "description": "The last of the over-engineered Mercedes — a modern classic.", "featured": False},
    {"year": "1962", "make": "Rajdoot", "category": "Classic motorcycle", "origin": "Indian", "vehicle_type": "BIKE", "image_url": "", "description": "A rugged Indian two-wheeler that carried a generation across the country.", "featured": False},
    {"year": "1967", "make": "Jawa", "category": "Classic motorcycle", "origin": "Czech", "vehicle_type": "BIKE", "image_url": "", "description": "The iconic Jawa — synonymous with classic motorcycling in India.", "featured": False},
    {"year": "1967", "make": "Lambretta", "category": "125 Special · Scooter", "origin": "Italian", "vehicle_type": "BIKE", "image_url": "", "description": "The elegant Italian scooter — style and freedom on two wheels.", "featured": False},
]


@api.get("/")
async def root():
    return {"message": "Duraimohan Classics Museum API", "status": "ok"}


@api.get("/cars", response_model=List[Car], response_model_by_alias=False)
async def list_cars():
    docs = await db.cars.find().sort("order", 1).to_list(1000)
    return [Car(**d) for d in docs]


@api.post("/cars", response_model=Car, response_model_by_alias=False)
async def create_car(payload: CarCreate):
    last = await db.cars.find().sort("order", -1).limit(1).to_list(1)
    next_order = (last[0]["order"] + 1) if last else 1
    doc = payload.model_dump()
    doc["order"] = next_order
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    res = await db.cars.insert_one(doc)
    created = await db.cars.find_one({"_id": res.inserted_id})
    return Car(**created)


@api.delete("/cars/{car_id}")
async def delete_car(car_id: str):
    try:
        oid = ObjectId(car_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id")
    res = await db.cars.delete_one({"_id": oid})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Car not found")
    return {"deleted": True}


@app.on_event("startup")
async def seed():
    meta = await db.meta.find_one({"_id": "seed"})
    if meta and meta.get("version") == SEED_VERSION:
        return
    for i, c in enumerate(SEED_CARS, start=1):
        d = dict(c)
        d["order"] = i
        d["created_at"] = datetime.now(timezone.utc).isoformat()
        await db.cars.update_one(
            {"year": d["year"], "make": d["make"]},
            {"$setOnInsert": d},
            upsert=True,
        )
    await db.meta.update_one({"_id": "seed"}, {"$set": {"version": SEED_VERSION}}, upsert=True)
    logger.info("Ensured %d seed vehicles exist without replacing collection data (v%d)", len(SEED_CARS), SEED_VERSION)


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
