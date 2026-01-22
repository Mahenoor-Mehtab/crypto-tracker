import React, { useContext, useState } from 'react'
import { crytoProvide } from '../context/cryptoData';
import CryptoList from '../components/cryptoList';

const Home = () => {
  const { cryptoList ,  loading } = useContext(crytoProvide);


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-400 border-t-cyan-400"></div>
      </div>
    )
  }
  return (
   <>
   <div>
    <CryptoList/>
   </div>
   </>
  )
}

export default Home