import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext.jsx';

const Login = () => {
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const [password,setPassword] = useState("");
    const [message,setMsg] = useState("");

    const {user,setUser} = useContext(UserContext);
    if(user){
        navigate('/account');
    }
    async function loginUser(e){
        setMsg("");
        e.preventDefault();
        try {
            const userInfo = await axios.post('/login',{
                email,
                password
            },{withCredentials:true});
            setUser(userInfo.data);
            navigate('/');
        } catch (error) {
            setTimeout(()=>setMsg(error.response.data),1500);
        }
    }
     return (
        <div className='flex grow items-center justify-around'>
            <div className='flex flex-col items-center gap-4 mx-auto mb-32'>
                <p className='text-4xl text-center'>Login</p>
                <form action="" className='max-w-md mx-auto' onSubmit={loginUser}>
                    <input type="email" placeholder='email@email.com' value={email} onChange={(ev)=>setEmail(ev.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={ev=> setPassword(ev.target.value)}/>
                    <button className='primary'>Login</button>
                </form>
                <p className={`${message==="" && "hidden"} text-red-500`}>{message}</p>
                <div className='text-gray-500'>
                    Already Have an Account? <Link to={'/register'} className='text-black underline'>Register Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Login