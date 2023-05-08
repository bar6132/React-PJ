import { useContext, useState } from 'react';
import { AppContext } from '../App';

function Login() {
  const {url} = useContext(AppContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   const response = await fetch(`${url}obtain-token`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username, password }),
  //   });

  //   if (response.ok) {
  //       const data = await response.json();
  //       const { token } = data;
  //       const userString = JSON.stringify(token.User);
  //       console.log(`Token: ${token}, Username: ${username}`); 
  //       console.log(`user: ${userString}`)
  //       localStorage.setItem('user', token.user)
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('username', username);
  //       alert("Login successful!");
  //       window.location.href = "/";
  //   } else {
  //     console.error('Failed to obtain token');
  //   }
  // };
  
  const handleLogin = async () => {
    const response = await fetch(`${url}obtain-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      const { user, token } = data;
      console.log(`Token: ${token}, Username: ${username}`);
      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      alert("Login successful!");
      window.location.href = "/";
    } else {
      console.error('Failed to obtain token');
    }
  };

  // const handleLogin = async () => {
  //   const response = await fetch(`${url}obtain-token`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username, password }),
  //   });
  
  //   if (response.ok) {
  //     const data = await response.json();
  //     const { token } = data;
  //     console.log(`Token: ${token}, Username: ${username}`);
  
  //     // Retrieve the authenticated user object using the token
  //     const userResponse = await fetch(`${url}user`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     const userData = await userResponse.json();
  
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('username', username);
      
  //     // Store the user object in local storage as well
  //     localStorage.setItem('user', JSON.stringify(userData));
  
  //     alert("Login successful!");
  //     window.location.href = "/";
  //   } else {
  //     console.error('Failed to obtain token');
  //   }
  // };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
}

export default Login