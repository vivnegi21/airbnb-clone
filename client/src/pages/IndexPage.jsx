import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import axios from 'axios';
import PlaceCard from '../components/PlaceCard';

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then((resp) => setPlaces([...resp.data]));
  }, []);
  return (
    <div className='grid gap-4 mt-6 grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {places.length > 0 && places.map((place) =>{
        return (<PlaceCard key={place._id} data={place} />)
      }
      )}

    </div>
  )
}

export default IndexPage