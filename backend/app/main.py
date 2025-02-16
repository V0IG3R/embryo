from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="AI Startup Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict this to your domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import (
    validation_router,
    investor_router,
    reminders_router,
    pitch_practice_router,
    chat_router,
    startup_router,
)

app.include_router(validation_router, prefix="/api/idea", tags=["Idea Validation"])
app.include_router(investor_router, prefix="/api/investor", tags=["Investor"])
app.include_router(reminders_router, prefix="/api/reminders", tags=["Reminders"])
app.include_router(pitch_practice_router, prefix="/api/pitch-practice", tags=["Pitch Practice"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(startup_router, prefix="/api/startup", tags=["Startup"])

# Mount static files if you need to serve them (e.g., feedback_audio.mp3)
app.mount("/static", StaticFiles(directory="static"), name="static")
