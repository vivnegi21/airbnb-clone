import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';

const BookingWidget = ({ data }) => {
    const [checkIn, setcheckIn] = useState('');
    const [checkOut, setcheckOut] = useState('');
    const [maxGuests, setmaxGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    let discount = 0.15;
    const random = Math.floor(Math.random() * (10000)) + 5000;
    let days = 0;
    if (checkIn && checkOut) {
        days = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    async function bookPlace() {
        if (!checkIn || !checkOut) {
            alert("Please select a date");
        }
        else if (days <= 0) {
            alert("Check in date must be earlier than Check out date");
        }
        else {
            const formdata = {
                checkIn,
                checkOut,
                maxGuests,
                price:data.price_per_night * days,
                name,
                phone,
                place:data._id,
            };
            await axios.post('/bookings',formdata);
        }
    }
    return (
        <div className=' flex flex-col gap-4 max-w-md border-2 rounded-lg h-fit p-4'>
            <p className='flex gap-2 text-2xl'>
                {(<p className='line-through text-gray-700 '>₹{Math.floor(data?.price_per_night * (1 + discount))}</p>)} {"₹" + data?.price_per_night?.toLocaleString()} night
            </p>
            <div className='border rounded-lg overflow-hidden'>
                <div className='flex'>
                    <div className='border cursor-pointer px-2'>
                        <label className='text-xs font-sans uppercase font-semibold'>Check In:</label>
                        <input type="date" name="checkin" id="" className='' value={checkIn} onChange={ev => setcheckIn(ev.target.value)} />
                    </div>
                    <div className='border cursor-pointer px-2'>
                        <label className=' text-xs font-sans uppercase font-semibold'>Check Out:</label>
                        <input type="date" name="" id="" className='' value={checkOut} onChange={ev => setcheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className='border px-2'>
                    <label className='text-xs font-sans uppercase font-semibold'>Guests:</label>
                    <input type="Number" className='border-none ' min={1} max={data.maxGuests} value={maxGuests} onChange={ev => setmaxGuests(ev.target.value)} placeholder='2 guests' />
                </div>
            </div>
            <div className='border px-2 rounded-lg'>
                <label className='text-xs font-sans uppercase font-semibold'>Name:</label>
                <input type="text" className='border-none ' value={name} onChange={ev => setName(ev.target.value)} placeholder='John Doe' />
            </div>
            <div className='border px-2 rounded-lg'>
                <label className='text-xs font-sans uppercase font-semibold'>Name:</label>
                <input type="tel" className='border-none ' value={phone} onChange={ev => setPhone(ev.target.value)} placeholder='985XXX' maxLength={10} />
            </div>

            {days !== 0 && (
                <div className=' px-2 flex justify-between text-gray-700'>
                    <p>₹{data.price_per_night} X {days} nights</p>
                    <p>₹{(data.price_per_night * days).toLocaleString('en-IN')}</p>
                </div>
            )}

            <button className='primary' onClick={bookPlace}>Book</button>
        </div>
    )
}


export default BookingWidget