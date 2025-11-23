from fastapi import APIRouter, UploadFile, File
from PIL import Image
import pytesseract
import io
from app.services.azure_openai_client import ask_azure_openai
import re

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

router = APIRouter()

def extract_numeric_value(text, keyword):
    pattern = rf"{keyword}[:\s]*([\d.]+)"
    match = re.search(pattern, text, re.IGNORECASE)
    return float(match.group(1)) if match else None

def clinical_flagging_report(text):
    flags = []

    creatinine = extract_numeric_value(text, "creatinine")
    urea = extract_numeric_value(text, "urea")
    hb = extract_numeric_value(text, "hb|hemoglobin")

    if creatinine:
        if creatinine >= 3:
            flags.append({"parameter": "Creatinine", "value": creatinine, "severity": "CRITICAL", "message": "Severe kidney dysfunction risk"})
        elif creatinine > 1.5:
            flags.append({"parameter": "Creatinine", "value": creatinine, "severity": "WARNING", "message": "Elevated kidney stress"})

    if urea:
        if urea > 50:
            flags.append({"parameter": "Urea", "value": urea, "severity": "WARNING", "message": "High waste retention detected"})

    if hb:
        if hb < 9:
            flags.append({"parameter": "Hemoglobin", "value": hb, "severity": "CRITICAL", "message": "Severe anemia risk"})
        elif hb < 11:
            flags.append({"parameter": "Hemoglobin", "value": hb, "severity": "WARNING", "message": "Possible renal anemia"})

    return flags


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
You are a clinical decision-support AI for Chronic Kidney Disease (CKD).

Using the lab values provided, generate a structured medical summary with:

1. STATUS TABLE:
   - Test Name | Value | Normal Range | Status (Normal/High/Low)

2. CLINICAL INTERPRETATION:
   - What these results indicate clinically

3. RISK LEVEL:
   - Low / Moderate / High (with reason)

4. PATIENT EXPLANATION (Simple language, 3-4 lines)

5. ACTION GUIDANCE (No medications)
   - Lifestyle advice
   - Monitoring recommendations
   - When to consult a doctor

Avoid unnecessary verbosity. Be professional, accurate, and clear.
"""

    analysis = ask_azure_openai(system_prompt, extracted_text)

    clinical_flags = clinical_flagging_report(extracted_text)

    return {
        "extracted_text": extracted_text,
        "analysis": analysis,
        "clinical_flags": clinical_flags
    }
