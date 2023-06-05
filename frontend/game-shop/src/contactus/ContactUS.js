import "./ContactUs.css";
import React, {  useState } from "react";
import axios from "axios";
import { url } from '../client/config'

// import background from '../image/con.webp'


function ContactUs() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/inbox/`, { subject, email, body });
      console.log("Message sent successfully:", response.data);
      // Reset the form fields after successful submission
      setSubject("");
      setEmail("");
      setBody('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="pic"
    // style={{
    //   backgroundImage: `url(${background})`,
    // }}
      >
    <div  className="contact-container">
      <h2>שלח הודעה</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div>
          <label htmlFor="subject">נושא:</label>
          <input
            type="text"
            id="subject"
            name="subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">אימייל:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">תוכן:</label>
          <textarea
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={800} 
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
    </div>
  );
}

export default ContactUs;
