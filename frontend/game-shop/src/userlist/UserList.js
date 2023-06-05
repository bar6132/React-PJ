import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';
import { url } from '../client/config'
import { fetchUsers } from "../client/Client";



function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        console.log(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);


  const handleEditSuperuser = async (userId, isSuperuser) => {
    try {
      const response = await axios.patch(`${url}manage-users/`, {
        user_id: userId,
        is_superuser: !isSuperuser,
      });
      if (response.status === 200) {
        fetchUsers(); 
      }
    } catch (error) {
      console.error('Error editing superuser status:', error);
    }
  };
  
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${url}manage-users/`, {
        data: { user_id: userId },
      });
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>משתמש על</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.is_superuser}
                  onChange={() => handleEditSuperuser(user.id, user.is_superuser)}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
