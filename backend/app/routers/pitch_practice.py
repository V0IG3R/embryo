from fastapi import APIRouter, UploadFile, File
from app.services.pitch_practice_service import (
    transcribe_audio,
    generate_live_feedback,
    generate_final_feedback_voice,
)
from app.schemas.pitch_practice_voice_schema import LivePitchResponse

router = APIRouter()

@router.post("/initial", response_model=LivePitchResponse)
async def pitch_practice_initial(pitch_audio: UploadFile = File(...)):
    """
    Endpoint to submit an initial pitch recording.
    Returns the transcribed pitch text.
    """
    transcript = await transcribe_audio(pitch_audio)
    # No feedback provided at this stage.
    return {"transcript": transcript, "feedback": "", "audio_url": ""}

@router.post("/submit")
async def pitch_practice_submit(pitch_text: str, answer_audios: list[UploadFile] = File(...)):
    """
    Endpoint for submitting follow-up answer recordings.
    Generates final feedback based on the pitch text and follow-up answers.
    """
    answers = []
    for audio in answer_audios:
        transcript = await transcribe_audio(audio)
        answers.append(transcript)
    result = generate_final_feedback_voice(pitch_text, answers)
    return result

@router.post("/live", response_model=LivePitchResponse)
async def pitch_practice_live(pitch_audio: UploadFile = File(...)):
    """
    Endpoint for live pitch practice.
    Transcribes the pitch and provides immediate feedback with a voice response.
    """
    transcript = await transcribe_audio(pitch_audio)
    feedback_data = generate_live_feedback(transcript)
    return {"transcript": transcript, **feedback_data}
