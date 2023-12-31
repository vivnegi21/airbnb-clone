import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { calenderIcon, nightIcon, paymentIcon } from '../assets';

const Booking = () => {
    const [booking, setBooking] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(data => setBooking(data.data));
    }, []);
    return (
        <div className=''>
            {booking.length > 0 && booking.map((book) => (
                <div key={book._id} className='mb-4 flex flex-col sm:flex-row gap-2 bg-gray-200 rounded-lg overflow-hidden max-w-2xl mx-auto'>
                    <div className='max-w-2xl sm:w-48'>
                        <img src={'https://airbnb-clone-api-h193.onrender.com/uploads/' + book.place?.photos?.[0]} alt="" />
                    </div>
                    <div className='py-3 pr-3 grow px-2 '>
                        <h1 className='text-xl'>{book.place.title}</h1>
                        <div className='flex border-t-2 border-gray-300 gap-2 pt-1'>
                            <div className='flex gap-1'>
                                <img src={calenderIcon} alt=""  className='w-5 h-5'/>
                                {format(new Date(book.checkIn), 'dd/MM/yyyy')}
                            </div>
                            &rarr;
                            <div className='flex  gap-1'>
                                <img src={calenderIcon} alt=""  className='w-5 h-5'/>
                                {format(new Date(book.checkOut), 'dd/MM/yyyy')}
                            </div>
                        </div>

                        <div>
                            <div className='flex gap-1'>
                                <img src={nightIcon} alt="" className='w-5 h-5' />
                                {differenceInCalendarDays(new Date(book.checkOut), new Date(book.checkIn))}days
                            </div>
                            <div className='flex gap-1'>
                                <img src={paymentIcon} alt="" className='w-5 h-5' />
                                Total Price: ₹{book.price.toLocaleString('en-IN')}
                            </div>
                        </div>

                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default Booking