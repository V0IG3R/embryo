from fastapi import APIRouter
from app.schemas.content_schema import ContentRequest, ContentResponse
from app.services.content_service import generate_marketing_content

router = APIRouter()

@router.post("/generate", response_model=ContentResponse)
async def generate_content(request: ContentRequest):
    content = generate_marketing_content(request.content_prompt)
    return ContentResponse(content=content)
