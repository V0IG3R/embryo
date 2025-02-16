import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const carouselImages = [
  `${process.env.PUBLIC_URL}/images/abstract1.jpg`,
  `${process.env.PUBLIC_URL}/images/abstract2.jpg`,
  `${process.env.PUBLIC_URL}/images/abstract3.jpeg`,
  `${process.env.PUBLIC_URL}/images/abstract4.jpg`,
  `${process.env.PUBLIC_URL}/images/abstract5.jpg`
];

function FullScreenGallery({ images }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const slides = containerRef.current.querySelectorAll('.gallery-slide');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.6 }
    );
    slides.forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="full-screen-gallery">
      {images.map((src, index) => (
        <div key={index} className="gallery-slide" style={{ backgroundImage: `url(${src})` }}></div>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="home-container">
      <header className="page-header">
        <Link to="/" className="home-button"><FaHome /> Home</Link>
        <div className="logo">
          <div className="logo-circle">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="embryo logo" />
          </div>
          <h1>embryo</h1>
        </div>
      </header>
      <FullScreenGallery images={carouselImages} />
      <section className="home-grid">
        <Link to="/feasibility" className="card">Idea Feasibility</Link>
        <Link to="/management" className="card">Business Management</Link>
        <Link to="/notifications" className="card">Meeting Notifications</Link>
        <Link to="/pitch" className="card">Pitch Practice</Link>
        <Link to="/investor" className="card">Investor & Pitch Deck</Link>
        <Link to="/chatbot" className="card">Chatbot</Link>
        <Link to="/roadmap" className="card">Roadmap Generator</Link>
      </section>
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

export default Home;
