import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!email || !password) {
            setError("vui lòng nhập")
            setLoading(false)
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("email không hợp lệ");
            setLoading(false)
        }
        try {
            const response = await axios.post('/api/v1/login', {
                email,
                password,
            });
            const data = response.data;
            console.log('Dữ liệu từ API:', data);
            navigate('/user');

        }
        catch (error) {
            if (error.response) {
                // Lỗi từ server (mã trạng thái 4xx, 5xx)
                setError(error.response.data.message || 'Đăng nhập thất bại');
            } else if (error.request) {
                // Không nhận được phản hồi từ server
                setError('Không thể kết nối đến server');
            } else {
                // Các lỗi khác
                setError(error.message);
            }
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='nhập email ' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='nhập password' />
            <button disabled={loading} type='submit'>{loading ? 'đang đăng nhập' : 'đăng nhập'}</button>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Hiển thị thông báo lỗi */}
        </form>
    )
}

export default Login