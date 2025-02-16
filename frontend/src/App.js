import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Feasibility from './components/Feasibility';
import Management from './components/Management';
import Notifications from './components/Notifications';
import Chatbot from './components/Chatbot';
import PitchPractice from './components/PitchPractice';
import Investor from './components/Investor';
import Roadmap from './components/Roadmap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feasibility" element={<Feasibility />} />
        <Route path="/management" element={<Management />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/pitch" element={<PitchPractice />} />
        <Route path="/investor" element={<Investor />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </Router>
  );
}

export default App;
