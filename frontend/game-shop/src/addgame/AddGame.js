import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../App';
import './AddGame.css'
import background from '../image/new.jpg'

function AddGame() {
  const { url } = useContext(AppContext);
  const [gameType, setGameType] = useState('new');
  const [console, setConsole] = useState('');
  const [gameName, setGameName] = useState('');
  const [price, setPrice] = useState('');
  const [gameImg, setGameImg] = useState(null);
  const token = window.localStorage.getItem('token')




  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData object to handle the file input
    const formData = new FormData();
    formData.append('game_type', gameType);

    formData.append('console', console);
    formData.append('game_name', gameName);
    formData.append('price', price);
    if (gameImg) {
      formData.append('game_img', gameImg);
    }

    // Log the form data to the console
    window.console.log([...formData.entries()]);

    axios({
      method: 'post',
      url: `${url}game/`,
      data: formData,
      headers: {
        Authorization: `Token ${token}`,
        'content-type': 'multipart/form-data'
      }
    })
      .then(() => {
        alert('המשחק התווסף בהצלחה');
        window.location.replace('/');
      })
      .catch((error) => {
        console.error('Error adding game:', error);
      });
  };



  return (
    <>
      <div style={{ backgroundImage: `url(${background})` }} className='bg'>
        <form onSubmit={handleSubmit} className='my-form'>
          <label>
            Console:
            <select value={console} onChange={(event) => setConsole(event.target.value)}>
              <option value=""></option>
              <option className='option' value="PS3">PS3</option>
              <option value="PS4">PS4</option>
              <option value="PS5">PS5</option>
              <option value="Xbox 360">Xbox 360</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Xbox Series X/S">Xbox Series X/S</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>
          </label>
          <label>
            Game Name:
            <input type="text" value={gameName} onChange={(event) => setGameName(event.target.value)} />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
          </label>
          <label>
            Game Image:
            <input type="file" onChange={(event) => setGameImg(event.target.files[0])} />
          </label>
          <button type="submit">Add Game</button>
        </form>
      </div>
    </>
  );
}

export default AddGame;
