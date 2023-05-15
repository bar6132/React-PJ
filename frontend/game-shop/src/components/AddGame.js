import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

function AddGame() {
  const {url} = useContext(AppContext)
  const [console, setConsole] = useState('');
  const [gameName, setGameName] = useState('');
  const [price, setPrice] = useState('');
  const [gameImg, setGameImg] = useState(null);
  const token = window.localStorage.getItem('token')

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData object to handle the file input
    const formData = new FormData();
    formData.append('console', console);
    formData.append('game_name', gameName);
    formData.append('price', price);
    if (gameImg) {
      formData.append('game_img', gameImg);
    }

    // Send a POST request to the API endpoint
    fetch(`${url}game/`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      alert('המשחק התווסף בהצלחה');
      window.location.replace('/');
    })
    .catch((error) => {
      console.error('Error adding game:', error);
    });
  }
  return (<>

    <form onSubmit={handleSubmit}>
      <label>
        Console:
        <select value={console} onChange={(event) => setConsole(event.target.value)}>
          <option value=""></option>
          <option  className='option' value="PS3">PS3</option>
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
    </>
  );
}

export default AddGame;