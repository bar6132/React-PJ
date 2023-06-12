import React, { useContext, useEffect, useState } from 'react';
import { url } from '../client/config'


function PrivteBox() {
  const [messages, setMessages] = useState([]);
  const [senderNames, setSenderNames] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  

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
  
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${url}/uploader/${userId}`);
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }
    };
  
    fetchMessages();
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>Private Inbox</h2>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message, index) => (
          <li key={message.id}>
          <h4>Subject: {message.subject}</h4>
          <p>Content: {message.content}</p>
          <p>Sender: {message.sender}</p> {/* Assuming the sender field is named 'sender' */}
          <p>Read: {message.is_read ? 'Yes' : 'No'}</p>
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
