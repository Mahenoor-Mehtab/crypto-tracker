import React, { createContext, useEffect, useState } from 'react'

export const crytoProvide = createContext()

const CryptoData = ({ children }) => {
  const [cryptoList, setCryptoList] = useState([])
  const [filteredList , setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true)
  const [sortBy , setSortBy] = useState("market_cap_rank")
  const [searchQuery , setSearchQuery] = useState("");
  

  const apiKey = import.meta.env.VITE_COINGECKO_API_KEY

const bitcoinsData = async () => {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr',
      {
        headers: {
          'x-cg-demo-api-key': apiKey,
        },
      }
    )

    console.log('response status:', res.status)

    const data = await res.json()

    setCryptoList(data)
  } catch (err) {
    console.error('fetch error:', err)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    bitcoinsData()
  }, [])

  //! useffect for sorting:
  useEffect(()=>{
filterAndSort();
  },[sortBy, cryptoList, searchQuery])

  //! filter the data:
  const filterAndSort = ()=>{
    let filtered = cryptoList.filter(
      (crypto)=> crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    ) 
    filtered.sort((a,b)=>{ // yaha a , b me aarray ke elemnt jate h 
      switch (sortBy){
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.current_price - b.current_price;
         case "price_desc":
          return b.current_price - a.current_price;
        case "change":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "market_cap":
          return a.market_cap - b.market_cap;
        default:
          return a.market_cap - b.market_cap;
      }
     

    })
    setFilteredList(filtered)
   
  }

  const value = { cryptoList, loading, sortBy , setSortBy, filteredList, searchQuery , setSearchQuery, setLoading}

  return (
    <crytoProvide.Provider value={value}>
      {children}
    </crytoProvide.Provider>
  )
}

export default CryptoData
