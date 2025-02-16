from pydantic import BaseModel
from app.schemas.idea_schema import IdeaDetails
from typing import Dict

class InvestorPitchRequest(BaseModel):
    idea_details: IdeaDetails
    investor_details: Dict[str, str]

class InvestorPitchResponse(BaseModel):
    pitch: str
