import React from 'react'
import Headers from './components/Headers'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
        <Headers/>
        <Outlet/>
    </div>
  )
}

export default Layout