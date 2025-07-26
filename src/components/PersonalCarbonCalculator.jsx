import React, { useState, useEffect } from 'react';
import { Calculator, Car, Leaf, Zap, TrendingDown, TrendingUp, X, Home, ShoppingBag, Plane, Bus, Target, Award } from 'lucide-react';

// Simple card component that opens the calculator modal
const PersonalCarbonCalculator = ({ isDarkMode, cardType = "daily", onCalculatorClick }) => {
  const getCardClasses = (type, isDark) => {
    const cardStyles = {
      daily: {
        container: isDark 
          ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 text-blue-100' 
          : 'bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border-blue-200/50 text-blue-800',
        dot: 'bg-blue-400',
        accent: 'text-blue-400'
      }
    };
    return cardStyles[type];
  };

  const styles = getCardClasses(cardType, isDarkMode);

  return (
    <div 
      className={`p-4 rounded-xl backdrop-blur-xl shadow-lg border transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${styles.container}`}
      onClick={onCalculatorClick}
    >
      <h4 className="font-semibold mb-2 flex items-center">
        <Calculator className="animate-pulse text-lg mr-2" />
        Carbon Calculator
        <div className={`ml-auto w-2 h-2 rounded-full ${styles.dot} animate-pulse`} />
        <span className="ml-1 text-xs opacity-60">▶</span>
      </h4>
      
      <div className={`text-2xl font-bold ${styles.accent} mb-1 group-hover:scale-110 transition-transform duration-300`}>
        Calculate
      </div>
      
      <div className="text-sm opacity-80 mb-2">Complete carbon assessment</div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div className={`bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-1000 relative`} 
             style={{width: '60%', animation: 'slideIn 2.5s ease-out'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-ping" />
        </div>
      </div>
      
      <div className="text-xs text-center mt-2 opacity-50 group-hover:opacity-80 transition-opacity">
        Click for full assessment
      </div>
    </div>
  );
};

// Comprehensive calculator modal component based on index.html
const CarbonCalculatorModal = ({ isOpen, onClose, isDarkMode }) => {
  // Assessment state - matching index.html exactly
  const [carKm, setCarKm] = useState(200);
  const [flights, setFlights] = useState(2);
  const [publicTransport, setPublicTransport] = useState(5);
  const [electricity, setElectricity] = useState(100);
  const [heating, setHeating] = useState(80);
  const [meatMeals, setMeatMeals] = useState(10);
  const [dairy, setDairy] = useState(3);
  const [shopping, setShopping] = useState(400);
  const [waste, setWaste] = useState(2);
  
  // Results state
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Calculate carbon footprint using exact logic from index.html
  const calculateFootprint = () => {
    // Calculate carbon footprint (simplified calculation in kg CO2 per month)
    const transport = (carKm * 4.33 * 0.21) + (flights * 500 / 12) + (publicTransport * 4.33 * 0.05);
    const energy = (electricity * 0.5) + (heating * 2.3);
    const food = (meatMeals * 4.33 * 3.3) + (dairy * 30 * 1.9);
    const consumption = (shopping * 0.5) + (waste * 4.33 * 10);

    const total = Math.round(transport + energy + food + consumption);

    return {
      total,
      transport: Math.round(transport),
      energy: Math.round(energy),
      food: Math.round(food),
      consumption: Math.round(consumption),
      inputs: { carKm, flights, publicTransport, electricity, heating, meatMeals, dairy, shopping, waste }
    };
  };

  // Generate recommendations using logic from index.html
  const generateRecommendations = (data) => {
    const newRecommendations = [];
    
    // Basic recommendations based on highest emissions
    if (data.transport > 100) {
      newRecommendations.push({
        title: 'Use public transport or bike for short trips',
        difficulty: 'easy',
        co2Impact: Math.round(data.transport * 0.2),
        icon: '🚲'
      });
    }
    
    if (data.energy > 80) {
      newRecommendations.push({
        title: 'Switch to LED bulbs and improve insulation',
        difficulty: 'medium',
        co2Impact: Math.round(data.energy * 0.15),
        icon: '💡'
      });
    }
    
    if (data.food > 120) {
      newRecommendations.push({
        title: 'Try meatless meals twice a week',
        difficulty: 'easy',
        co2Impact: Math.round(data.food * 0.25),
        icon: '🥗'
      });
    }
    
    if (data.consumption > 50) {
      newRecommendations.push({
        title: 'Buy second-hand and reduce waste',
        difficulty: 'medium',
        co2Impact: Math.round(data.consumption * 0.3),
        icon: '♻️'
      });
    }

    // Additional recommendations for comprehensive coverage
    if (carKm > 200) {
      newRecommendations.push({
        title: 'Consider carpooling or electric vehicle',
        difficulty: 'hard',
        co2Impact: Math.round(data.transport * 0.4),
        icon: '🚗'
      });
    }

    if (flights > 2) {
      newRecommendations.push({
        title: 'Reduce air travel or buy carbon offsets',
        difficulty: 'medium',
        co2Impact: Math.round((flights - 2) * 500 / 12),
        icon: '✈️'
      });
    }

    if (electricity > 150) {
      newRecommendations.push({
        title: 'Install solar panels or switch to green energy',
        difficulty: 'hard',
        co2Impact: Math.round(data.energy * 0.3),
        icon: '☀️'
      });
    }

    if (newRecommendations.length === 0) {
      newRecommendations.push({
        title: 'Great job! You\'re already doing well!',
        difficulty: 'easy',
        co2Impact: 0,
        icon: '🌱'
      });
    }

    return newRecommendations;
  };

  // Recalculate when inputs change
  useEffect(() => {
    const assessment = calculateFootprint();
    setCurrentAssessment(assessment);
    setRecommendations(generateRecommendations(assessment));
  }, [carKm, flights, publicTransport, electricity, heating, meatMeals, dairy, shopping, waste]);

  const getFootprintColor = (footprint) => {
    if (footprint < 500) return 'text-green-400';
    if (footprint < 1000) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDifficultyClasses = (difficulty) => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-2">
      <div className={`relative w-full max-w-6xl h-[96vh] flex flex-col rounded-2xl shadow-2xl border transition-all duration-300 ${isDarkMode ? 'bg-slate-900/95 border-slate-700 text-white' : 'bg-white/95 border-gray-200 text-gray-900'}`}>
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200/20 backdrop-blur-lg">
          <div className="flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-400" />
            <h2 className="text-lg font-bold">🌱 Carbon Assessment</h2>
          </div>
          <button 
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Results Display - Compact version */}
          {currentAssessment && (
            <div className={`p-4 rounded-xl mb-4 ${isDarkMode ? 'bg-slate-800/50' : 'bg-gradient-to-br from-yellow-50 to-orange-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`text-2xl font-bold ${getFootprintColor(currentAssessment.total)}`}>
                  {currentAssessment.total} kg CO₂/month
                </div>
                <div className={`text-sm font-medium ${currentAssessment.total < 500 ? 'text-green-600' : currentAssessment.total < 1000 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {currentAssessment.total < 500 ? '🌱 Excellent!' :
                   currentAssessment.total < 1000 ? '🟡 Good progress' : 
                   '🔴 Room to improve'}
                </div>
              </div>
              
              {/* Compact Breakdown */}
              <div className="grid grid-cols-4 gap-2">
                <div className={`p-2 rounded-lg text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-white/70'}`}>
                  <Car className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                  <div className="text-sm font-bold text-blue-400">{currentAssessment.transport}</div>
                  <div className="text-xs opacity-70">Transport</div>
                </div>
                <div className={`p-2 rounded-lg text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-white/70'}`}>
                  <Home className="w-4 h-4 mx-auto mb-1 text-green-400" />
                  <div className="text-sm font-bold text-green-400">{currentAssessment.energy}</div>
                  <div className="text-xs opacity-70">Energy</div>
                </div>
                <div className={`p-2 rounded-lg text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-white/70'}`}>
                  <Leaf className="w-4 h-4 mx-auto mb-1 text-orange-400" />
                  <div className="text-sm font-bold text-orange-400">{currentAssessment.food}</div>
                  <div className="text-xs opacity-70">Food</div>
                </div>
                <div className={`p-2 rounded-lg text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-white/70'}`}>
                  <ShoppingBag className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                  <div className="text-sm font-bold text-purple-400">{currentAssessment.consumption}</div>
                  <div className="text-xs opacity-70">Shopping</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Assessment Form */}
            <div className="space-y-6">
              {/* Transportation */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/30' : 'bg-blue-50/50'}`}>
                <h3 className="font-semibold mb-4 flex items-center text-blue-400">
                  <Car className="w-5 h-5 mr-2" />
                  🚗 Transportation
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Kilometers driven per week: {carKm} km
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={carKm}
                      onChange={(e) => setCarKm(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Flights per year: {flights}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={flights}
                      onChange={(e) => setFlights(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Public transport hours per week: {publicTransport}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={publicTransport}
                      onChange={(e) => setPublicTransport(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Home Energy */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/30' : 'bg-green-50/50'}`}>
                <h3 className="font-semibold mb-4 flex items-center text-green-400">
                  <Home className="w-5 h-5 mr-2" />
                  🏠 Home Energy
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Monthly electricity bill: ${electricity}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={electricity}
                      onChange={(e) => setElectricity(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Monthly heating/gas bill: ${heating}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={heating}
                      onChange={(e) => setHeating(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Food & Diet */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/30' : 'bg-orange-50/50'}`}>
                <h3 className="font-semibold mb-4 flex items-center text-orange-400">
                  <Leaf className="w-5 h-5 mr-2" />
                  🍽️ Food & Diet
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Meat meals per week: {meatMeals}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="21"
                      value={meatMeals}
                      onChange={(e) => setMeatMeals(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Dairy servings per day: {dairy}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={dairy}
                      onChange={(e) => setDairy(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Consumption */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50'}`}>
                <h3 className="font-semibold mb-4 flex items-center text-purple-400">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  🛍️ Consumption
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Monthly spending on goods: ${shopping}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={shopping}
                      onChange={(e) => setShopping(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Trash bags per week: {waste}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={waste}
                      onChange={(e) => setWaste(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations & Facts */}
            <div className="space-y-4 h-full flex flex-col">
              <div className={`p-3 rounded-xl flex-1 flex flex-col ${isDarkMode ? 'bg-slate-800/30' : 'bg-green-50/50'}`}>
                <h3 className="font-semibold mb-3 flex items-center text-green-400 text-sm">
                  <Target className="w-4 h-4 mr-2" />
                  💡 Your Personalized Action Plan
                </h3>
                
                <div className="space-y-2 flex-1 overflow-y-auto">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/70 border-gray-200'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-lg">{rec.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium mb-1 text-sm">{rec.title}</div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {rec.co2Impact > 0 && (
                              <span className="text-green-600 text-xs font-medium">
                                Save {rec.co2Impact} kg CO₂/month
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyClasses(rec.difficulty)}`}>
                              {rec.difficulty.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Additional helpful tips to fill space */}
                  <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/70 border-gray-200'}`}>
                    <div className="flex items-start gap-3">
                      <div className="text-lg">🌱</div>
                      <div className="flex-1">
                        <div className="font-medium mb-1 text-sm">Track your progress regularly</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-blue-600 text-xs font-medium">
                            Maintain awareness
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyClasses('easy')}`}>
                            EASY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/70 border-gray-200'}`}>
                    <div className="flex items-start gap-3">
                      <div className="text-lg">👥</div>
                      <div className="flex-1">
                        <div className="font-medium mb-1 text-sm">Share tips with family and friends</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-purple-600 text-xs font-medium">
                            Multiply impact
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyClasses('easy')}`}>
                            EASY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-white/70 border-gray-200'}`}>
                    <div className="flex items-start gap-3">
                      <div className="text-lg">💰</div>
                      <div className="flex-1">
                        <div className="font-medium mb-1 text-sm">Calculate cost savings from efficiency</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-green-600 text-xs font-medium">
                            Save money + planet
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyClasses('medium')}`}>
                            MEDIUM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                <h3 className="font-medium mb-2 flex items-center text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  📊 Quick Facts & Targets
                </h3>
                <ul className="text-xs space-y-1 opacity-80">
                  <li>• <strong>Global average:</strong> ~1,000 kg CO₂/month</li>
                  <li>• <strong>Paris target:</strong> {'<'}500 kg by 2030</li>
                  <li>• <strong>Transport:</strong> ~29% of total emissions</li>
                  <li>• <strong>Diet impact:</strong> 10-25% reduction possible</li>
                  <li>• <strong>Energy efficiency:</strong> 15-30% savings</li>
                  <li>• <strong>Best performers:</strong> Sweden ~300 kg/month</li>
                  <li>• <strong>High emitters:</strong> Qatar &gt;3,000 kg/month</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex-shrink-0 p-3 border-t border-gray-200/20 backdrop-blur-lg ${isDarkMode ? 'bg-slate-900/95' : 'bg-white/95'}`}>
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              ✅ Assessment Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalCarbonCalculator;
export { CarbonCalculatorModal };