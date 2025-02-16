import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

function Chatbot() {
  const [chat, setChat] = useState([
    { sender: "bot", message: "Hey there! I'm your startup buddy. Tell me about your day – if you mention any meetings or appointments, I'll note them down!" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    const newChat = [...chat, { sender: "user", message: input }];
    setChat(newChat);
    setInput("");
    try {
      const response = await axios.post("http://localhost:8000/api/chat", { message: input });
      setChat(prev => [...prev, { sender: "bot", message: response.data.response.replace(/\n/g, "<br>") }]);
    } catch (error) {
      console.error(error);
      setChat(prev => [...prev, { sender: "bot", message: "Oops! Couldn't reach the server." }]);
    }
  };

  return (
    <Layout>
      <h1>Chatbot</h1>
      <div className="chat-container">
        {chat.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.message }}></div>
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-form">
        <input type="text" placeholder="Share your day..." value={input} onChange={e => setInput(e.target.value)} required />
        <button type="submit" className="btn">Send</button>
      </form>
    </Layout>
  );
}

export default Chatbot;
