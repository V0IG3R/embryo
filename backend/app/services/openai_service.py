from langchain_groq import ChatGroq
from langchain.schema import HumanMessage
from app.config import GROQ_API_KEY

# Initialize the Groq-based LLM agent
chat = ChatGroq(
    temperature=0.7,
    model_name="llama-3.1-8b-instant",
    groq_api_key=GROQ_API_KEY
)

def ask_llm(prompt: str) -> str:
    """Send a prompt to the LLM and return its response."""
    response = chat([HumanMessage(content=prompt)])
    return response.content.strip()
