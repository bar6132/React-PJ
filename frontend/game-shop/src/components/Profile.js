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
      const userID = window.localStorage.getItem('pk')
      console.log(userID)
    useEffect(() => {
        fetch(`${url}get_profile/${6}`)
        .then(response=>response.json())
        .then(data=>{setProfileData(data);})
        .catch(error=>{console.log(error);});
        console.log(profileData)
        
        

    
    })

  return (
    <div>
          <h1>this is your profile</h1>
    </div>
  )
}

export default Profile