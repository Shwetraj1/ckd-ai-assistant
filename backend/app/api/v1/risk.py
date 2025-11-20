from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class RiskInput(BaseModel):
    creatinine: float | None = None
    egfr: float | None = None
    hb: float | None = None

@router.post("/assess")
def assess_risk(data: RiskInput):
    # Very simple rule-based logic – good enough for v1
    risk = "Low"
    reasons = []

    if data.egfr is not None and data.egfr < 30:
        risk = "High"
        reasons.append("eGFR < 30 suggests advanced kidney damage.")
    elif data.egfr is not None and data.egfr < 60:
        risk = "Moderate"
        reasons.append("eGFR between 30–60 suggests reduced kidney function.")

    if data.creatinine is not None and data.creatinine > 1.5:
        if risk == "Low":
            risk = "Moderate"
        reasons.append("Creatinine is above normal range.")
    
    if data.hb is not None and data.hb < 11:
        reasons.append("Low hemoglobin suggests anemia, common in CKD.")

    if not reasons:
        reasons.append("All key values within acceptable range.")

    return {"risk_level": risk, "reasons": reasons}
