from pydantic import BaseModel

class LivePitchResponse(BaseModel):
    transcript: str
    feedback: str
    audio_url: str
