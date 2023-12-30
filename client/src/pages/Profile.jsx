import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';

const Profile = () => {
    const { user, setUser, ready } = useContext(UserContext);
    const navigate = useNavigate();

    if (!ready) {
        return "Loading...";
    }
    if (!user) navigate('/login');

    async function logout() {
        try {
            await axios.post('/logout');
            setUser(null);
            navigate('/')
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className='text-center max-w-lg mx-auto'>
            Logged in as {user.name} ({user.email})
            <br />
            <button className="primary mt-2 " onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile