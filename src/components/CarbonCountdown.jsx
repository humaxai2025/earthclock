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
    targetDate: new Date('2031-12-31T23:59:59'), // Approximate date when budget exhausted
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

  const formatTimeUnit = (value, unit) => {
    const paddedValue = value.toString().padStart(2, '0');
    return { value: paddedValue, unit };
  };

  return (
    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-xl shadow-xl border transition-all duration-300 hover:scale-105 ${
      isDarkMode ? 'bg-orange-900/30 border-orange-500/30' : 'bg-orange-50/80 border-orange-200/50'
    }`}>
      <h4 className="text-xs sm:text-sm font-semibold mb-2 text-orange-400 flex items-center">
        <Clock className="animate-pulse text-sm sm:text-base mr-1" />
        <span className="ml-1">Carbon Budget</span>
        <div className="ml-auto flex space-x-1">
          <div className="w-1 h-1 rounded-full bg-orange-400 animate-ping" />
          <div className="w-1 h-1 rounded-full bg-orange-400 animate-ping" style={{animationDelay: '0.3s'}} />
          <div className="w-1 h-1 rounded-full bg-orange-400 animate-ping" style={{animationDelay: '0.6s'}} />
        </div>
      </h4>

      {/* Countdown Display */}
      <div className="mb-3">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold font-mono text-orange-400">
              {formatTimeUnit(timeRemaining.years, 'Y').value}
            </div>
            <div className="text-xs opacity-70">Years</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold font-mono text-orange-400">
              {formatTimeUnit(timeRemaining.days, 'D').value}
            </div>
            <div className="text-xs opacity-70">Days</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-1">
          <div className="text-center">
            <div className="text-sm sm:text-base font-bold font-mono text-orange-300">
              {formatTimeUnit(timeRemaining.hours, 'H').value}
            </div>
            <div className="text-xs opacity-60">H</div>
          </div>
          <div className="text-center">
            <div className="text-sm sm:text-base font-bold font-mono text-orange-300">
              {formatTimeUnit(timeRemaining.minutes, 'M').value}
            </div>
            <div className="text-xs opacity-60">M</div>
          </div>
          <div className="text-center">
            <div className="text-sm sm:text-base font-bold font-mono text-orange-300 animate-pulse">
              {formatTimeUnit(timeRemaining.seconds, 'S').value}
            </div>
            <div className="text-xs opacity-60">S</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1 opacity-80">
          <span>Budget Used</span>
          <span className="font-medium">{carbonBudgetData.budgetUsedPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full relative animate-pulse" 
               style={{width: `${carbonBudgetData.budgetUsedPercent}%`}}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-ping" />
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-orange-400">
          <TrendingDown className="w-3 h-3 mr-1" />
          <span className="font-medium">Until 1.5°C limit</span>
        </div>
        <div className="flex items-center text-orange-500">
          <AlertTriangle className="w-3 h-3 mr-1" />
          <span className="font-medium">Live</span>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-xs text-center mt-2 opacity-60">
        {carbonBudgetData.remainingGt} Gt CO₂ remaining
      </div>
    </div>
  );
};

export default CarbonCountdown;