import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import Login from './pages/Login.jsx'
import Layout from './Layout.jsx'
import Register from './pages/Register.jsx'
import { UserContextProvider } from './UserContext.jsx';
import Account from './pages/Account.jsx'

import axios from 'axios'
import PlacesForm from './components/PlacesForm.jsx'
import Places from './pages/Places.jsx'
import AccountLayout from './pages/Account.jsx'
import Profile from './pages/Profile.jsx'
import PlaceDetail from './pages/PlaceDetail.jsx'
import Booking from './pages/Booking.jsx'

axios.defaults.baseURL = 'https://airbnb-clone-api-h193.onrender.com/'
//to get cookies in api through frontend
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/places/:id' element={<PlaceDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Profile />} />
            <Route path='/account/bookings' element={<Booking />} />
            <Route path='/account/places' element={<Places />} />
            <Route path='/account/places/:id?' element={<PlacesForm />} />
            <Route path='/account/places/new' element={<PlacesForm />} />
          </Route>
          {/* <Route path="/account" element={<Account />} /> */}
          {/* <Route path='/account/:subpart' element={<Account />} /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App