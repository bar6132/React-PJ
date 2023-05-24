
import { Button } from '@mui/material';
import React from 'react';

function Logout(props) {
  const handleLogout = () => {
    localStorage.removeItem('UserProfile');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isSuperUser');

    window.location.href = '/';
  };

  return (
    <Button onClick={handleLogout} style={{fontSize:'20px'}}>התנתק</Button>
  );
}

export default Logout;