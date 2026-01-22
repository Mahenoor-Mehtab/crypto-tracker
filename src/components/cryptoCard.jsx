import React from 'react';
import { useNavigate } from "react-router";

const CryptoCard = ({ coin }) => {
  const navigate = useNavigate();
  // Helper to format large numbers (Market Cap/Volume)
  const formatCompactNumber = (number) => {
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(number);
  };

  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all cursor-pointer group shadow-lg"  onClick={() => navigate(`/coin/${coin.id}`)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Rank & Image */}
          <div className="relative">
            <img 
              src={coin.image} 
              alt={coin.name} 
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute -top-2 -left-2 bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.5 rounded-md border border-slate-700 font-bold">
              #{coin.market_cap_rank}
            </span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-none truncate w-24">
              {coin.name}
            </h3>
            <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
              {coin.symbol}
            </span>
          </div>
        </div>

        {/* 24h Percentage Change */}
        <span className={`text-xs font-bold px-2 py-1 rounded-md border ${
          isPositive 
          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
          : 'bg-red-500/10 text-red-500 border-red-500/20'
        }`}>
          {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
        </span>
      </div>

      <div className="space-y-3">
        {/* Current Price */}
        <div>
          <p className="text-2xl font-mono font-bold text-slate-100">
            ${coin.current_price?.toLocaleString()}
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/50">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Market Cap</span>
            <span className="text-slate-200 text-sm font-semibold">
              ${formatCompactNumber(coin.market_cap)}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Volume (24h)</span>
            <span className="text-slate-200 text-sm font-semibold">
              ${formatCompactNumber(coin.total_volume)}
            </span>
          </div>
        </div>
      </div>

      {/* Mini Visual Bar (Changes color based on trend) */}
      <div className="mt-4 flex items-end gap-1 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${isPositive ? 'bg-emerald-500 shadow-[0_0_8px_emerald]' : 'bg-red-500'}`} 
          style={{ width: `${Math.min(Math.abs(coin.price_change_percentage_24h) * 10, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CryptoCard;