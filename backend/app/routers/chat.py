from fastapi import APIRouter, HTTPException
from app.services.openai_service import ask_llm

router = APIRouter()

def extract_notifications(message: str) -> list:
    """
    A simple function that checks for keywords like 'meeting' or 'appointment'
    in the message and returns a list of reminder dictionaries.
    """
    reminders_extracted = []
    lower_msg = message.lower()
    if "meeting" in lower_msg:
        reminders_extracted.append({"title": "Meeting", "description": message})
    if "appointment" in lower_msg:
        reminders_extracted.append({"title": "Appointment", "description": message})
    return reminders_extracted

@router.post("/")
async def chat_default(payload: dict):
    """
    Default chat endpoint for POST /api/chat.
    Extracts notification data and then returns a general response.
    """
    user_message = payload.get("message", "")
    # Extract reminders from the message
    extracted = extract_notifications(user_message)
    # Import the global notifications list from reminders.py
    from app.routers.reminders import notifications
    for rem in extracted:
        msg = f"{rem.get('title', 'No Title')} - {rem.get('description', '')}"
        if msg not in notifications:
            notifications.append(msg)
    # Generate a response
    prompt = f"Answer this entrepreneurial question in plain text:\n\n{user_message}"
    try:
        response_text = ask_llm(prompt)
        if extracted:
            response_text += "\n\nReminders: " + ", ".join([r["title"] for r in extracted])
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in default chat: {e}")

@router.post("/feasibility")
async def chat_feasibility(payload: dict):
    user_message = payload.get("message", "")
    prompt = f"Act as an expert in startup idea feasibility. Answer in plain text:\n\n{user_message}"
    try:
        response_text = ask_llm(prompt)
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in feasibility chat: {e}")

@router.post("/management")
async def chat_management(payload: dict):
    user_message = payload.get("message", "")
    prompt = f"Act as a seasoned business manager. Provide advice in plain text:\n\n{user_message}"
    try:
        response_text = ask_llm(prompt)
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in management chat: {e}")

@router.post("/general")
async def chat_general(payload: dict):
    user_message = payload.get("message", "")
    # Extract reminders from the message
    extracted = extract_notifications(user_message)
    from app.routers.reminders import notifications
    for rem in extracted:
        msg = f"{rem.get('title', 'No Title')} - {rem.get('description', '')}"
        if msg not in notifications:
            notifications.append(msg)
    prompt = f"Answer this entrepreneurial question in plain text:\n\n{user_message}"
    try:
        response_text = ask_llm(prompt)
        if extracted:
            response_text += "\n\nReminders: " + ", ".join([r["title"] for r in extracted])
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in general chat: {e}")
