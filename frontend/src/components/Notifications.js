import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/reminders/notifications");
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Layout>
      <h1>Meeting Notifications</h1>
      <div className="notifications-container">
        {notifications.map((n, i) => (
          <div key={i} className="notification">{n}</div>
        ))}
      </div>
      <button className="btn" onClick={loadNotifications}>Refresh Notifications</button>
    </Layout>
  );
}

export default Notifications;
