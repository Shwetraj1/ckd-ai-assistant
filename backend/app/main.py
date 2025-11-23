from fastapi import FastAPI
from app.api.v1 import azure_chat
from app.api.v1 import labs, diet, wellness, risk, meds, progress
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# CORS setup
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    azure_chat.router,
    prefix="/api/v1/azure-chat",
    tags=["azure-chat"]
)

app.include_router(
    labs.router,
    prefix="/api/v1/labs",
    tags=["labs"]
)
app.include_router(diet.router,       prefix="/api/v1/diet",       tags=["diet"])
app.include_router(wellness.router,   prefix="/api/v1/wellness",   tags=["wellness"])
app.include_router(risk.router,       prefix="/api/v1/risk",       tags=["risk"])
app.include_router(meds.router,       prefix="/api/v1/meds",       tags=["meds"])
app.include_router(progress.router,   prefix="/api/v1/progress",   tags=["progress"])

