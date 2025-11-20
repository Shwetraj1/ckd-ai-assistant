from fastapi import APIRouter
from pydantic import BaseModel
from app.services.azure_openai_client import ask_azure_openai

router = APIRouter()

CKD_SYSTEM_PROMPT = """
You are NephroCare AI — an assistant for CKD patients.
Provide simple explanations.
Always say 'I am not a doctor.'
Avoid medical diagnosis.
"""

class ChatRequest(BaseModel):
    message: str

@router.post("/ask")
def ask_chat(req: ChatRequest):
    reply = ask_azure_openai(CKD_SYSTEM_PROMPT, req.message)
    return {"reply": reply}
