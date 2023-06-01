import React from "react";
import background from "../image/home.jpg";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import nopic from "../image/no-pic.jpg";
import "./Home.css";
import { Button } from "react-bootstrap";

function Home() {
  const { storeData } = useContext(AppContext);
  const [profileData, setProfileData] = useState({});
  const [selectedUploader, setSelectedUploader] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getUploader = (uploader) => {
    fetch(`${url}/uploader/${uploader}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setShowModal(true);

        console.log(profileData);
      })
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const url = "http://127.0.0.1:8000/api";

  // Add a null/undefined check before calling map()
  if (storeData === null || storeData === undefined) {
    return <p>Loading data...</p>;
  }
  const sortedData = [...storeData].sort((a, b) => b.id - a.id);
  const recentGames = sortedData.slice(0, 5);

  return (
    <div
      className="hbg"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <h1 className="head">ברוך הבאה לארקייד</h1>
      <div className="game-list center">
        {recentGames.map(
          ({ id, console, game_name, price, game_img, uploader }) => {
            return (
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
                    <ListGroup.Item className="game-details-item">
                      מעלה על ידי: {uploader}
                    </ListGroup.Item>
                  </ListGroup>

                  <Button
                    className="game-contact-link"
                    onClick={() => setSelectedUploader(uploader)}
                  >
                    פרטי קשר: {selectedUploader ===  uploader ? profileData.location : "לחץ להצגת פרטי הקשר"}
                  </Button>
                </Card>
              </div>
            );
          }
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>פרטי קשר</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>מיקום: {profileData.location}</p>
          {/* Add additional profile data here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
