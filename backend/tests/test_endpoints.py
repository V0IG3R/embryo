from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_initiate_validation():
    payload = {
        "business_concept": "Online tutoring platform",
        "target_market": "Students and professionals",
        "usp": "Personalized learning experience",
        "stage": "ideation",
        "competitors": "Coursera, Udemy",
        "revenue_model": "Subscription-based"
    }
    response = client.post("/api/idea/validate/init", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "trend_analysis" in data
    assert "follow_up_questions" in data

# Additional tests can be added for investor, reminders, startup, content, and pitch practice endpoints.
