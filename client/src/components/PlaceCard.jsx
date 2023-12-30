import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const PlaceCard = ({ key, data, editable=false}) => {
    const [slide, setSlide] = useState(0);
    const navigate = useNavigate();
    const n = data.photos.length;
    // console.log(n)
    function nextSlide() {
        if (slide === n - 1) setSlide(0);
        else setSlide(slide + 1);
    }
    function prev() {
        if (slide === 0) setSlide(n - 1);
        else setSlide(slide - 1);
    }
    return (

        <div key={key} className='shadow-2xl duration-500 ease-in hover:scale-105 hover:shadow-gray-400 flex flex-col gap-2 max-w-sm rounded-2xl border-x-lime-400 border p-1 text-center' >
            <div className='overflow-hidden relative rounded-2xl snap-x' >
                <div className='flex transition ease-out duration-1000 delay-75' style={{
                    transform: `translateX(-${slide * 100}%)`
                }}>
                    {data.photos.map((photo, id) => (
                        <img src={'http://localhost:4000/uploads/' + photo} alt="img" className='object-cover aspect-square' key={id} />

                    ))}
                </div>
                <div className='absolute text-white flex justify-between top-0 h-full w-full items-center px-1'>
                    <button onClick={prev} className='h-full hover:scale-150'>{"<"}</button>
                    <button onClick={nextSlide} className='h-full hover:scale-150'>{">"}</button>
                </div>
            </div>
            <Link to={`${(editable)?"/account":""}/places/${data._id}`}>
                <div className='' >
                    <h3 className="text-gray-900 text-2xl font-bold ">{data.title}</h3>
                    <p className="mt-5 text-base leading-6 text-gray-500">
                        {data.address}
                    </p>
                    <p className='overflow-y-auto my-5'>₹ {data.price_per_night.toLocaleString()} <span className='text-gray-500'> night</span></p>
                </div>
            </Link>
        </div>

    )
}

export default PlaceCard