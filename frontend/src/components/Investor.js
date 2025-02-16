import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { FaUserTie, FaFileAlt } from 'react-icons/fa';
import '../styles/App.css'; // Adjust the path as needed

function Investor() {
  const [matchResult, setMatchResult] = useState("");
  const [pitchDeck, setPitchDeck] = useState([]);
  const [matchForm, setMatchForm] = useState({
    business_concept: "",
    usp: "",
    target_market: "",
    region: "",
    additional_details: ""
  });
  const [deckForm, setDeckForm] = useState({
    business_concept: "",
    usp: "",
    target_market: "",
    region: "",
    additional_details: ""
  });

  const handleMatchChange = (e) => {
    setMatchForm({ ...matchForm, [e.target.name]: e.target.value });
  };

  const handleDeckChange = (e) => {
    setDeckForm({ ...deckForm, [e.target.name]: e.target.value });
  };

  const submitMatch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/investor/match", { idea_details: matchForm });
      setMatchResult(response.data.matched_investors);
    } catch (error) {
      console.error(error);
      setMatchResult("Error matching investors.");
    }
  };

  const submitDeck = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/investor/generate-pitch-deck", { idea_details: deckForm });
      setPitchDeck(response.data.pitch_deck);
    } catch (error) {
      console.error(error);
      setPitchDeck([{ title: "Error", content: "Could not generate pitch deck." }]);
    }
  };

  return (
    <Layout>
      <div className="investor-container">
        <h1 className="page-title">Investor Matchmaking &amp; Pitch Deck</h1>
        
        <section className="form-section investor-card">
          <h2 className="section-title">
            <FaUserTie className="section-icon" /> Match Investors
          </h2>
          <form onSubmit={submitMatch} className="form-content">
            <input
              type="text"
              name="business_concept"
              placeholder="Business Concept"
              value={matchForm.business_concept}
              onChange={handleMatchChange}
              required
            />
            <input
              type="text"
              name="usp"
              placeholder="USP"
              value={matchForm.usp}
              onChange={handleMatchChange}
              required
            />
            <input
              type="text"
              name="target_market"
              placeholder="Target Market"
              value={matchForm.target_market}
              onChange={handleMatchChange}
              required
            />
            <input
              type="text"
              name="region"
              placeholder="Region"
              value={matchForm.region}
              onChange={handleMatchChange}
              required
            />
            <textarea
              name="additional_details"
              placeholder="Additional Details"
              value={matchForm.additional_details}
              onChange={handleMatchChange}
            ></textarea>
            <button type="submit" className="btn">Find Investors</button>
          </form>
          {matchResult && <div className="result">{matchResult}</div>}
        </section>
        
        <hr className="divider" />
        
        <section className="form-section investor-card">
          <h2 className="section-title">
            <FaFileAlt className="section-icon" /> Generate Pitch Deck
          </h2>
          <form onSubmit={submitDeck} className="form-content">
            <input
              type="text"
              name="business_concept"
              placeholder="Business Concept"
              value={deckForm.business_concept}
              onChange={handleDeckChange}
              required
            />
            <input
              type="text"
              name="usp"
              placeholder="USP"
              value={deckForm.usp}
              onChange={handleDeckChange}
              required
            />
            <input
              type="text"
              name="target_market"
              placeholder="Target Market"
              value={deckForm.target_market}
              onChange={handleDeckChange}
              required
            />
            <input
              type="text"
              name="region"
              placeholder="Region"
              value={deckForm.region}
              onChange={handleDeckChange}
              required
            />
            <textarea
              name="additional_details"
              placeholder="Additional Details"
              value={deckForm.additional_details}
              onChange={handleDeckChange}
            ></textarea>
            <button type="submit" className="btn">Generate Pitch Deck</button>
          </form>
          {pitchDeck.length > 0 && (
            <div className="pitch-deck-cards">
              {pitchDeck.map((slide, index) => (
                <div key={index} className="pitch-deck-card">
                  <h3>{slide.title}</h3>
                  <p>{slide.content}</p>
                  {slide.infographic && slide.infographic !== "" && (
                    <img
                      className="slide-infographic"
                      src={slide.infographic}
                      alt={`Slide ${index + 1}`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default Investor;
