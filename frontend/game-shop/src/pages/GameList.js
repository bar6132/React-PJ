import React from 'react'
import { useContext} from 'react'
import { AppContext} from '../App';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import SideBar from '../components/SideBar';

function GameList() {
  const { storeData } = useContext(AppContext)
  console.log(storeData);
  const url = "http://127.0.0.1:8000/api";

  // Add a null/undefined check before calling map()
  if (storeData === null || storeData === undefined) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <div style={{ width: '87%' }}>
        <SideBar />
        
        {storeData.map(({ id, console, game_name, price, game_img, uploader}) => (
          <div key={id} style={{ display: 'inline-flex' }}>
            <Card style={{ width: '17rem', direction: 'rtl', textAlign: 'center' }}>
              <Card.Img variant="top" src={`${url}${game_img}`} style={{ height: '300px' }} />
              <Card.Body>
                <Card.Title>{game_name}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>קונסולה : {console} </ListGroup.Item>
                <ListGroup.Item>מחיר : ₪{price}</ListGroup.Item>
                <ListGroup.Item>מעלה על ידי : {uploader}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </div>
        ))}

      </div>
    </>
  )
}

export default GameList;