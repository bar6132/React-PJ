// import React from "react";
// import { useContext } from "react";
// import { AppContext } from "../App";
// import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// import SideBar from "../components/SideBar";
// import nopic from "../image/no-pic.jpg";
// import "./GameList.css";

// function GameList() {
//   const { storeData } = useContext(AppContext);
//   console.log(storeData);
//   const url = "http://127.0.0.1:8000/api";
//   const userProfile = JSON.parse(localStorage.getItem("UserProfile"));
//   const currentUser = userProfile?.id;

//   const handleEditClick = (id) => {
//     // Add your logic for handling the "edit" click here
//     console.log("Edit clicked for game ID:", id);
//   };

//   // Add a null/undefined check before calling map()
//   if (storeData === null || storeData === undefined) {
//     return <p>Loading data...</p>;
//   }

//   return (
//     <> 
//     <SideBar />
//       <div className="game-list">
       

//         {storeData.map(
//           ({ id, console, game_name, price, game_img, uploader }) => (
//             <div key={id} className="game-card">
//               <Card>
//                 {game_img ? ( // check if game_img is not null or empty
//                   <Card.Img variant="top" src={`${url}${game_img}`} />
//                 ) : (
//                   <Card.Img variant="top" src={nopic} /> // display the no-pic image if game_img is null or empty
//                 )}
//                 <Card.Body>
//                   <Card.Title className="game-card-title">
//                     {game_name}
//                   </Card.Title>
//                 </Card.Body>
//                 <ListGroup className="list-group-flush">
//                   <ListGroup.Item className="game-details-item">
//                     קונסולה : {console}{" "}
//                   </ListGroup.Item>
//                   <ListGroup.Item className="game-details-item">
//                     מחיר : ₪{price}
//                   </ListGroup.Item>
//                   <ListGroup.Item className="game-details-item">
//                     מעלה על ידי : {uploader}
//                   </ListGroup.Item>
//                 </ListGroup>
//                 <Card.Body>
//                   {uploader === currentUser && ( // check if the uploader matches the current user
//                     <Card.Body>
//                       <Card.Link
//                         className="game-edit-link"
//                         onClick={() => handleEditClick(id)}
//                       >
//                         ערוך
//                       </Card.Link>
//                     </Card.Body>
//                   )}
//                   <Card.Link className="game-contact-link" href="#">
//                     פרטי קשר{" "}
//                   </Card.Link>
//                 </Card.Body>
//               </Card>
//             </div>
//           )
//         )}
//       </div>
//     </>
//   );
// }

// export default GameList;


// import React, { useState, useContext } from "react";
// import { AppContext } from "../App";
// import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// // import SideBar from "../components/SideBar";
// import nopic from "../image/no-pic.jpg";
// import "./GameList.css";

// function GameList() {
//   const { storeData } = useContext(AppContext);
//   const [gameNameFilter, setGameNameFilter] = useState("");
//   const [consoleFilter, setConsoleFilter] = useState("");

//   const url = "http://127.0.0.1:8000/api";
//   const userProfile = JSON.parse(localStorage.getItem("UserProfile"));
//   const currentUser = userProfile?.id;

//   const handleEditClick = (id) => {
//     console.log("Edit clicked for game ID:", id);
//   };

//   if (storeData === null || storeData === undefined) {
//     return <p>Loading data...</p>;
//   }

//   const filteredData = storeData.filter((game) => {
//     const gameNameMatch =
//       game.game_name.toLowerCase().includes(gameNameFilter.toLowerCase()) ||
//       gameNameFilter === "";
//     const consoleMatch =
//       game.console.toLowerCase().includes(consoleFilter.toLowerCase()) ||
//       consoleFilter === "";
//     return gameNameMatch && consoleMatch;
//   });

//   // Get the unique list of consoles from the storeData
//   const consoles = [...new Set(storeData.map((game) => game.console))];

//   return (
//     <>
//       {/* <SideBar /> */}
//       <div className="game-list">
//         <div className="filter-section">
//           <h2 className="head">חפש</h2>
//           <input
//             type="text"
//             placeholder="סינון משחק לפי שם"
//             value={gameNameFilter}
//             onChange={(e) => setGameNameFilter(e.target.value)}
//           />
//           <br/>
//           <br/>
//           <select 
//             value={consoleFilter}
//             onChange={(e) => setConsoleFilter(e.target.value)}
//           >
//             <option value="" >All Consoles</option>
//             {consoles.map((console) => (
//               <option value={console} key={console}>
//                 {console}
//               </option>
//             ))}
//           </select>
//         </div>

//         {filteredData.map(
//           ({ id, console, game_name, price, game_img, uploader }) => (
//             <div key={id} className="game-card">
//               <Card>
//                 {game_img ? (
//                   <Card.Img variant="top" src={`${url}${game_img}`} />
//                 ) : (
//                   <Card.Img variant="top" src={nopic} />
//                 )}
//                 <Card.Body>
//                   <Card.Title className="game-card-title">
//                     {game_name}
//                   </Card.Title>
//                 </Card.Body>
//                 <ListGroup className="list-group-flush">
//                   <ListGroup.Item className="game-details-item">
//                     קונסולה: {console}
//                   </ListGroup.Item>
//                   <ListGroup.Item className="game-details-item">
//                     מחיר: ₪{price}
//                   </ListGroup.Item>
//                   <ListGroup.Item className="game-details-item">
//                     מעלה על ידי: {uploader}
//                   </ListGroup.Item>
//                 </ListGroup>
//                 <Card.Body>
//                   {uploader === currentUser && (
//                     <Card.Body>
//                       <Card.Link
//                         className="game-edit-link"
//                         onClick={() => handleEditClick(id)}
//                       >
//                         ערוך
//                       </Card.Link>
//                     </Card.Body>
//                   )}
//                   <Card.Link className="game-contact-link" href="#">
//                     פרטי קשר
//                   </Card.Link>
//                 </Card.Body>
//               </Card>
//             </div>
//           )
//         )}
//       </div>
//     </>
//   );
// }

// export default GameList;

import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import nopic from "../image/no-pic.jpg";
import background from "../image/home.jpg";
import "./GameList.css";

function GameList() {
  const { storeData } = useContext(AppContext);
  const [gameNameFilter, setGameNameFilter] = useState("");
  const [consoleFilter, setConsoleFilter] = useState("");
  
  const url = "http://127.0.0.1:8000/api";
  

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
  consoles.sort(); // Sort the consoles alphabetically
  
  const handleConsoleButtonClick = (console) => {
    setConsoleFilter(console);
  };
  
  return (
    <>
      <div className="game-list">
        <div className="filter-section">
          <h2 className="head">חפש</h2>
          <input
            type="text"
            placeholder="סינון משחק לפי שם"
            value={gameNameFilter}
            onChange={(e) => setGameNameFilter(e.target.value)}
          />
          <br />
          <br />
          <div
      className="gli"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
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
                  className={`console-button ${consoleFilter === console ? "active" : ""}`}
                  onClick={() => handleConsoleButtonClick(console)}
                >
                  {console}
                </button>
              </div>
            ))}
          </div>
          </div>
        </div>
  
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
                  <Card.Link className="game-contact-link" href="#">
                    פרטי קשר
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

