from fastapi import APIRouter
from app.services.openai_service import ask_llm

router = APIRouter()

@router.post("/roadmap", response_model=dict)
async def generate_roadmap(payload: dict):
    idea = payload.get("idea_details", {})
    prompt = f"""
Generate a detailed startup roadmap for the following idea in a timeline format.
Each step should be labeled "Step X:" and separated by a horizontal line (e.g., "----------------------------------").
Include milestone icons (for example, "🔹") at key events.
Do not use markdown formatting.

Business Concept: {idea.get('business_concept', '')}
USP: {idea.get('usp', '')}
Target Market: {idea.get('target_market', '')}
Region: {idea.get('region', '')}
Additional Details: {idea.get('additional_details', '')}
    """
    roadmap = ask_llm(prompt)
    return {"roadmap": roadmap}
