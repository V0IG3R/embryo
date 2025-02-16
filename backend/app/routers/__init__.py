from .validation import router as validation_router
from .investor import router as investor_router
from .reminders import router as reminders_router
from .pitch_practice import router as pitch_practice_router
from .chat import router as chat_router
from .startup import router as startup_router

__all__ = [
    "validation_router",
    "investor_router",
    "reminders_router",
    "pitch_practice_router",
    "chat_router",
    "startup_router",
]
