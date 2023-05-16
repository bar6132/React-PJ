import React, { useContext } from "react";
import { AppContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import nopic from "../image/no-pic.jpg";
import "./MyGames.css";
import { Button } from "react-bootstrap";

function MyGames() {
  const { storeData } = useContext(AppContext);
  const url = "http://127.0.0.1:8000/api";
  const userProfile = JSON.parse(localStorage.getItem("UserProfile"));
  const currentUser = userProfile?.id;

  const handleEditClick = (id) => {
    console.log("Clicked game ID:", id);
    // Add your logic here to handle the edit functionality
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
    </>
  );
}

export default MyGames;
