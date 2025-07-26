import React from 'react';

const ActionButtons = ({ handleClimateAction, handleShareImpact, isDarkMode }) => (
  <div className="flex flex-wrap gap-4 justify-center">
    <button
      onClick={handleClimateAction}
      className={`px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-xl backdrop-blur-lg ${
        isDarkMode 
          ? 'bg-gradient-to-r from-emerald-600/80 to-green-600/80 hover:from-emerald-500/80 hover:to-green-500/80 text-white border border-white/20' 
          : 'bg-gradient-to-r from-emerald-600/80 to-green-600/80 hover:from-emerald-700/80 hover:to-green-700/80 text-white border border-white/30'
      }`}>
      Take Climate Action
    </button>
    
    <button
      onClick={handleShareImpact}
      className={`px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-xl backdrop-blur-lg ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500/80 hover:to-pink-500/80 text-white border border-white/20' 
          : 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700/80 hover:to-pink-700/80 text-white border border-white/30'
      }`}>
      Share Your Impact
    </button>
  </div>
);

export default ActionButtons;