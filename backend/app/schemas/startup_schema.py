from pydantic import BaseModel
from app.schemas.idea_schema import IdeaDetails

class StartupRoadmapRequest(BaseModel):
    idea_details: IdeaDetails

class StartupRoadmapResponse(BaseModel):
    roadmap: str
