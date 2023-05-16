import React from 'react'
import { Routes, Route } from 'react-router-dom';
import GameList from './gamelist/GameList';
import Home from './pages/Home';
import SignUp from './signup/SignUp';
import Logout from './components/Logout';
import Login from './login/Login';
import About from './pages/About';
import AddGame from './addgame/AddGame';
import AddOldGame from './addoldgame/AddOldGame';
import AddGameMenu from './pages/AddGameMenu';
import Profile from './profile/Profile';
import MyGames from './mygames/MyGames';



function SiteRouters() {
    return (<>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Gamelist" element={<GameList/>}/>
          <Route path="/Signup" element={<SignUp/>}/>
          <Route path='/Logout' element={<Logout/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/AddGame' element={<AddGame/>}/>
          <Route path='/AddOldGame' element={<AddOldGame/>}/>
          <Route path='/AddGameMenu' element={<AddGameMenu/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/MyGames' element={<MyGames/>}/>
        </Routes>
      </>);
  }

export default SiteRouters;