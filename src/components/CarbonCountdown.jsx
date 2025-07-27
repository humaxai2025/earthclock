import React, { useState, useEffect } from 'react';
import { Clock, TrendingDown } from 'lucide-react';

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
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Clock className="w-3 h-3 text-orange-400 animate-pulse mr-1" />
          <span className={`text-xs font-semibold text-orange-400`}>Climate Deadline</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
      </div>

      {/* Compact Countdown - Single Row */}
      <div className="mb-2">
        <div className="flex items-center justify-center space-x-2 text-center">
          <div>
            <div className={`text-lg font-bold font-mono ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`} 
                 style={{textShadow: '0 0 8px rgba(251, 146, 60, 0.6)'}}>
              {formatTimeUnit(timeRemaining.years)}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>Y</div>
          </div>
          <div className="text-orange-400 font-bold animate-pulse">:</div>
          <div>
            <div className={`text-lg font-bold font-mono ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}
                 style={{textShadow: '0 0 8px rgba(251, 146, 60, 0.6)'}}>
              {formatTimeUnit(timeRemaining.days)}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>D</div>
          </div>
          <div className="text-orange-400 font-bold animate-pulse">:</div>
          <div>
            <div className={`text-sm font-bold font-mono ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}
                 style={{animation: timeRemaining.seconds % 2 === 0 ? 'pulse 1s ease-in-out' : 'none'}}>
              {formatTimeUnit(timeRemaining.hours)}:{formatTimeUnit(timeRemaining.minutes)}:{formatTimeUnit(timeRemaining.seconds)}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>H:M:S</div>
          </div>
        </div>
      </div>

      {/* Compact Progress Bar */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full" 
               style={{ width: `${carbonBudgetData.budgetUsedPercent}%` }}>
          </div>
        </div>
      </div>

      {/* Compact Bottom */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-orange-400">
          <TrendingDown className="w-3 h-3 mr-1" />
          <span>{carbonBudgetData.budgetUsedPercent}% used</span>
        </div>
        <div className="flex items-center text-orange-500">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse mr-1" />
          <span className={`${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}>LIVE</span>
        </div>
      </div>
    </div>
  );
};

export default CarbonCountdown;