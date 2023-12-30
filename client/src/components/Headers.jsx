import logo from '../assets/logo.svg'
import searchLogo from '../assets/search.svg'
import hamburgerIcon from '../assets/hamburger.svg'
import profileIcon from '../assets/profile.svg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'

export default function Headers(){
    const {user} = useContext(UserContext);
    return (
        <header className=' sm:px-20 flex justify-between'>
            {/* Logo */}
            <a href="/" className='flex items-center gap-1 '>
                <img src={logo} alt="logo" className='w-8 h-8' />
                <span className='text-primary font-bold font-serif'>airBnB</span>
            </a>
            {/* SearhBar */}
            <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 items-center shadow-md shadow-gray-300 max-sm:hidden'>
                <div>Anywhere</div>
                <div className=' border-l border-gray-400 h-8'></div>
                <div>Any week</div>
                <div className=' border-l border-gray-400 h-8'></div>
                <div>Add guests</div>
                <button className='bg-primary text-white p-2 rounded-full'>
                    <img src={searchLogo} alt="search" className='w-4 h-4' />
                </button>
            </div>
            {/* Account */}
            <Link className='flex gap-3 rounded-full  border border-gray-300 py-1 px-3 items-center' to={user?'/account':'/login'}>
                <img src={hamburgerIcon} alt="scroll" className='w-8 h-8' />
                <img src={profileIcon} alt="profile" className='w-8 h-8' />
                {!!user && (
                    <div>
                        {user.name}
                    </div>
                )}
            </Link>
        </header>
    )
}