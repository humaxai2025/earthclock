import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, TrendingDown } from 'lucide-react';

const CarbonCountdown = ({ isDarkMode }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Carbon budget data
  const carbonBudgetData = {
    remainingGt: 300, // Remaining carbon budget in Gt CO₂
    currentEmissions: 42.0, // Current annual emissions in Gt CO₂/year
    budgetUsedPercent: 83 // Percentage of original budget already used
  };

  // Calculate more precise countdown based on emission rate
  const calculateRemainingTime = () => {
    const now = new Date();
    
    // Calculate target date based on current emission rate
    const yearsRemaining = carbonBudgetData.remainingGt / carbonBudgetData.currentEmissions;
    const millisecondsRemaining = yearsRemaining * 365.25 * 24 * 60 * 60 * 1000;
    const targetDate = new Date(now.getTime() + millisecondsRemaining);
    
    const timeDiff = targetDate.getTime() - now.getTime();
    
    if (timeDiff <= 0) {
      return {
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true
      };
    }

    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      years,
      days,
      hours,
      minutes,
      seconds,
      expired: false
    };
  };

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateRemainingTime());
    }, 1000);

    // Set initial time
    setTimeRemaining(calculateRemainingTime());

    return () => clearInterval(timer);
  }, []);

  const formatTimeUnit = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className={`p-3 rounded-xl backdrop-blur-xl shadow-xl border transition-all duration-300 hover:scale-105 ${
      isDarkMode ? 'bg-orange-900/30 border-orange-500/30' : 'bg-orange-50/80 border-orange-200/50'
    }`}>
      {/* Header */}
      <h4 className="text-xs font-semibold mb-2 text-orange-400 flex items-center">
        <Clock className="animate-pulse text-sm mr-1" />
        <span className="ml-1">Carbon Budget</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-orange-400 animate-ping" />
      </h4>

      {/* Main Countdown Display - Compact */}
      <div className="mb-2">
        <div className="flex items-center justify-center space-x-3 mb-2">
          {/* Years */}
          <div className="text-center">
            <div className={`text-xl font-bold font-mono leading-none transition-all duration-300 ${
              isDarkMode ? 'text-orange-300' : 'text-orange-600'
            }`} style={{
              textShadow: '0 0 10px rgba(251, 146, 60, 0.5)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}>
              {formatTimeUnit(timeRemaining.years)}
            </div>
            <div className="text-xs opacity-70 font-medium">YRS</div>
          </div>

          {/* Separator */}
          <div className="text-orange-400 font-bold animate-pulse">:</div>

          {/* Days */}
          <div className="text-center">
            <div className={`text-xl font-bold font-mono leading-none transition-all duration-300 ${
              isDarkMode ? 'text-orange-300' : 'text-orange-600'
            }`} style={{
              textShadow: '0 0 10px rgba(251, 146, 60, 0.5)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}>
              {formatTimeUnit(timeRemaining.days)}
            </div>
            <div className="text-xs opacity-70 font-medium">DAYS</div>
          </div>

          {/* Separator */}
          <div className="text-orange-400 font-bold animate-pulse">:</div>

          {/* Hours:Minutes:Seconds - Compact */}
          <div className="text-center">
            <div className={`text-sm font-bold font-mono leading-none transition-all duration-300 ${
              isDarkMode ? 'text-orange-400' : 'text-orange-500'
            }`} style={{
              textShadow: '0 0 8px rgba(251, 146, 60, 0.3)',
              animation: timeRemaining.seconds % 2 === 0 ? 'pulse 1s ease-in-out' : 'none'
            }}>
              {formatTimeUnit(timeRemaining.hours)}:{formatTimeUnit(timeRemaining.minutes)}:{formatTimeUnit(timeRemaining.seconds)}
            </div>
            <div className="text-xs opacity-70 font-medium">H:M:S</div>
          </div>
        </div>
      </div>

      {/* Compact Progress Bar */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full relative transition-all duration-1000" 
               style={{
                 width: `${carbonBudgetData.budgetUsedPercent}%`,
                 animation: 'slideIn 2s ease-out, glow 3s ease-in-out infinite alternate'
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-ping" />
          </div>
        </div>
      </div>

      {/* Compact Bottom Info */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-orange-400">
          <TrendingDown className="w-3 h-3 mr-1 animate-bounce" />
          <span className="font-medium">{carbonBudgetData.budgetUsedPercent}% used</span>
        </div>
        <div className="flex items-center text-orange-500">
          <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse mr-1" />
          <span className="font-medium">LIVE</span>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes glow {
          0% { 
            text-shadow: 0 0 5px rgba(251, 146, 60, 0.5);
            transform: scale(1);
          }
          100% { 
            text-shadow: 0 0 15px rgba(251, 146, 60, 0.8), 0 0 25px rgba(251, 146, 60, 0.6);
            transform: scale(1.05);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes slideIn {
          from { width: 0%; }
          to { width: ${carbonBudgetData.budgetUsedPercent}%; }
        }
      `}</style>
    </div>
  );
};

export default CarbonCountdown;