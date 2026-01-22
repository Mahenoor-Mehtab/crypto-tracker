import React from 'react'
import SearchBar from './searchBar'

const Navbar = () => {
  return (
    <nav class="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center justify-between h-auto md:h-20 py-4 md:py-0 gap-4">
      
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <div class="bg-blue-600 p-1.5 rounded-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h1 class="text-xl font-extrabold text-white tracking-tight">
            Crypto<span class="text-blue-500">Tracker</span>
          </h1>
        </div>
        <p class="text-xs text-slate-500 font-medium mt-1">
          Real-time cryptocurrency prices and market data
        </p>
      </div>

      <div class="w-full md:w-auto">
          <SearchBar/>
      </div>

    </div>
  </div>
</nav>
  )
}

export default Navbar