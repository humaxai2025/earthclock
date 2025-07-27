import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

const EcoTip = ({ isDarkMode }) => {
  // 20 Hardcoded Earth Wisdom Tips
  const earthWisdomTips = [
    "🌱 Every small action creates ripples of positive change across our planet",
    "🌍 The Earth doesn't belong to us; we belong to the Earth - Chief Seattle",
    "💧 Water is life's matter and matrix, mother and medium. There is no life without water",
    "🌳 Trees are poems that the earth writes upon the sky - Kahlil Gibran", 
    "🦋 In every walk with nature, one receives far more than they seek",
    "⚡ The sun provides more energy to Earth in one hour than humanity uses in a year",
    "🌊 Oceans cover 71% of Earth's surface and produce over 50% of our oxygen",
    "🍃 A single tree can absorb 48 pounds of CO₂ per year and produce oxygen for two people",
    "🌺 Biodiversity is the key to ecosystem resilience and planetary health",
    "🌙 We do not inherit the Earth from our ancestors; we borrow it from our children",
    "🌿 Nature is not a place to visit. It is our home - Gary Snyder",
    "🌸 The earth is what we all have in common - Wendell Berry",
    "🦅 Look deep into nature, and then you will understand everything better - Einstein",
    "🌾 Soil is not renewable in a human timescale - protect this precious resource",
    "❄️ Arctic ice reflects sunlight, helping to regulate Earth's temperature",
    "🌋 Forests are the lungs of our planet, breathing life into the atmosphere",
    "🌈 Climate action today determines the world we leave for tomorrow",
    "🐝 Bees pollinate one-third of everything we eat - protect our pollinators",
    "🌟 Renewable energy: infinite, clean, and increasingly affordable",
    "🌏 Think globally, act locally - every choice matters for our shared future"
  ];

  // Tip rotation state
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentTip, setCurrentTip] = useState(earthWisdomTips[0]);
  const [countdown, setCountdown] = useState(8);

  // Set up tip rotation every 60 seconds with countdown
  useEffect(() => {
    // Countdown timer (updates every second)
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          return 60; // Reset to 8 when it reaches 0
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Tip rotation timer (updates every 8 seconds)
    const tipTimer = setInterval(() => {
      setCurrentTipIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % earthWisdomTips.length;
        setCurrentTip(earthWisdomTips[nextIndex]);
        return nextIndex;
      });
      setCountdown(60); // Reset countdown when tip changes
    }, 60000);

    return () => {
      clearInterval(countdownTimer);
      clearInterval(tipTimer);
    };
  }, []);

  return (
    <div className={`p-6 rounded-2xl backdrop-blur-xl shadow-xl border transition-all duration-1000 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border-emerald-500/30 text-emerald-100' 
        : 'bg-gradient-to-r from-emerald-50/80 to-cyan-50/80 border-emerald-200/50 text-emerald-800'
    }`}>
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Leaf className="w-5 h-5 animate-pulse mr-2" />
        Earth Wisdom
        <span className="ml-auto text-sm opacity-60 flex items-center">
          <span className="w-2 h-2 rounded-full mr-2 bg-emerald-400 animate-pulse" />
          Updates in {countdown}s
        </span>
      </h3>
      <p className="text-xl leading-relaxed transition-all duration-500 hover:scale-105 transform cursor-default">
        {currentTip}
      </p>
    </div>
  );
};

export default EcoTip;