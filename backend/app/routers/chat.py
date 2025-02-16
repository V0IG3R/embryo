from fastapi import APIRouter, HTTPException
from app.services.openai_service import ask_llm

router = APIRouter()

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
    # Removed notifications handling as it was causing potential issues
    prompt = f"Answer this entrepreneurial question in plain text:\n\n{user_message}"
    try:
        response_text = ask_llm(prompt)
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in general chat: {e}")
