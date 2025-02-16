import json
from app.services.openai_service import ask_llm

def generate_investor_pitch(idea_details: dict, investor_details: dict) -> str:
    """
    Generate an investor pitch email or deck based on business idea details and investor background.
    """
    prompt = f"""
    Based on the following business idea details and investor background, 
    generate a persuasive investor pitch email that outlines the opportunity, 
    the business potential, and why this investor should be excited to invest.
    
    Business Idea Details:
    {json.dumps(idea_details, indent=2)}
    
    Investor Details:
    {json.dumps(investor_details, indent=2)}
    """
    return ask_llm(prompt)
