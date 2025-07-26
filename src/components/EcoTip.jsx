import React from 'react';
import { Leaf, Sparkles, Bot } from 'lucide-react';

const EcoTip = ({ dailyTip, isDarkMode, isLoading = false }) => {
  const isAITip = !dailyTip.includes('unavailable') && !dailyTip.includes('Reconnecting') && !dailyTip.includes('loading');
  
  return (
    <div className={`p-6 rounded-2xl backdrop-blur-xl shadow-xl border transition-all duration-1000 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border-emerald-500/30 text-emerald-100' 
        : 'bg-gradient-to-r from-emerald-50/80 to-cyan-50/80 border-emerald-200/50 text-emerald-800'
    }`}>
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <div className="flex items-center mr-2">
          <Leaf className="w-5 h-5 animate-pulse" />
          <Bot className="w-4 h-4 ml-1 animate-bounce" style={{animationDelay: '0.2s'}} />
        </div>
        Earth Wisdom
        <span className="ml-auto text-sm opacity-60 flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${
            isLoading ? 'bg-yellow-400 animate-pulse' : 
            isAITip ? 'bg-emerald-400' : 'bg-orange-400'
          }`} />
          {isLoading ? 'Generating...' : 
           isAITip ? 'AI-Generated • Updates every 8s' : 
           'Reconnecting to AI...'}
        </span>
      </h3>
      <p className={`text-xl leading-relaxed transition-all duration-500 hover:scale-105 transform cursor-default ${
        isLoading ? 'opacity-70 animate-pulse' : ''
      }`}>
        {dailyTip}
      </p>
      {!isLoading && isAITip && (
        <div className="text-xs opacity-50 mt-2 text-center flex items-center justify-center">
          <Sparkles className="w-3 h-3 mr-1" />
          Fresh contextual wisdom powered by Gemini AI
        </div>
      )}
      {!isLoading && !isAITip && (
        <div className="text-xs opacity-60 mt-2 text-center text-orange-400">
          ⚠️ AI temporarily unavailable - will retry automatically
        </div>
      )}
    </div>
  );
};

export default EcoTip;