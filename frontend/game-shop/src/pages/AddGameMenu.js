import React from 'react';
import './AddGameMenu.css';
import { NavLink } from 'react-router-dom';

function AddGameMenu() {
  return (
    <div className="add-game-menu">
      <h1>Welcome to the Game Library!</h1>
      <p>What would you like to do?</p>
      <div className="button-container">
      <NavLink className="button new-game-button" to="/AddGame">הוסף משחק חדש </NavLink>
        <span>OR</span>
        <NavLink className="button import-game-button" to="/ImportGame">הוסף משחק ישן</NavLink>
      </div>
    </div>
  );
}

export default AddGameMenu;
