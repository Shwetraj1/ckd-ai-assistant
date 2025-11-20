from fastapi import APIRouter
from pydantic import BaseModel
from app.services.azure_openai_client import ask_azure_openai

router = APIRouter()

class DietRequest(BaseModel):
    stage: str  # e.g. "Stage 3 CKD"
    restrictions: str | None = None  # e.g. "diabetes, low potassium"
    notes: str | None = None         # extra info

@router.post("/generate")
def generate_diet(req: DietRequest):
    system_prompt = """
You are a renal dietitian AI.
Create a 1-day meal plan for a CKD patient.
Respect typical CKD restrictions (low sodium, controlled protein, limit potassium & phosphorus).
Return sections:
1) Key dietary principles
2) Breakfast
3) Lunch
4) Snacks
5) Dinner
6) Foods to AVOID
Use simple language. Do not mention you are an AI.
"""
    user_msg = f"CKD stage: {req.stage}\nRestrictions: {req.restrictions}\nNotes: {req.notes}"
    plan = ask_azure_openai(system_prompt, user_msg)
    return {"meal_plan": plan}
