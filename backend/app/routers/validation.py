from fastapi import APIRouter
from app.schemas.idea_schema import IdeaDetails, FollowUpResponse, ValidationReport
from app.services.openai_service import ask_llm

router = APIRouter()

@router.post("/validate/finalize", response_model=dict)
async def finalize_validation(data: FollowUpResponse):
    idea = data.idea_details
    prompt = f"""
Analyze the following startup idea details and provide a detailed report.
Include a "Feasibility Score:" (0-100), then an "Analysis:" section, and then list "Follow-up Questions:" (one per line).
Do not use markdown formatting.

Business Concept: {idea.business_concept}
Unique Selling Proposition: {idea.usp}
Target Market: {idea.target_market}
Additional Details: {idea.additional_details}
    """
    result_text = ask_llm(prompt)
    return {"report": result_text}

@router.post("/validate/complete", response_model=ValidationReport)
async def complete_validation(data: dict):
    idea = data.get("idea_details", {})
    followup_answers = data.get("followup_answers", [])
    prompt = f"""
Given the startup idea details:
- Business Concept: {idea.get('business_concept')}
- USP: {idea.get('usp')}
- Target Market: {idea.get('target_market')}
- Additional Details: {idea.get('additional_details')}

And the follow-up answers:
{chr(10).join(followup_answers)}

Provide a final comprehensive analysis with clear sections:
Feasibility Score:
Analysis:
Recommendations:
Do not use markdown formatting.
    """
    report = ask_llm(prompt)
    return ValidationReport(report=report)
