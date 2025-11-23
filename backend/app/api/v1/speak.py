from fastapi import APIRouter
from app.services.tts_service import speak_text

router = APIRouter()

@router.post("/speak")
def generate_audio(message: str):
    file = speak_text(message)
    return {"audio_file": file}
