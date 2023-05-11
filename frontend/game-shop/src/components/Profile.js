import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
// import { useAccordionButtone } from 'react-bootstrap'

function Profile() {
    const {url} = useContext(AppContext)
    const [profileData, setProfileData] = useState({}) 
    // const [location, setLocation] = useState('');
    // const [age, setAge] = useState('');
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    // const [user, setUser] = useState('');
    const UserProfile = window.localStorage.getItem('UserProfile');
    const userId = JSON.parse(UserProfile).id;
      console.log(userId)


    useEffect(() => {
        fetch(`${url}my_profile/${userId}`)
        .then(response=>response.json())
        .then(data=>{setProfileData(data);})
        .catch(error=>{console.log(error);});
    }, [])

  return (
    <div>
      <h2>User Profile</h2>
      <p>Location: {profileData.location}</p>
      <p>Age: {profileData.age}</p>
      <p>Phone: {profileData.phone}</p>
      <p>Email: {profileData.email}</p>
    </div>
  )
}

export default Profile