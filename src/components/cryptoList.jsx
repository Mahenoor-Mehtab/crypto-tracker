import React , { useContext } from 'react'
import { crytoProvide } from '../context/cryptoData'
import CryptoCard from './cryptoCard';
const CryptoList = () => {
     const  {cryptoList, sortBy , setSortBy, filteredList} = useContext(crytoProvide);
     

  return (
    <>
    <div class="min-h-screen bg-slate-950 text-slate-200 font-sans">

  <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
      <div>
        <h2 class="text-3xl font-bold text-white mb-1">Market Overview</h2>
        <p class="text-slate-400 text-sm">Top 100 cryptocurrencies by market capitalization</p>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-slate-500 uppercase">Sort by</span>
          <select class="bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer" value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
            <option value="market_cap_rank">Rank</option>
            <option value="name">Name</option>
            <option value="price">Price (Low to high)</option>
            <option value="price_desc">Price(High to Low)</option>
            <option value="change">24h Change</option>
            <option value="market_cap">Market Cap</option>
          </select>
        </div>

        <div class="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button class="p-2 rounded-lg bg-blue-600 text-white shadow-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button>
          <button class="p-2 rounded-lg text-slate-500 hover:text-slate-300"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     
      {
  filteredList?.map((coin , index)=>(
    <CryptoCard key={index}  coin={coin}/>
  ))
      }

      </div>
  </main>
</div>
    </>
  )
}

export default CryptoList