import { useContext, useState } from 'react';
import { AppContext } from '../App';

function Login() {
  const {url} = useContext(AppContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    const response = await fetch(`${url}obtain-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
  
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
  
      // Make another request to get the user's information
      const userResponse = await fetch(`${url}get-user-data`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      const userData = await userResponse.json();
      localStorage.setItem('UserProfile', JSON.stringify(userData));
  
      alert("Login successful!");
      window.location.href = "/";
    } else {
      alert("Login failed. Please check your credentials and try again.");
    }
  }
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