import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logout from './components/Logout';

function MyNavbar() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  console.log(token)
  

 
  return (
    <Navbar bg="dark" variant="dark" className='MyNav'>
      <NavLink to='/'>ארקייד </NavLink>

      <NavLink to="/GameList">משחקים</NavLink>

      <NavLink href="#features">אודות</NavLink>

          {token ? (
        <NavDropdown
          title={localStorage.getItem('username')}
          menuVariant="dark"
          style={{direction:'ltr', marginRight: 'auto'}}
        >
          <NavDropdown.Item href="#action/3.1"  style={{direction:'rtl', textAlign:'center'}}>פרופיל</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" style={{direction:'rtl', textAlign:'center'}} >
            הוסף משחק
          </NavDropdown.Item>
          <NavDropdown.Item style={{direction:'rtl', textAlign:'center'}} ><Logout/></NavDropdown.Item>
        </NavDropdown>   
    ) : (
      <>
        <NavLink to="/Signup" className='Log'>הירשם</NavLink>
        <NavLink to="/Login">התחבר</NavLink>
      </>
)}
    </Navbar>
  );
}

export default MyNavbar;
