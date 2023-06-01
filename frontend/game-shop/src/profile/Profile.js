import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import "./Profile.css";
import background from '../image/form1.jpg'

function Profile() {
  const { url } = useContext(AppContext);
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phonecontact, setPhonecontact] = useState(false);
  const [emailcontact, setEmailcontact] = useState(false);
  const [webcontact, setWebcontact] = useState(false);
  const UserProfile = window.localStorage.getItem("UserProfile");
  const userId = JSON.parse(UserProfile).id;

  useEffect(() => {
    fetch(`${url}my_profile/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setLocation(data.location || "");
        setAge(data.age || 0);
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setPhonecontact(data.phonecontact || false);
        setEmailcontact(data.emailcontact || false);
        setWebcontact(data.webcontact || false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(+event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhonecontactChange = (event) => {
    setPhonecontact(event.target.checked);
  };
  
  const handleEmailcontactChange = (event) => {
    setEmailcontact(event.target.checked);
  };
  
  const handleWebcontactChange = (event) => {
    setWebcontact(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      location: location || profileData.location,
      age: age || profileData.age,
      phone: phone || profileData.phone,
      email: email || profileData.email,
      phonecontact: phonecontact,
      emailcontact: emailcontact,
      webcontact: webcontact ,
    };
    fetch(`${url}my_profile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ backgroundImage: `url(${background})` }} className='bg'>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="my-form">
          <h2>User Profile</h2>
          <label>
            מיקום:
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
            />
          </label>
          <br />
          <label>
            גיל:
            <input type="number" value={age} onChange={handleAgeChange} />
          </label>
          <br />
          <label>
            טלפון:
            <input type="tel" value={phone} onChange={handlePhoneChange} />
          </label>
          <br />
          <label>
            אמייל:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <input
            type="checkbox"
            checked={phonecontact}
            onChange={handlePhonecontactChange}
          />
          <label> by phone </label>
          <br />
          <input
            type="checkbox"
            checked={emailcontact}
            onChange={handleEmailcontactChange}
          />
          <label> by email </label>
          <br />
          <input
            type="checkbox"
            checked={webcontact}
            onChange={handleWebcontactChange}
          />
          <label> by website </label>

          <button type="submit">Save</button>
          <br />
          <button onClick={handleEditClick}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </form>
      ) : (
        <div className="my-form2">
          <h2>פרופיל</h2>
          <p>מיקום: {profileData.location}</p>
          <p>גיל: {profileData.age}</p>
          <p>טלפון: {profileData.phone}</p>
          <p>אמייל: {profileData.email}</p>
          {isEditing ? null : (
            <button onClick={handleEditClick}>
              {isEditing ? "Cancel" : "Edit"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
