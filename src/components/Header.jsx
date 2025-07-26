import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';

const Header = ({ isDarkMode, setIsDarkMode, pulseAnimation }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      {/* Left side - App Title */}
      <div className="flex items-center space-x-3">
        <div className={`relative ${pulseAnimation ? 'animate-pulse' : ''}`}>
          <Globe className={`w-8 h-8 ${isDarkMode ? 'text-cyan-400' : 'text-emerald-500'}`} />
          {pulseAnimation && (
            <div className="absolute inset-0 rounded-full animate-ping">
              <Globe className={`w-8 h-8 ${isDarkMode ? 'text-cyan-400' : 'text-emerald-500'} opacity-75`} />
            </div>
          )}
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            EarthClock
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Planet Health Dashboard
          </p>
        </div>
      </div>

      {/* Right side - Dark Mode Toggle */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-full backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? 'bg-gray-800/50 border-gray-600/30 text-yellow-400 hover:bg-gray-700/50'
              : 'bg-white/50 border-gray-200/30 text-gray-700 hover:bg-gray-100/50'
          }`}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;