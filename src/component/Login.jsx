import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate =useNavigate()
    
    const handleSubmit =async(e)=>{
        e.preventDefault()
        setError('')
        setLoading(true)

        if(!email ||!password){
            setError("vui lòng nhập")
            setLoading(false)
        }
        if(!/\S+@\S+\.\S+/.test(email)){
            setError("email không hợp lệ");
            setLoading(false)
        }
        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({ email, password }),
            })
            if(!response.ok){
                const errorData=await response.json()
                throw new Error(errorData.message || 'đăng nhập thất bại')
            }
            const data=await response.json()
            console.log(data)
            navigate('/user');
            
        } 
        catch (error) {
            setError(error.message ||'lỗi connect đến server')
        }
        finally {
            setLoading(false)
        }
    }


  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='nhập email ' />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='nhập password'/>
        <button disabled={loading} type='submit'>{loading ? 'đang đăng nhập' :'đăng nhập'}</button>
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Hiển thị thông báo lỗi */}
    </form>
  )
}

export default Login