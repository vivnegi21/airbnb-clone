import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { accomodationIcon, bookingIcon, profileIcon } from '../assets/index.js';
const AccountNav = () => {
    let {pathname:location} = useLocation();
    const splits = location.split('/');
    let subpart = splits[splits.length-1];

    if(subpart===''){
        subpart = 'profile';
    }
    if(subpart==='new') subpart='places'
    function linkClasses(type=null){
        let classes = "py-2 px-6 inline-flex items-center gap-2 ";
        if(type===subpart){
            classes+=" bg-primary text-white rounded-full"
        }else{
            classes+=' rounded-full bg-gray-200'
        }
        return classes; 
    }
    return (
        <nav className='w-full flex justify-center my-8 gap-2 '>
            <Link to={'/account/'} className={linkClasses('profile')}>
                <img src={profileIcon} alt="profile" className='w-6 h-6 ' />
                My Profile</Link>
            <Link to={'/account/bookings'} className={linkClasses('bookings')}>
                <img src={bookingIcon} alt="profile" className='w-6 h-6' />
                My Bookings</Link>
            <Link to={'/account/places'} className={linkClasses('places')}>
                <img src={accomodationIcon} alt="profile" className='w-6 h-6' />
                My Accomodations</Link>
        </nav>
    )
}

export default AccountNav