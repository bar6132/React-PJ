import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import nopic from "../image/no-pic.jpg";
import "./GameList.css";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { url } from '../client/config'
import axios from "axios";



function GameList() {
  const { storeData } = useContext(AppContext);
  const [gameNameFilter, setGameNameFilter] = useState("");
  const [consoleFilter, setConsoleFilter] = useState("");
  const [profileData, setProfileData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [uploader, setUploader] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  

  const getUploader = (uploader) => {
    axios
      .get(`${url}/uploader/${uploader}`)
      .then((response) => {
        const data = response.data;
        setProfileData(data);
        
        setShowModal(true);
        const userId = data.user; 
        setUploader(userId); 
        console.log(uploader);
        console.log(profileData);
        console.log(userId); //
      })
      .catch((error) => console.log(error));
  };
  
  

  const handleCloseModal = () => {
    setName("")
    setSubject("")
    setEmail("")
    setBody("")
    setShowModal(false);
  };
  

  if (storeData === null || storeData === undefined) {
    return <p>Loading data...</p>;
  }

  const filteredData = storeData.filter((game) => {
    const gameNameMatch =
      game.game_name.toLowerCase().includes(gameNameFilter.toLowerCase()) ||
      gameNameFilter === "";
    const consoleMatch =
      game.console.toLowerCase().includes(consoleFilter.toLowerCase()) ||
      consoleFilter === "";
    return gameNameMatch && consoleMatch;
  });

  let consoles = [...new Set(storeData.map((game) => game.console))];
  consoles.sort();

  const handleConsoleButtonClick = (console) => {
    setConsoleFilter(console);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      sender: name,
      recipient: uploader, 
      subject: subject,
      content: body,
      email: email,
    };
  
    axios
      .post(`${url}/users/${uploader}/inbox/`, formData) 
      .then((response) => {
        console.log('Message sent successfully!');
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  };

  return (
    <>
      <div className="filter-section">
        <div className="search-bar">
          <h2 className="header">חפש</h2>
          <input
            type="text"
            placeholder="סינון משחק לפי שם"
            value={gameNameFilter}
            onChange={(e) => setGameNameFilter(e.target.value)}
          />
        </div>
        <div className="console-buttons">
          <button
            className={`console-button ${consoleFilter === "" ? "active" : ""}`}
            onClick={() => setConsoleFilter("")}
          >
            All Consoles
          </button>
          {consoles.map((console) => (
            <div key={console} className="console-button-wrapper">
              <button
                className={`console-button ${
                  consoleFilter === console ? "active" : ""
                }`}
                onClick={() => handleConsoleButtonClick(console)}
              >
                {console}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="game-list">
        {filteredData.map(
          ({ id, console, game_name, price, game_img, uploader }) => (
            <div key={id} className="game-card">
              <Card>
                {game_img ? (
                  <Card.Img variant="top" src={`${url}${game_img}`} />
                ) : (
                  <Card.Img variant="top" src={nopic} />
                )}
                <Card.Body>
                  <Card.Title className="game-card-title">
                    {game_name}
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="game-details-item">
                    קונסולה: {console}
                  </ListGroup.Item>
                  <ListGroup.Item className="game-details-item">
                    מחיר: ₪{price}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Button
                    className="game-contact-link"
                    onClick={() => getUploader(uploader)}
                  >
                    פרטי קשר
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )
        )}
        
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="custom-modal-title">פרטי קשר</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal">
          <p> מיקום: {profileData.location}</p>
          {profileData.phonecontact && <p>טלפון: {profileData.phone}</p>}
          {profileData.emailcontact && <p>אימייל: {profileData.email}</p>}
          {profileData.webcontact && (
            <div>
              <h2>שלח הודעה</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">שם:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                  <label htmlFor="email">אימייל/טלפון:</label>
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
                    maxLength={400}
                  ></textarea>
                </div>
                <input
                  type="hidden"
                  name="recipient"
                  value={uploader} 
                />
  <button type="submit">Send</button>
              </form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default GameList;
