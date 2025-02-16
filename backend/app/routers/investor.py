import json
from fastapi import APIRouter, HTTPException
from app.services.openai_service import ask_llm

router = APIRouter()

@router.post("/match")
async def match_investors(payload: dict):
    idea = payload.get("idea_details", {})
    prompt = f"""
Based on the following startup idea details, list potential local investors with names and reasons.
Do not use any markdown formatting or asterisks. Format as a numbered list, one per line.

Business Concept: {idea.get('business_concept')}
USP: {idea.get('usp')}
Target Market: {idea.get('target_market')}
Region: {idea.get('region', '')}
Additional Details: {idea.get('additional_details')}
    """
    try:
        result = ask_llm(prompt)
        result = result.replace("*", "")
        return {"matched_investors": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error matching investors: {e}")

@router.post("/generate-pitch-deck")
async def generate_pitch_deck(payload: dict):
    idea = payload.get("idea_details", {})
    prompt = f"""
Generate a professional pitch deck for the following startup idea.
Output must be valid JSON, and nothing else. Do not include any markdown formatting.
The JSON object must have a key "slides" whose value is an array of slide objects.
Each slide object must have the keys: "title", "content", and "infographic" (a URL or description).
Include these sections in order:
1. Introduction
2. Problem Statement
3. Solution
4. Market Opportunity
5. Business Model
6. Competitive Advantage
7. Conclusion

Business Concept: {idea.get('business_concept')}
USP: {idea.get('usp')}
Target Market: {idea.get('target_market')}
Region: {idea.get('region', '')}
Additional Details: {idea.get('additional_details')}
    """
    try:
        result_text = ask_llm(prompt)
        result_json = json.loads(result_text)
        slides = result_json.get("slides", [])
    except Exception as e:
        slides = [{"title": "Error", "content": "Pitch deck generation failed. Please try again.", "infographic": ""}]
    return {"pitch_deck": slides}
