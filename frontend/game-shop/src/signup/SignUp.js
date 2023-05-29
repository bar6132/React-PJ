import React, { useState, useContext } from "react";
import { AppContext } from '../App';
import background from '../image/2537738.jpg'
import './signup.css'


function Signup() {
  const {url} = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      // Send form data to server
      const response = await fetch(`${url}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          location,
          age,
          phone,
        }),
      });
    

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      // Store token and user data in local storage
      localStorage.setItem("username", username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("UserProfile", JSON.stringify(data.user));
      

      // Redirect to home page or some other destination
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    
      <div className="background-image"
     style={{
        backgroundImage: `url(${background})`,
       
        
    }}>
    <div >
    
    <form onSubmit={handleSubmit}>
      <label>
        שם משתמש :
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        סיסמא:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        אימות סיסמא:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <br />
      <label>
        אימייל:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        עיר מגורים:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <br />
      <label>
        גיל:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <br />
      <label>
        טלפון:
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <br />
      <div class="checkbox-container">
        <input type="checkbox" id="phone-checkbox"/>
        <label for="phone-checkbox">by phone</label>
      </div>

      <div class="checkbox-container">
        <input type="checkbox" id="email-checkbox"/>
        <label for="email-checkbox">by email</label>
        </div>

      <div class="checkbox-container">
        <input type="checkbox" id="website-checkbox"/>
        <label for="website-checkbox">by website</label>
        </div>
      <button type="submit">הרשם</button>
    </form>
    </div>
    </div>
    </>
  );
}

export default Signup;
