import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { FiMapPin } from 'react-icons/fi';

function Roadmap() {
  const [form, setForm] = useState({
    business_concept: "",
    usp: "",
    target_market: "",
    region: "",
    additional_details: ""
  });
  const [roadmap, setRoadmap] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRoadmap = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/startup/roadmap", { idea_details: form });
      setRoadmap(response.data.roadmap);
    } catch (error) {
      console.error(error);
      setRoadmap("Error generating roadmap.");
    }
  };

  // Format the roadmap text: trim each line and remove empty lines.
  const formattedRoadmap = roadmap
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  return (
    <Layout>
      <h1>Roadmap Generator</h1>
      <form onSubmit={submitRoadmap} className="form-section">
        <input
          type="text"
          name="business_concept"
          placeholder="Business Concept"
          value={form.business_concept}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="usp"
          placeholder="USP"
          value={form.usp}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="target_market"
          placeholder="Target Market"
          value={form.target_market}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={form.region}
          onChange={handleChange}
          required
        />
        <textarea
          name="additional_details"
          placeholder="Additional Details"
          value={form.additional_details}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn">Generate Roadmap</button>
      </form>
      {roadmap && formattedRoadmap.length > 0 && (
        <div className="roadmap-result">
          <h2>Roadmap</h2>
          <div className="roadmap-timeline">
            {formattedRoadmap.map((line, index) => {
              // Highlight text before a colon.
              let content = line;
              if (line.includes(':')) {
                const parts = line.split(':');
                const title = parts[0];
                const rest = parts.slice(1).join(':');
                content = `<span class="highlight">${title}:</span> ${rest}`;
              }
              // Alternate sides: even indexes on left, odd on right.
              const sideClass = index % 2 === 0 ? 'left' : 'right';
              return (
                <div key={index} className={`timeline-step ${sideClass}`}>
                  <FiMapPin className="timeline-icon" />
                  <div
                    className="timeline-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Roadmap;
