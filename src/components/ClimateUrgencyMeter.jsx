import React from 'react';

const ClimateUrgencyMeter = ({ isDarkMode }) => (
  <div className={`p-4 rounded-2xl backdrop-blur-xl shadow-xl border transition-all duration-300 hover:scale-105 ${
    isDarkMode ? 'bg-red-900/30 border-red-500/30' : 'bg-red-50/80 border-red-200/50'
  }`}>
    <h4 className={`text-sm font-semibold mb-2 text-red-400 flex items-center`}>
      <span className="animate-pulse text-base">🚨</span>
      <span className="ml-1">Climate Urgency</span>
      <div className="ml-auto flex space-x-1">
        <div className="w-1 h-1 rounded-full bg-red-400 animate-ping" />
        <div className="w-1 h-1 rounded-full bg-red-400 animate-ping" style={{animationDelay: '0.2s'}} />
        <div className="w-1 h-1 rounded-full bg-red-400 animate-ping" style={{animationDelay: '0.4s'}} />
      </div>
    </h4>
    <div className={`text-2xl font-bold text-red-400 mb-1 animate-pulse`}>CRITICAL</div>
    <div className={`text-xs mb-2 ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>~6 years to limit warming to 1.5°C</div>
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full animate-pulse relative" 
           style={{width: '83%', animation: 'slideIn 2s ease-out, pulse 2s infinite'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-ping" />
      </div>
    </div>
    <div className={`text-xs mt-1 ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>Immediate action required</div>
  </div>
);

export default ClimateUrgencyMeter;