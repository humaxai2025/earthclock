import React, { useState } from 'react';
import PersonalCarbonCalculator, { CarbonCalculatorModal } from './PersonalCarbonCalculator';

const ActionCard = ({ title, emoji, animationClass, value, subtitle, width, children, isDarkMode, cardType, onClick }) => {
  // Define explicit classes for each card type
  const getCardClasses = (type, isDark) => {
    const cardStyles = {
      daily: {
        container: isDark 
          ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 text-blue-100' 
          : 'bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border-blue-200/50 text-blue-800',
        dot: 'bg-blue-400',
        progressBar: 'bg-gradient-to-r from-blue-400 to-blue-500',
        valueText: 'text-blue-400'
      },
      carbon: {
        container: isDark 
          ? 'bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30 text-orange-100' 
          : 'bg-gradient-to-br from-orange-50/80 to-red-50/80 border-orange-200/50 text-orange-800',
        dot: 'bg-orange-400',
        progressBar: 'bg-gradient-to-r from-orange-400 to-red-500',
        valueText: 'text-orange-400'
      },
      tipping: {
        container: isDark 
          ? 'bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/30 text-yellow-100' 
          : 'bg-gradient-to-br from-yellow-50/80 to-orange-50/80 border-yellow-200/50 text-yellow-800',
        dot: 'bg-yellow-400',
        progressBar: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        valueText: 'text-yellow-400'
      }
    };
    return cardStyles[type];
  };

  const styles = getCardClasses(cardType, isDarkMode);

  return (
    <div 
      className={`p-4 rounded-xl backdrop-blur-xl shadow-lg border transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${
        onClick ? 'cursor-pointer' : ''
      } ${styles.container}`}
      onClick={onClick}
    >
      <h4 className="font-semibold mb-2 flex items-center">
        <span className={`${animationClass} text-lg mr-2`} style={animationClass === 'animate-spin' ? {animationDuration: '3s'} : {}}>{emoji}</span>
        {title}
        <div className={`ml-auto w-2 h-2 rounded-full ${styles.dot} animate-pulse`} />
        {onClick && <span className="ml-1 text-xs opacity-60">▶</span>}
      </h4>
      {value && (
        <div className={`text-2xl font-bold ${styles.valueText} mb-1 group-hover:scale-110 transition-transform duration-300`}>
          {value}
        </div>
      )}
      {subtitle && (
        <div className="text-sm opacity-80 mb-2">{subtitle}</div>
      )}
      {width && (
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className={`${styles.progressBar} h-2 rounded-full transition-all duration-1000 relative`} 
               style={{width, animation: 'slideIn 2.5s ease-out'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-ping" />
          </div>
        </div>
      )}
      {children}
      {onClick && (
        <div className="text-xs text-center mt-2 opacity-50 group-hover:opacity-80 transition-opacity">
          Click for details
        </div>
      )}
    </div>
  );
};

const SimpleDataCard = ({ title, value, unit, color, isDarkMode, delay, metricType, onMetricClick }) => (
  <div 
    className={`group p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
      isDarkMode ? 'hover:bg-white/5' : 'hover:bg-white/30'
    }`}
    onClick={() => onMetricClick(metricType)}
  >
    <div className="text-xs opacity-80 mb-1 flex items-center">
      <div className={`w-3 h-3 mr-1 rounded-full bg-${color}-400 animate-pulse`} />
      {title}
    </div>
    <div className={`text-xl font-bold text-${color}-400 transition-all duration-300 group-hover:scale-110`}>
      {value}{unit}
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1 mt-2 overflow-hidden">
      <div className={`bg-${color}-400 h-1 rounded-full transition-all duration-1000`} 
           style={{width: '80%', animation: `slideIn ${delay}s ease-out`}} />
    </div>
    <div className="text-xs text-center mt-1 opacity-50 group-hover:opacity-80 transition-opacity">
      Click for details
    </div>
  </div>
);

const ActionCards = ({ isDarkMode, onCarbonBudgetClick, onTippingPointsClick }) => {
  const [showCarbonCalculatorModal, setShowCarbonCalculatorModal] = useState(false);

  const handleCalculatorClick = () => {
    setShowCarbonCalculatorModal(true);
  };

  const closeCarbonCalculatorModal = () => {
    setShowCarbonCalculatorModal(false);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        {/* Carbon Calculator Card */}
        <PersonalCarbonCalculator 
          isDarkMode={isDarkMode}
          cardType="daily"
          onCalculatorClick={handleCalculatorClick}
        />

        <ActionCard
          title="Carbon Budget"
          emoji="⏰"
          animationClass="animate-spin"
          value="~300 Gt"
          subtitle="Remaining for 1.5°C target"
          width="25%"
          isDarkMode={isDarkMode}
          cardType="carbon"
          onClick={onCarbonBudgetClick}
        />

        <ActionCard
          title="Tipping Points"
          emoji="⚡"
          animationClass="animate-pulse"
          value="5 of 16"
          subtitle="Climate tipping points triggered"
          width="31%"
          isDarkMode={isDarkMode}
          cardType="tipping"
          onClick={onTippingPointsClick}
        />
      </div>

      {/* Carbon Calculator Modal */}
      <CarbonCalculatorModal
        isOpen={showCarbonCalculatorModal}
        onClose={closeCarbonCalculatorModal}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default ActionCards;