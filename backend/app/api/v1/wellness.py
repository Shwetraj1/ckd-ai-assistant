from fastapi import APIRouter
from pydantic import BaseModel
from app.services.azure_openai_client import ask_azure_openai

router = APIRouter()

class WellnessRequest(BaseModel):
    message: str

@router.post("/chat")
def wellness_chat(req: WellnessRequest):
    system_prompt = """
You are a calm, supportive mental wellness companion for CKD patients.
Provide emotional support, stress management tips, and motivation.
Do NOT give medical or medication advice.
Keep responses kind, short, and human.
"""
    reply = ask_azure_openai(system_prompt, req.message)
    return {"reply": reply}
