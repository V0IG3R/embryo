import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from './Layout';

function Feasibility() {
  const questions = [
    "What is your business idea?",
    "What is your unique selling proposition (USP)?",
    "Who is your target market?",
    "Which region are you based in?",
    "Please provide any additional details about your idea."
  ];

  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([{ sender: "bot", message: questions[0] }]);
  const [finalReport, setFinalReport] = useState("");
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [followUpAnswers, setFollowUpAnswers] = useState([]);
  const [followUpStep, setFollowUpStep] = useState(0);
  const [askingFollowUp, setAskingFollowUp] = useState(false);

  const chatContainerRef = useRef(null);

  // Scroll to bottom whenever chat updates.
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const addMessage = (sender, message) => {
    setChat(prev => [...prev, { sender, message }]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const answer = input;
    addMessage("user", answer);
    setInput("");

    // Update responses based on current step.
    const updatedResponses = { ...responses };
    if (step === 0) updatedResponses.business_concept = answer;
    else if (step === 1) updatedResponses.usp = answer;
    else if (step === 2) updatedResponses.target_market = answer;
    else if (step === 3) updatedResponses.region = answer;
    else if (step === 4) updatedResponses.additional_details = answer;
    setResponses(updatedResponses);

    // If still asking initial questions.
    if (!askingFollowUp && step < questions.length - 1) {
      setStep(step + 1);
      addMessage("bot", questions[step + 1]);
    }
    // After initial questions, process the idea.
    else if (!askingFollowUp) {
      addMessage("bot", "Processing your idea...");
      try {
        const payload = { idea_details: updatedResponses };
        const res = await axios.post("http://localhost:8000/api/idea/validate/finalize", payload);
        const reportText = res.data.report;
        const splitIndex = reportText.indexOf("Follow-up Questions:");
        let analysis = "";
        let followUps = [];
        if (splitIndex !== -1) {
          analysis = reportText.substring(0, splitIndex).trim();
          const followUpText = reportText.substring(splitIndex + "Follow-up Questions:".length).trim();
          followUps = followUpText.split("\n").filter(q => q.trim() !== "");
        } else {
          analysis = reportText;
        }
        addMessage("bot", "Analysis: " + analysis);
        if (followUps.length > 0) {
          setFollowUpQuestions(followUps);
          setAskingFollowUp(true);
          setFollowUpStep(0);
          addMessage("bot", "Follow-up: " + followUps[0]);
        } else {
          setFinalReport(analysis);
        }
      } catch (error) {
        console.error(error);
        addMessage("bot", "Error processing your idea.");
      }
    }
    // In follow-up stage.
    else {
      const newFollowUpAnswers = [...followUpAnswers, answer];
      setFollowUpAnswers(newFollowUpAnswers);
      if (followUpStep < followUpQuestions.length - 1) {
        setFollowUpStep(followUpStep + 1);
        addMessage("bot", "Follow-up: " + followUpQuestions[followUpStep + 1]);
      } else {
        addMessage("bot", "Processing final analysis...");
        try {
          const payload = { idea_details: responses, followup_answers: newFollowUpAnswers };
          const res = await axios.post("http://localhost:8000/api/idea/validate/complete", payload);
          const finalText = res.data.report;
          addMessage("bot", "Final Report: " + finalText);
          setFinalReport(finalText);
          setAskingFollowUp(false);
        } catch (error) {
          console.error(error);
          addMessage("bot", "Error finalizing your analysis.");
        }
      }
    }
  };

  return (
    <Layout>
      <h1>Idea Feasibility</h1>
      <div className="chat-container" ref={chatContainerRef}>
        {chat.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.message}
          </div>
        ))}
      </div>
      {!finalReport && (
        <form onSubmit={handleSend} className="chat-form">
          <input
            type="text"
            placeholder="Type your answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button type="submit" className="btn">Send</button>
        </form>
      )}
      {finalReport && (
        <div className="final-report">
          <h2>Final Report</h2>
          <p>{finalReport}</p>
        </div>
      )}
    </Layout>
  );
}

export default Feasibility;
