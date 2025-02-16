from fastapi import APIRouter

router = APIRouter()

notifications = []

@router.post("/create")
async def create_reminder(reminder: dict):
    message = f"{reminder.get('title', 'No Title')} - {reminder.get('description', '')}"
    notifications.append(message)
    return {"message": f"Reminder '{reminder.get('title')}' set."}

@router.get("/notifications")
async def get_notifications():
    return {"notifications": notifications}
