import json
from app.services.openai_service import ask_llm

def generate_startup_roadmap(idea_details: dict) -> str:
    """
    Generate a comprehensive startup roadmap including short-, medium-, and long-term strategies.
    """
    prompt = f"""
    Based on the following business idea details, generate a comprehensive startup roadmap:
    
    {json.dumps(idea_details, indent=2)}
    
    The roadmap should include:
    - Short-term action items (ideation, validation, MVP)
    - Medium-term strategies (growth, market entry)
    - Long-term scaling and funding recommendations
    """
    return ask_llm(prompt)
