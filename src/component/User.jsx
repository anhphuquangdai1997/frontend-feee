import axios from 'axios';
import React, { useEffect } from 'react'

export const User = () => {
  const [user, setUser] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get("/api/v1/admin/users", config);
      console.log(response)
      setUser(response?.data?.users);

    } catch (error) {
      console.log(error);
    };
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>{
      user.map((use, index) => (
        <div key={index}>
          <h1>{use.name}</h1>
        </div>
      ))
    }</div>
  )
}
