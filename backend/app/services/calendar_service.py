from app.schemas.reminder_schema import ReminderRequest

def create_reminder(reminder: ReminderRequest) -> str:
    """
    Create a meeting reminder.
    (Placeholder: In production, integrate with Google Calendar API or another free calendar API.)
    """
    return f"Reminder '{reminder.title}' set for {reminder.meeting_time}. Description: {reminder.description}"
