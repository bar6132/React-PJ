import React, { useContext } from 'react';
import { AppContext } from '../App';

function SignUp() {
    const {url} = useContext(AppContext)

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    
    const data = {'username': username, 'password': password, 'email': email};

    fetch(`${url}signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => {
        if (response.status !== 200) {
          
          return;
        }
        window.location.href = '/';
        return response.json();
      })
      .then(data => {
        const userString = JSON.stringify(data.user);
        console.log('Token:', data.token);
        console.log('username:', data.username);
        localStorage.setItem('user', userString);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username)
      })
      .catch(error => {
        console.error(error);
        // Display an error message to the user
        alert('Could not create user. Please try again.');
        // Reset the form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
      });
  };
  

  return (
    <>
      <div>
        <form id="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"/><br/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password"/><br/>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email"/><br/>
          <button type="submit">הרשם</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
