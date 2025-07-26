import React from 'react';
import { Leaf, Wind, Sun, Thermometer, Droplets, Waves, Activity } from 'lucide-react';

const EnvironmentalDataCard = ({ icon: Icon, title, value, unit, type, getStatusColor, getStatusIcon, isDarkMode, delay, onMetricClick }) => (
  <div 
    className={`group p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
      isDarkMode ? 'hover:bg-white/5' : 'hover:bg-white/30'
    }`}
    onClick={() => onMetricClick(type)}
  >
    <div className="flex items-center text-xs opacity-80 mb-1">
      <Icon className="w-3 h-3 mr-1 group-hover:animate-spin" />
      {title}
      <div className="ml-auto">{getStatusIcon(type, value)}</div>
    </div>
    <div className={`text-xl font-bold transition-all duration-300 group-hover:scale-110 ${getStatusColor(value, type)}`}>
      {value}{unit}
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1 mt-2 overflow-hidden">
      <div className={`h-1 rounded-full transition-all duration-1000 ${getStatusColor(value, type).replace('text-', 'bg-')}`} 
           style={{width: `${Math.min(value * 2, 90)}%`, animation: `slideIn ${delay}s ease-out`}} />
    </div>
    <div className="text-xs text-center mt-1 opacity-50 group-hover:opacity-80 transition-opacity">
      Click for details
    </div>
  </div>
);

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

const EnvironmentalDataGrid = ({ environmentalData, getStatusColor, getStatusIcon, isDarkMode, loading, onMetricClick }) => (
  <div className={`h-full p-6 rounded-3xl backdrop-blur-xl shadow-2xl border transition-all duration-700 hover:scale-[1.02] ${
    isDarkMode 
      ? 'bg-gradient-to-br from-white/5 to-white/10 border-white/20 text-white' 
      : 'bg-gradient-to-br from-white/70 to-white/90 border-white/50 text-gray-800'
  }`}>
    <h2 className={`text-xl font-bold mb-6 flex items-center ${
      isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
    }`}>
      <Leaf className="w-6 h-6 mr-2" />
      Planet Vital Signs
      <div className={`ml-auto w-3 h-3 rounded-full animate-pulse ${
        environmentalData.isRealTime ? 'bg-emerald-400' : 'bg-yellow-400'
      }`} />
    </h2>
    
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <EnvironmentalDataCard 
          icon={Wind}
          title="CO₂ Level"
          value={environmentalData.co2}
          unit=" ppm"
          type="co2"
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          isDarkMode={isDarkMode}
          delay={1.5}
          onMetricClick={onMetricClick}
        />
        <EnvironmentalDataCard 
          icon={Sun}
          title="Clean Energy"
          value={environmentalData.renewableEnergy}
          unit="%"
          type="renewable"
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          isDarkMode={isDarkMode}
          delay={1.8}
          onMetricClick={onMetricClick}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EnvironmentalDataCard 
          icon={Thermometer}
          title="Temperature"
          value={`+${environmentalData.temperature}`}
          unit="°C"
          type="temp"
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          isDarkMode={isDarkMode}
          delay={2.1}
          onMetricClick={onMetricClick}
        />
        <SimpleDataCard 
          title="Trees Lost"
          value={(environmentalData.deforestation/1000).toFixed(0)}
          unit="k"
          color="orange"
          isDarkMode={isDarkMode}
          delay={2.4}
          metricType="deforestation"
          onMetricClick={onMetricClick}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EnvironmentalDataCard 
          icon={Droplets}
          title="Arctic Ice"
          value={environmentalData.arcticIce}
          unit="%"
          type="ice"
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          isDarkMode={isDarkMode}
          delay={2.7}
          onMetricClick={onMetricClick}
        />
        <SimpleDataCard 
          title="Ocean Plastic"
          value={environmentalData.oceanPlastic}
          unit="M t/yr"
          color="red"
          isDarkMode={isDarkMode}
          delay={3.0}
          metricType="oceanPlastic"
          onMetricClick={onMetricClick}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EnvironmentalDataCard 
          icon={Waves}
          title="Sea Level"
          value={`+${environmentalData.seaLevel}`}
          unit=" mm/yr"
          type="seaLevel"
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          isDarkMode={isDarkMode}
          delay={3.3}
          onMetricClick={onMetricClick}
        />
        <EnvironmentalDataCard 
          icon={Activity}
          title="Wildlife"
          value={environmentalData.biodiversity}
          unit="%"
          type="biodiversity"
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          isDarkMode={isDarkMode}
          delay={3.6}
          onMetricClick={onMetricClick}
        />
      </div>

      {/* Enhanced Real-time Data Status */}
      <div className="flex justify-center mt-4">
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-lg border transition-all duration-300 ${
          environmentalData.isRealTime 
            ? isDarkMode ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-300' : 'bg-emerald-100/50 border-emerald-200/50 text-emerald-700'
            : isDarkMode ? 'bg-yellow-900/20 border-yellow-500/30 text-yellow-300' : 'bg-yellow-100/50 border-yellow-200/50 text-yellow-700'
        }`}>
          <div className="relative">
            <div className={`w-2 h-2 rounded-full animate-ping absolute ${
              environmentalData.isRealTime ? 'bg-emerald-400' : 'bg-yellow-400'
            }`} />
            <div className={`w-2 h-2 rounded-full ${
              environmentalData.isRealTime ? 'bg-emerald-400' : 'bg-yellow-400'
            }`} />
          </div>
          <span className="text-xs font-medium">
            {environmentalData.isRealTime ? 'Live data' : 'Estimated data'}
          </span>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full animate-bounce ${
                environmentalData.isRealTime ? 'bg-emerald-400' : 'bg-yellow-400'
              }`} 
                   style={{animationDelay: `${i * 0.1}s`}} />
            ))}
          </div>
          {loading && (
            <div className="ml-2">
              <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
      
      {/* Data Source & Last Update */}
      <div className="flex justify-center mt-2">
        <div className={`text-xs opacity-60 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <div>Last updated: {new Date(environmentalData.lastUpdate).toLocaleTimeString()}</div>
          {environmentalData.error && (
            <div className="text-yellow-500 mt-1">
              ⚠️ {environmentalData.error}
            </div>
          )}
          {environmentalData.sources && environmentalData.isRealTime && (
            <div className="mt-1 text-xs opacity-50">
              Sources: {Object.values(environmentalData.sources).filter(Boolean).slice(0, 2).join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default EnvironmentalDataGrid;