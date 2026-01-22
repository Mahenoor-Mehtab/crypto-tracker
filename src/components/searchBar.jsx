import React, { useContext } from 'react'
import { crytoProvide } from '../context/cryptoData'

const SearchBar = () => {
  const {searchQuery , setSearchQuery} = useContext(crytoProvide);
  return (
    <>
    <div class="relative w-full md:w-80 group">
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg class="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
  <input 
    type="text" 
    placeholder="Search for a coin..." 
    class="block w-full py-2.5 pl-10 pr-4 text-sm text-slate-200 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-slate-800 outline-none transition-all placeholder-slate-500"
    value={searchQuery}
    onChange={(e)=>{ setSearchQuery(e.target.value)}}
  />
</div>
</>
  )
}

export default SearchBar