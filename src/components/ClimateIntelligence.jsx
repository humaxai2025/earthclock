import React from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

const ClimateIntelligence = ({ isDarkMode, environmentalData }) => (
  <div className={`h-full p-6 rounded-3xl backdrop-blur-xl shadow-2xl border ${
    isDarkMode 
      ? 'bg-gradient-to-br from-white/5 to-white/10 border-white/20 text-white' 
      : 'bg-gradient-to-br from-white/70 to-white/90 border-white/50 text-gray-800'
  }`}>
    <h3 className="text-xl font-bold mb-4 flex items-center">
      <Activity className="w-5 h-5 mr-2" />
      Climate Intelligence
    </h3>
    
    <div className="space-y-3 mb-4">
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className={`text-center p-3 rounded-lg backdrop-blur-lg border ${
          isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50/80 border-green-200/50'
        }`}>
          <div className="text-lg font-bold text-green-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +6%
          </div>
          <div className="text-xs opacity-80">Renewables</div>
        </div>
        <div className={`text-center p-3 rounded-lg backdrop-blur-lg border ${
          isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50/80 border-red-200/50'
        }`}>
          <div className="text-lg font-bold text-red-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +3.7
          </div>
          <div className="text-xs opacity-80">CO₂ ppm</div>
        </div>
        <div className={`text-center p-3 rounded-lg backdrop-blur-lg border ${
          isDarkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50/80 border-blue-200/50'
        }`}>
          <div className="text-lg font-bold text-blue-400 flex items-center justify-center">
            <TrendingDown className="w-4 h-4 mr-1" />
            -13%
          </div>
          <div className="text-xs opacity-80">Ice/decade</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Paris Agreement</span>
            <span className="text-red-400">Behind</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-red-400 h-1.5 rounded-full" style={{width: '75%'}}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Renewable Energy</span>
            <span className="text-green-400">On track</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-green-400 h-1.5 rounded-full" style={{width: '55%'}}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Forest Protection</span>
            <span className="text-yellow-400">Slow</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-yellow-400 h-1.5 rounded-full" style={{width: '35%'}}></div>
          </div>
        </div>
      </div>
    </div>

    {/* Data Sources & Facts */}
    <div className="grid grid-cols-1 gap-4">
      <div className={`p-4 rounded-xl backdrop-blur-lg border ${
        isDarkMode ? 'bg-white/5 border-white/20' : 'bg-white/60 border-white/30'
      }`}>
        <h4 className="text-sm font-semibold mb-2 text-emerald-400 flex items-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
          Data Sources
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
            <span>NOAA Mauna Loa</span>
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2" />
            <span>NASA GISS</span>
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
            <span>NSIDC Satellites</span>
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2" />
            <span>IEA Global Review</span>
          </div>
        </div>
      </div>
      
      <div className={`p-4 rounded-xl backdrop-blur-lg border ${
        isDarkMode ? 'bg-white/5 border-white/20' : 'bg-white/60 border-white/30'
      }`}>
        <h4 className="text-sm font-semibold mb-2 text-blue-400 flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-400 mr-2" />
          Key Facts
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-start">
            <span className="text-emerald-400 mr-1 mt-0.5">•</span>
            <span>2024 warmest year on record</span>
          </div>
          <div className="flex items-start">
            <span className="text-emerald-400 mr-1 mt-0.5">•</span>
            <span>18 lowest ice minimums in 18 years</span>
          </div>
          <div className="flex items-start">
            <span className="text-emerald-400 mr-1 mt-0.5">•</span>
            <span>Renewables met 90% growth</span>
          </div>
          <div className="flex items-start">
            <span className="text-emerald-400 mr-1 mt-0.5">•</span>
            <span>Wildlife down 68% since 1970</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ClimateIntelligence;