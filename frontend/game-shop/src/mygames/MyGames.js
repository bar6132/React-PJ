import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import nopic from "../image/no-pic.jpg";
import "./MyGames.css";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

function EditGameForm({ gameData, onHide, gameId }) {
  const [formData, setFormData] = useState(gameData);
  const { url } = useContext(AppContext);
  const token = window.localStorage.getItem("token");

  const handleInputChange = (event) => {
    const { name, type, value, files } = event.target;
    if (type === "file") {
      // Only handle file input fields
      const [file] = files; // Get the first file from the fileList
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file instanceof File ? file : prevFormData[name], // Use the previous file value if `file` is not an instance of File
      }));
    } else {
      // Handle other input fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "put",
      url: `${url}game/${formData.id}`, // Pass the `gameId` variable as parameter
      data: formData,
      headers: {
        Authorization: `Token ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then(() => {
        alert("המשחק התעדכן בהצלחה");
      })
      .catch((error) => {
        console.error("Error adding game:", error);
      });

    console.log("Submitted form data:", formData);
    onHide(); // Call the `onHide` prop to close the modal
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {formData.game_type === "new" || formData.game_type === "old" ? (
            <div className="form-group">
              <label htmlFor="console">Console:</label>
              <select
                id="console"
                name="console"
                value={formData.console}
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option className="option" value="PS3">
                  PS3
                </option>
                <option value="PS4">PS4</option>
                <option value="PS5">PS5</option>
                <option value="Xbox 360">Xbox 360</option>
                <option value="Xbox One">Xbox One</option>
                <option value="Xbox Series X/S">Xbox Series X/S</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="console">Console:</label>
              <select
                id="console"
                name="console"
                value={formData.console}
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option value="PS2">PS2</option>
                <option value="PS ONE">PS ONE</option>
                <option value="Wii">Wii</option>
                <option value="PSP">PSP</option>
                <option value="Game Boye">Game Boye</option>
                <option value="Atari">Atari</option>
                <option value="Nintendo DS">Nintendo DS</option>
                <option value="Xbox Original">Xbox Original</option>
                <option value="PC">PC</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="game_name">Game Name:</label>
            <input
              type="text"
              id="game_name"
              name="game_name"
              value={formData.game_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="game_img">Image:</label>
            {formData.game_img && (
              <img
                src={formData.game_img}
                alt="Game Preview"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            )}
            <input
              type="file"
              id="game_img"
              name="game_img"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
}

function MyGames() {
  const { storeData } = useContext(AppContext);
  const url = "http://127.0.0.1:8000/api";
  const userProfile = JSON.parse(localStorage.getItem("UserProfile"));
  const currentUser = userProfile?.id;

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const handleEditClick = (id) => {
    console.log("Clicked game ID:", id);
    setSelectedGameId(id); // Store the selected game ID in state
    setShowEditModal(true); // Show the edit modal
  };

  const handleModalHide = () => {
    setShowEditModal(false); // Hide the edit modal
    setSelectedGameId(null); // Reset the selected game ID
  };

  // Add a null/undefined check before calling map()
  if (storeData === null || storeData === undefined) {
    return <p>עדיין לא הוספת משחקים</p>;
  }

  return (
    <>
      <div className="game-list">
        {storeData.map(
          ({ id, console, game_name, price, game_img, uploader }) =>
            uploader === currentUser && (
              <div key={id} className="game-card">
                <Card>
                  {game_img ? (
                    <Card.Img variant="top" src={`${url}${game_img}`} />
                  ) : (
                    <Card.Img variant="top" src={nopic} /> // display the no-pic image if game_img is null or empty
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
                  <Card.Body>
                    <Button
                      className="game-edit-link"
                      onClick={() => handleEditClick(id)}
                    >
                      ערוך
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            )
        )}
      </div>

      <Modal show={showEditModal} onHide={handleModalHide}>
        {selectedGameId !== null && (
          <EditGameForm
            gameData={storeData.find((game) => game.id === selectedGameId)}
            onHide={handleModalHide}
          />
        )}
      </Modal>
    </>
  );
}

export default MyGames;
