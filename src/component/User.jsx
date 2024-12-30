import axios from 'axios';
import React, { useEffect } from 'react'

export const User = () => {
  const [users, setUsers] = React.useState([])
  const fetchUsers = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get("https://backend-fullstack-kbiq.onrender.com/api/v1/admin/users", config);
      setUsers(response?.data?.users)
    } catch (error) {
      console.log(error);
    };}
    useEffect(() => {
      fetchUsers()
    }, [])
    
    return (
      <div>{users.map((use,index)=>(
        <ul key={index}>
          <li>{use.name}</li>
        </ul>
      ))}</div>
    )
  }
