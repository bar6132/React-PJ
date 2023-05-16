import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import SideBar from "../components/SideBar";
import nopic from "../image/no-pic.jpg";
import "./GameList.css";

function GameList() {
  const { storeData } = useContext(AppContext);
  console.log(storeData);
  const url = "http://127.0.0.1:8000/api";
  const userProfile = JSON.parse(localStorage.getItem("UserProfile"));
  const currentUser = userProfile?.id;

  const handleEditClick = (id) => {
    // Add your logic for handling the "edit" click here
    console.log("Edit clicked for game ID:", id);
  };

  // Add a null/undefined check before calling map()
  if (storeData === null || storeData === undefined) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <div className="game-list">
        <SideBar />

        {storeData.map(
          ({ id, console, game_name, price, game_img, uploader }) => (
            <div key={id} className="game-card">
              <Card>
                {game_img ? ( // check if game_img is not null or empty
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
                    קונסולה : {console}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item className="game-details-item">
                    מחיר : ₪{price}
                  </ListGroup.Item>
                  <ListGroup.Item className="game-details-item">
                    מעלה על ידי : {uploader}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  {uploader === currentUser && ( // check if the uploader matches the current user
                    <Card.Body>
                      <Card.Link
                        className="game-edit-link"
                        onClick={() => handleEditClick(id)}
                      >
                        ערוך
                      </Card.Link>
                    </Card.Body>
                  )}
                  <Card.Link className="game-contact-link" href="#">
                    פרטי קשר{" "}
                  </Card.Link>
                </Card.Body>
              </Card>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default GameList;
