import React from "react";
import background from "../image/home.jpg";
import { useContext } from "react";
import { AppContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import nopic from "../image/no-pic.jpg";
import "./Home.css";

function Home() {
  const { storeData } = useContext(AppContext);
  console.log(storeData);
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
          ({ id, console, game_name, price, game_img }) => (
            <div key={id} className="game-card">
              {" "}
              <Card>
                {" "}
                {game_img ? ( // check if game_img is not null or empty
                  <Card.Img variant="top" src={`${url}${game_img}`} />
                ) : (
                  <Card.Img variant="top" src={nopic} /> // display the no-pic image if game_img is null or empty
                )}{" "}
                <Card.Body>
                  {" "}
                  <Card.Title className="game-card-title">
                    {game_name}{" "}
                  </Card.Title>{" "}
                </Card.Body>{" "}
                <ListGroup className="list-group-flush">
                  {" "}
                  <ListGroup.Item className="game-details-item">
                    קונסולה : {console}{" "}
                  </ListGroup.Item>{" "}
                  <ListGroup.Item className="game-details-item">
                    מחיר : ₪{price}{" "}
                  </ListGroup.Item>{" "}
                </ListGroup>{" "}
                <Card.Body>
                  {" "}
                  <Card.Link className="game-contact-link" href="#">
                    פרטי קשר{" "}
                  </Card.Link>
                </Card.Body>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
