import { useContext, useState } from 'react';
import { AppContext } from '../App';
import background from '../image/2996302.jpg'
import './logingstyle.css'

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
      const userResponse = await fetch(`${url}get-user-data/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      const userData = await userResponse.json();
      localStorage.setItem('UserProfile', JSON.stringify(userData));
  
      alert("התחברת בהצלחה ! ");
      window.location.href = "/";
    } else {
      alert("התחברות נכשלה , אחד או יותר מאמצעי הזיהוי שגויים, נסה שנית ");
    }
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div style={{
      width: '100%',
      height: '99%',
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundRepeat: 'no-repeat',
      
  }}>
    <div className="container">
      <div className="form-container">
        <label>
         : שם משתמש 
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
         : סיסמא
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button onClick={handleLogin}>התחבר</button>
      </div>
    </div>
    </div>
  );
}

export default Login