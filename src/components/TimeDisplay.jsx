import React from 'react';

const TimeDisplay = ({ currentTime, pulseAnimation, isDarkMode }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`p-6 rounded-3xl backdrop-blur-xl shadow-2xl border transition-all duration-700 hover:scale-[1.02] group ${
      isDarkMode 
        ? 'bg-gradient-to-br from-white/5 to-white/10 border-white/20 text-white' 
        : 'bg-gradient-to-br from-white/70 to-white/90 border-white/50 text-gray-800'
    }`}>
      <div className="text-center">
        <div className={`text-4xl lg:text-5xl font-mono font-bold mb-3 tracking-wider transition-all duration-1000 ${
          pulseAnimation ? 'scale-105' : 'scale-100'
        } ${isDarkMode ? 'text-cyan-300' : 'text-indigo-700'}`}>
          {formatTime(currentTime)}
        </div>
        <div className={`text-lg font-medium opacity-90 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;