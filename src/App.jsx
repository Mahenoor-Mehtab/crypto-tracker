import React from 'react'
import Navbar from './components/navbar'

import { Routes , Route } from 'react-router'
import Home from './pages/home'
import CoinDetails from './pages/coinDetails'


const App = () => {
  return (
   <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/coin/:id' element={<CoinDetails/>} />
   </Routes>
   {/* <CryptoList/> */}
   </>
  )
}

export default App