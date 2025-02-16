from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Startup Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict this to your domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import (
    validation,
    investor,
    reminders,
    pitch_practice,
    chat,
    startup  # NEW: added startup router
)

app.include_router(validation.router, prefix="/api/idea", tags=["Idea Validation"])
app.include_router(investor.router, prefix="/api/investor", tags=["Investor"])
app.include_router(reminders.router, prefix="/api/reminders", tags=["Reminders"])
app.include_router(pitch_practice.router, prefix="/api/pitch-practice", tags=["Pitch Practice"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(startup.router, prefix="/api/startup", tags=["Startup"])
