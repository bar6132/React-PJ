import React from 'react';
import './AddGameMenu.css';
import { NavLink } from 'react-router-dom';
import bk from '../image/addgame.jpg'

function AddGameMenu() {
  return (
    <div
      className="hbg"
      style={{
        backgroundImage: `url(${bk})`,
      }}
    >
    <div className="add-game-menu">
      <h1>Welcome to the Game Library!</h1>
      <p>What would you like to do?</p>
      <div className="button-container">
      <NavLink className="button new-game-button" to="/AddGame">הוסף משחק חדש </NavLink>
        <span>OR</span>
        <NavLink className="button import-game-button" to="/AddOldGame">הוסף משחק ישן</NavLink>
      </div>
    </div>
  </div>
  );
}

export default AddGameMenu;
