import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function Layout({ children }) {
  return (
    <div className="page">
      <header className="page-header">
        <Link to="/" className="home-button"><FaHome /> Home</Link>
        <div className="logo">
          <div className="logo-circle">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="embryo logo" />
          </div>
          <h1>embryo</h1>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bottom-nav">
        <Link to="/feasibility" className="nav-item">Feasibility</Link>
        <Link to="/management" className="nav-item">Management</Link>
        <Link to="/notifications" className="nav-item">Notifications</Link>
        <Link to="/chatbot" className="nav-item">Chatbot</Link>
        <Link to="/pitch" className="nav-item">Pitch</Link>
        <Link to="/investor" className="nav-item">Investor</Link>
        <Link to="/roadmap" className="nav-item">Roadmap</Link>
      </footer>
    </div>
  );
}

export default Layout;
