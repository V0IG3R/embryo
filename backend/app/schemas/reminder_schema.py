from pydantic import BaseModel

class ReminderRequest(BaseModel):
    title: str
    meeting_time: str  # ISO datetime string
    description: str

class ReminderResponse(BaseModel):
    message: str
