import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router";
import { crytoProvide } from '../context/cryptoData';
// Chart ke liye ye library best hai
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const apiKey = import.meta.env.VITE_COINGECKO_API_KEY

const CoinDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(crytoProvide)
  const [coin, setCoin] = useState(null);

  const chartData = [
    { name: 'Mon', price: 4000 },
    { name: 'Tue', price: 4500 },
    { name: 'Wed', price: 4200 },
    { name: 'Thu', price: 4800 },
    { name: 'Fri', price: 5100 },
    { name: 'Sat', price: 4900 },
    { name: 'Sun', price: 5300 },
  ];

  const fetchCoinData = async (coinId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
        { headers: { 'x-cg-demo-api-key': apiKey } }
      )
      const data = await res.json()
      setCoin(data)
    } catch (err) {
      console.error('fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoinData(id);
  }, [id])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-800 border-t-blue-500"></div>
      </div>
    )
  }

  if (!coin) return <div className="text-white text-center mt-20">Coin not found</div>;

  const isPositive = coin.market_data.price_change_percentage_24h > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      {/* 1. Top Bar with Back Button */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all text-slate-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Go Back
        </button>
        <span className="text-slate-500 font-mono">Rank #{coin.market_cap_rank}</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Left Side: Graph Section */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <img src={coin.image.large} alt={coin.name} className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">{coin.name} <span className="text-slate-500 uppercase text-lg">{coin.symbol}</span></h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-bold">${coin.market_data.current_price.usd.toLocaleString()}</span>
                <span className={`font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {isPositive ? '▲' : '▼'} {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-[250px] min-h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  dot={false} 
                  activeDot={{ r: 8, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Right Side: Statistics Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <h2 className="text-xl font-bold border-b border-slate-800 pb-4">Market Stats</h2>
          
          <div className="space-y-4">
            <StatRow label="Market Cap" value={`$${coin.market_data.market_cap.usd.toLocaleString()}`} />
            <StatRow label="Fully Diluted Valuation" value={`$${coin.market_data.fully_diluted_valuation.usd?.toLocaleString() || 'N/A'}`} />
            <StatRow label="24h High" value={`$${coin.market_data.high_24h.usd.toLocaleString()}`} color="text-emerald-500" />
            <StatRow label="24h Low" value={`$${coin.market_data.low_24h.usd.toLocaleString()}`} color="text-red-500" />
            <StatRow label="Circulating Supply" value={coin.market_data.circulating_supply.toLocaleString()} />
            <StatRow label="Total Supply" value={coin.market_data.total_supply?.toLocaleString() || '∞'} />
          </div>

          {/* Description Section */}
          <div className="pt-6">
             <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">About {coin.name}</h3>
             <p className="text-slate-400 text-sm leading-relaxed line-clamp-6" dangerouslySetInnerHTML={{ __html: coin.description.en }}></p>
          </div>
        </div>

      </div>
    </div>
  )
}

// Sub-component for clean rows
const StatRow = ({ label, value, color = "text-slate-200" }) => (
  <div className="flex justify-between items-center border-b border-slate-800/50 pb-3">
    <span className="text-slate-500 text-sm font-medium">{label}</span>
    <span className={`text-sm font-mono font-bold ${color}`}>{value}</span>
  </div>
);

export default CoinDetails;