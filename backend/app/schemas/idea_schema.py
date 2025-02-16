from pydantic import BaseModel

class IdeaDetails(BaseModel):
    business_concept: str
    usp: str
    target_market: str
    region: str = ""           # NEW field for geographical region
    additional_details: str = ""

class FollowUpResponse(BaseModel):
    idea_details: IdeaDetails

class ValidationReport(BaseModel):
    report: str
