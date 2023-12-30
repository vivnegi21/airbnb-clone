import React, { useEffect, useState } from 'react'
import plusIcon from '../assets/plus.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import PlaceCard from '../components/PlaceCard.jsx';
const Places = () => {
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/user-places').then((data) => setPlaces(data.data));
    }, []);
    return (
        <div className='text-center'>
            <button className='inline-flex gap-2 px-6 py-2 bg-primary rounded-full text-white items-center' onClick={() => navigate('/account/places/new')}>
                <img src={plusIcon} alt="add" className='w-4 h-4' />
                Add new place
            </button>
            <div className='mt-4 grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
                {places.length > 0 && places.map((place) =>
                    <PlaceCard key={place._id} data={place} editable='true'/>
                )}

            </div>
        </div>


    )
}

export default Places