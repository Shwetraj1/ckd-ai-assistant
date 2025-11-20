from fastapi import APIRouter, UploadFile, File
from PIL import Image
import pytesseract
import io
from app.services.azure_openai_client import ask_azure_openai

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

router = APIRouter()

@router.post("/upload")
async def upload_lab_report(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    text = pytesseract.image_to_string(image)

    return {"extracted_text": text}


@router.post("/analyze")
async def analyze_lab_report(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    extracted_text = pytesseract.image_to_string(image)

    system_prompt = """
You are a medical AI assistant specialized in Chronic Kidney Disease (CKD).
Analyze the following lab values and provide:
1. Which values are normal or abnormal
2. What this means for the patient
3. Possible health risks
4. Simple explanation in patient-friendly language
5. Basic precautions or recommendations

Do NOT prescribe medication. Only provide guidance.
"""

    analysis = ask_azure_openai(system_prompt, extracted_text)

    return {
        "extracted_text": extracted_text,
        "analysis": analysis
    }
