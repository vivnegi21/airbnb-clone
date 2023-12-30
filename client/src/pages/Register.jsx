import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    async function registerUser(e){
        e.preventDefault();
        try {
            await axios.post('/register',{
                name,
                email,
                password,
            });
            alert("Registration Done");
            navigate('/login');
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className='flex grow items-center justify-around'>
            <div className='flex flex-col items-center gap-4 mx-auto mb-32'>
                <p className='text-4xl text-center'>Register Now</p>
                <form action="POST" className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input type="text" placeholder='John Doe' value={name} onChange={ev=>setName(ev.target.value)} />
                    <input type="email" placeholder='email@email.com' value={email} onChange={ev=>setEmail(ev.target.value)}  />
                    <input type="password" placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)} />
                    <button className='primary'>Register</button>
                </form>
                <div className='text-gray-500'>
                    Have an account? <Link to={'/login'} className='text-black underline'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register