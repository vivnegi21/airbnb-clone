import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { closeIcon, mapIcon, moreIcon, wifiIcon } from '../assets';
import BookingWidget from '../components/BookingWidget';

const PlaceDetail = () => {
  const { id } = useParams();
  const [slide, setSlide] = useState(0);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`/places/${id}`).then(resp => setData(resp.data));
  }, []);
  const n = data.photos?.length;
  function nextSlide() {
    if (slide === n - 1) setSlide(0);
    else setSlide(slide + 1);
  }
  function prev() {
    if (slide === 0) setSlide(n - 1);
    else setSlide(slide - 1);
  }
  if (show) {
    return (
      <div className='absolute inset-0 p-4 flex flex-col gap-2 bg-black min-h-screen'>
        <div className='flex gap-10 text-white text-xl font-semibold items-center text-center'>
          <img src={closeIcon} alt="" className='w-10 h-10 cursor-pointer' onClick={() => setShow(false)} />
          <div>
            {data.title}
          </div>
        </div>
        <div className='text-white text-center font-sans'>{slide + 1}/{n}</div>
        <div className='relative flex justify-between items-center h-full'>
          <div className='w-full h-full  flex justify-start items-center '>
            <button onClick={prev} className='h-fit z-10 px-4 py-3 rounded-full hover:bg-gray-500 border-2 text-white active:animate-ping'>{"<"}</button>
          </div>
          <div className='max-w-2xl mx-auto border overflow-hidden'>
            <div className='flex transition ease-out duration-1000 delay-75 w-fit h-fit' style={{
              transform: `translateX(-${slide * 100}%)`
            }}>
              {
                data.photos.map((photo, id) => (
                  <img src={'https://airbnb-clone-api-h193.onrender.com/uploads/' + photo} alt="" className='object-cover' />))
              }
            </div>
          </div>
          <div className='w-full h-full  flex justify-end items-center'>
            <button onClick={nextSlide} className=' h-fit z-10 px-4 py-3 rounded-full border-2 text-white hover:bg-gray-500 active:animate-ping'>{">"}</button>
          </div>
        </div>
      </div>

    )
  }
  return (
    <div className='-mx-3 mt-4 border-t-2'>
      <div className='mt-5 max-w-6xl mx-auto flex flex-col gap-6'>
        <h1 className='text-3xl font-semibold'>{data.title}</h1>
        {/* image */}
        <div className='relative'>
          <div className='md:grid md:grid-cols-2 gap-2 rounded-2xl overflow-hidden'>
            <div className=''>
              <img src={'https://airbnb-clone-api-h193.onrender.com/uploads/' + data?.photos?.[0]} alt="img" className='aspect-auto object-cover ' />
            </div>
            <div className='max-md:hidden grid grid-cols-2 gap-1'>
              <img src={'https://airbnb-clone-api-h193.onrender.com/uploads/' + data?.photos?.[1]} alt="img" className='aspect-auto object-cover' />
              <img src={'https://airbnb-clone-api-h193.onrender.com/uploads/' + data?.photos?.[2]} alt="img" className='aspect-auto object-cover ' />
              <img src={'https://airbnb-clone-api-h193.onrender.com/uploads/' + data?.photos?.[3]} alt="img" className='aspect-auto object-cover' />
              <img src={'https://airbnb-clone-api-h193.onrender.com/uploads/' + data?.photos?.[4]} alt="img" className='aspect-auto object-cover' />
            </div>

          </div>
          <button className='absolute bottom-2 right-2 flex bg-white rounded-lg px-3 py-1 gap-2 items-center shadow-md shadow-black  font-serif' onClick={() => setShow(true)}>
            <img src={moreIcon} alt="more" className='w-5 h-5' />
            See more
          </button>
        </div>

        <div>
          <a href={'https://maps.google.com/?q=' + data.address} target='_blank' className='flex gap-1 text-2xl items-center hover:underline'><img src={mapIcon} alt="map" className='w-5 h-5' />{data.address}</a>
          <p className='text-gray-700 font-'>{data.maxGuests} guests</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6'>
          <div className='flex flex-col gap-2'>
            {/* Desciption */}
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className='mt-4 text-justify whitespace-pre-line'>{data.description}</p>
            {/* What it offers */}
            <h2 className="text-2xl font-semibold">What this place offers</h2>
            <ul className='grid grid-cols-2 gap-2 px-2 capitalize'>
              {
                data.perks?.map((perk, i) => (<li key={i} className=' flex gap-2'>{perk}</li>))
              }
            </ul>
            {/* Extra Info*/}
            <h2 className=" text-2xl font-semibold">Extra Info</h2>
            <p className='mt-4 text-justify whitespace-pre-line'>{data.extraInfo}</p>
          </div>
          <div className='h-fit'>
            <BookingWidget data={data} />
          </div>
        </div>

      </div>

    </div>

  )
}

export default PlaceDetail