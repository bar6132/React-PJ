import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import './AddOldGame.css'

function AddOldGame() {
  const { url } = useContext(AppContext);
  const [console, setConsole] = useState('');
  const [gameName, setGameName] = useState('');
  const [price, setPrice] = useState('');
  const [gameImg, setGameImg] = useState(null);
  const token = window.localStorage.getItem('token');

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
    fetch(`${url}oldgame/`, {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Console:
        <select value={console} onChange={(event) => setConsole(event.target.value)}>
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
  );
}

export default AddOldGame;
