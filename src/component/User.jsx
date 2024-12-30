import axios from 'axios';
import React, { useEffect } from 'react';

export const User = () => {
  const [user, setUser] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get("https://backend-fullstack-kbiq.onrender.com/api/v1/admin/users", config);

      // Kiểm tra response.data và đảm bảo là một mảng
      if (Array.isArray(response?.data?.users)) {
        setUser(response?.data?.users);
      } else {
        console.log('Dữ liệu không hợp lệ', response?.data);
      }

    } catch (error) {
      console.log('Lỗi khi fetch dữ liệu', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {
        Array.isArray(user) && user.length > 0 ? (
          user.map((use, index) => (
            <div key={index}>
              <h1>{use.name}</h1>
            </div>
          ))
        ) : (
          <p>Không có người dùng nào</p>
        )
      }
    </div>
  );
}
