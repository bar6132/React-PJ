import axios from "axios";
import { url } from './config';



const callServer = async () => {
    try {
      const response = await axios.get(`${url}/games/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  

const fetchUsers = async () => {
    try {
        const response = await axios.get(`${url}/get-all-users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
    };
  


  export { callServer, fetchUsers };