import io
import json
import tempfile
import requests
from typing import List, Dict
from fastapi import UploadFile
import whisper
from app.services.openai_service import ask_llm
from app.config import ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID

# Load the Whisper model (using the 'base' model; adjust as necessary)
whisper_model = whisper.load_model("base")

async def transcribe_audio(audio_file: UploadFile) -> str:
    """
    Transcribe an uploaded audio file using OpenAI Whisper.
    """
    audio_bytes = await audio_file.read()
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name
    result = whisper_model.transcribe(tmp_path)
    transcript = result.get("text", "")
    return transcript

def text_to_speech(text: str) -> str:
    """
    Convert text to speech using the ElevenLabs API.
    Returns a URL for the generated audio file.
    If an error occurs, logs the error and returns an empty string.
    """
    try:
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{ELEVENLABS_VOICE_ID}"
        headers = {
            "Accept": "audio/mpeg",
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json"
        }
        data = {
            "text": text,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.5}
        }
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()  # Will raise an exception for non-200 responses
        # For now, return a placeholder URL. In production, you’d store the file and return its URL.
        return "http://localhost:8000/static/feedback_audio.mp3"
    except Exception as e:
        print("Error in text_to_speech:", e)
        return ""  # Return empty string as fallback

def generate_live_feedback(pitch_text: str) -> Dict[str, str]:
    """
    Generate immediate live feedback for a spoken pitch.
    Uses the LLM to provide constructive feedback, then converts that feedback to speech.
    """
    prompt = (
        f"Act as a pitch coach. The speaker just presented the following pitch: '{pitch_text}'. "
        "Provide immediate, constructive, and encouraging feedback in one or two sentences."
    )
    live_feedback = ask_llm(prompt)
    audio_url = text_to_speech(live_feedback)
    return {"feedback": live_feedback, "audio_url": audio_url}

def generate_final_feedback_voice(pitch_text: str, answers: List[str]) -> Dict[str, str]:
    """
    Generate final constructive feedback based on the pitch and follow-up answers.
    """
    prompt = (
        f"The speaker presented the following pitch:\n\"{pitch_text}\"\n"
        f"They provided these responses:\n{json.dumps(answers, indent=2)}\n"
        "Based on this, provide constructive feedback and suggestions for improvement."
    )
    feedback = ask_llm(prompt)
    audio_url = text_to_speech(feedback)
    return {"feedback": feedback, "audio_url": audio_url}
