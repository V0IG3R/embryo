from pydantic import BaseModel

class ContentRequest(BaseModel):
    content_prompt: str

class ContentResponse(BaseModel):
    content: str
