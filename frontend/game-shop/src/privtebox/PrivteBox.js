import React, { useContext, useEffect, useState } from 'react';
import { url } from '../client/config'


function PrivteBox() {
  const [messages, setMessages] = useState([]);
  const [senderNames, setSenderNames] = useState([]);
  

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('UserProfile'));
    const userId = userProfile ? userProfile.id : null;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${url}/users/${userId}/inbox/`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchSenderNames = async () => {
      const senderIds = messages.map((message) => message.sender);
      const names = await Promise.all(
        senderIds.map(async (senderId) => {
          try {
            const response = await fetch(`${url}/getuser/${senderId}`);
            const data = await response.json();
            return data.username;
          } catch (error) {
            console.log('Error fetching sender name:', error);
            return '';
          }
        })
      );
      setSenderNames(names);
    };

    fetchSenderNames();
  }, [messages, url]);

  return (
    <div>
      <h2>Private Inbox</h2>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message, index) => (
            <li key={message.id}>
              <h4>Subject: {message.subject}</h4>
              <p>Content: {message.content}</p>
              <p>Sender: {senderNames[index]}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
}

export default PrivteBox;
