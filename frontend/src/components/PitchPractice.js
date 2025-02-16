import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import Layout from './Layout';
import '../styles/App.css'; // Ensure this path matches your project structure

function PitchPractice() {
  const [recording, setRecording] = useState(false);
  const [recordStatus, setRecordStatus] = useState("");
  const [pitchText, setPitchText] = useState("");
  const [finalFeedback, setFinalFeedback] = useState("");
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      // When recording stops, automatically send the audio for live feedback.
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "audio/wav" });
        submitLiveFeedback(blob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setRecordStatus("Recording... Speak now.");
    } catch (err) {
      console.error(err);
      setRecordStatus("Error accessing microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setRecordStatus("Processing your pitch...");
    }
  };

  const submitLiveFeedback = async (blob) => {
    const formData = new FormData();
    formData.append('pitch_audio', blob, 'recorded.wav');
    try {
      const response = await axios.post("http://localhost:8000/api/pitch-practice/live", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPitchText(response.data.transcript);
      setFinalFeedback(response.data.feedback);
      
      // Auto-play the voice feedback.
      const audio = new Audio(response.data.audio_url);
      audio.play();
      setRecordStatus("Feedback received. Try again if you'd like.");
    } catch (error) {
      console.error(error);
      setRecordStatus("Error during live feedback.");
    }
  };

  return (
    <Layout>
      <div className="pitch-practice-container">
        <h1>Live Pitch Practice</h1>
        <div className="form-section">
          <h2>Speak and Get Live Feedback</h2>
          <div className="button-container">
            <button onClick={startRecording} className="btn" disabled={recording}>
              <FaMicrophone className="icon" /> Start Speaking
            </button>
            <button onClick={stopRecording} className="btn" disabled={!recording}>
              <FaStop className="icon" /> Stop Speaking
            </button>
          </div>
          <p className="record-status">{recordStatus}</p>
          {pitchText && (
            <div className="pitch-transcript">
              <h3>Your Pitch Transcript:</h3>
              <pre className="result">{pitchText}</pre>
            </div>
          )}
          {finalFeedback && (
            <div className="feedback-section">
              <h3>Coach's Feedback:</h3>
              <pre className="result">{finalFeedback}</pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PitchPractice;
