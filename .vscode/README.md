# Embryo - AI-Powered Startup Assistance Platform

Embryo is an AI-driven platform designed to assist entrepreneurs in validating their ideas, generating investor pitches, creating startup roadmaps, setting up reminders, practicing pitch delivery, and managing business operations efficiently. The project consists of a **FastAPI** backend integrated with **Groq's LLM, LangChain, Firebase, and Google Trends**, and a **React-based frontend** styled with modern UI components.

## 📂 Project Structure

```
project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI app initialization and router inclusion
│   │   ├── config.py                 # Configuration variables (API keys, etc.)
│   │   ├── routers/
│   │   │   ├── validation.py         # Idea validation endpoints
│   │   │   ├── investor.py           # Investor pitch generation endpoints
│   │   │   ├── reminders.py          # Meeting reminder endpoints
│   │   │   ├── startup.py            # Startup roadmap generation endpoints
│   │   │   ├── content.py            # Marketing content generation endpoints
│   │   │   └── pitch_practice.py     # Voice-based Pitch Practice endpoints
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── db/
│   │   ├── utils/
│   │   ├── tests/
│   ├── requirements.txt              # Python dependencies
│   ├── Dockerfile                    # Containerization setup (optional)
│   ├── README.md
└── frontend/
    ├── package.json
    ├── public/
    ├── src/
    ├── components/
    ├── styles/
```

## 🚀 Features

### Backend (FastAPI)
- **Idea Validation**: Uses AI to analyze the feasibility of startup ideas.
- **Investor Pitch Generation**: Creates structured pitch decks for investors.
- **Startup Roadmap Generation**: Provides milestones for business growth.
- **Meeting Reminders**: Notifies users of important events.
- **Marketing Content Generation**: Generates promotional materials using AI.
- **Voice-Based Pitch Practice**: Uses STT + AI analysis for refining investor pitches.

### Frontend (React.js)
- **Interactive UI**: Responsive design with smooth animations.
- **AI-Powered Chatbot**: Provides business insights and recommendations.
- **Pitch Deck Visuals**: Generates animated pitch decks.
- **Dynamic Roadmap Display**: Organizes startup milestones visually.
- **Real-Time Notifications**: Ensures users never miss important updates.

## 🛠️ Setup Instructions

### Backend (FastAPI + Python 3.9+)

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/genm.git
   cd genm/backend
   ```
2. **Create a virtual environment & install dependencies:**
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. **Run the FastAPI server:**
   ```sh
   uvicorn app.main:app --reload
   ```
4. **API Documentation:** Open `http://127.0.0.1:8000/docs`

### Frontend (React + Vite)

1. **Navigate to the frontend directory:**
   ```sh
   cd ../frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. **Open the application in your browser:** Visit `http://localhost:5173`

## 🛠️ Tech Stack
- **Backend:** FastAPI, Groq LLM, LangChain, Firebase, Google Trends
- **Frontend:** React.js, Vite, HTML, CSS, JavaScript
- **Styling:** Tailwind CSS, Custom Animations
- **Database (Future Expansion):** Firebase

## 📌 Future Enhancements
- **Database Integration** (Firebase)
- **More AI Capabilities** (Custom models for prediction)
- **Mobile App Development**

## 📄 License
MIT License

## 👨‍💻 Contributors
- **Debarun Joardar** - Lead Developer & Project Owner
- **Deebyendu Mondal** - Web and UI Design
- **Uddipan Chakraborty** - Frontend Development



