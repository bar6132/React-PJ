import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import SideBar from "../components/SideBar";
import nopic from "../image/no-pic.jpg";

function GameList() {
  const { storeData } = useContext(AppContext);
  console.log(storeData);
  const url = "http://127.0.0.1:8000/api";
  const userProfile = JSON.parse(localStorage.getItem("UserProfile"));
  const currentUser = userProfile.id;

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
      <div style={{ width: "87%" }}>
        <SideBar />

        {storeData.map(
          ({ id, console, game_name, price, game_img, uploader }) => (
            <div key={id} style={{ display: "inline-flex" }}>
              <Card
                style={{
                  width: "17rem",
                  direction: "rtl",
                  textAlign: "center",
                }}
              >
                {game_img ? ( // check if game_img is not null or empty
                  <Card.Img
                    variant="top"
                    src={`${url}${game_img}`}
                    style={{ height: "300px" }}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src={nopic}
                    style={{ height: "300px" }}
                  /> // display the no-pic image if game_img is null or empty
                )}
                <Card.Body>
                  <Card.Title>{game_name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>קונסולה : {console} </ListGroup.Item>
                  <ListGroup.Item>מחיר : ₪{price}</ListGroup.Item>
                  <ListGroup.Item>מעלה על ידי : {uploader}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  {uploader === currentUser && ( // check if the uploader matches the current user
                    <Card.Body>
                      <Card.Link onClick={() => handleEditClick(id)}>
                        ערוך
                      </Card.Link>
                    </Card.Body>
                  )}
                  <Card.Link href="#">פרטי קשר </Card.Link>
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
