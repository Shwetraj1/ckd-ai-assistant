from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Med(BaseModel):
    name: str
    dose: str
    time: str  # "morning", "evening", etc.

# VERY simple in-memory store – resets when server restarts
MEDS: list[Med] = []

@router.post("/add")
def add_med(med: Med):
    MEDS.append(med)
    return {"status": "added", "total": len(MEDS)}

@router.get("/list")
def list_meds():
    return {"medications": MEDS}
