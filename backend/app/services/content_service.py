from app.services.openai_service import ask_llm

def generate_marketing_content(content_prompt: str) -> str:
    """
    Generate engaging marketing content for the provided topic.
    """
    prompt = f"Generate engaging marketing content for the following topic:\n{content_prompt}"
    return ask_llm(prompt)
