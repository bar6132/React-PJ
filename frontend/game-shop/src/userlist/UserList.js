import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';
import { useContext } from 'react';
import { AppContext } from '../App';

function UserList() {
  const [users, setUsers] = useState([]);
  const { url } = useContext(AppContext);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}get-all-users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const handleEditSuperuser = async (userId, isSuperuser) => {
    try {
      const response = await axios.patch(`${url}manage-users/`, {
        user_id: userId,
        is_superuser: !isSuperuser,
      });
      if (response.status === 200) {
        fetchUsers(); // Refresh the user data after editing
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
