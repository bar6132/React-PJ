import React from 'react'
import { Routes, Route } from 'react-router-dom';
import GameList from './pages/GameList';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import Login from './components/Login';
import About from './pages/About';



function SiteRouters() {
    return (<>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Gamelist" element={<GameList/>}/>
          <Route path="/Signup" element={<SignUp/>}/>
          <Route path='/Logout' element={<Logout/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/About' element={<About/>}/>
        </Routes>
      </>);
  }

export default SiteRouters;