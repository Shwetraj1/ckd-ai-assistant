from fastapi import APIRouter

router = APIRouter()

@router.get("/summary")
def progress_summary():
    # Hard-coded sample, just for dashboard demo
    return {
        "creatinine_trend": [1.8, 1.9, 2.0],
        "hb_trend": [10.5, 11.0, 11.2],
        "risk_trend": ["High", "Moderate", "Moderate"]
    }
