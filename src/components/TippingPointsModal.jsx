import React from 'react';
import { X, AlertTriangle, ThermometerSun, Snowflake, Waves, TreePine, TrendingUp, Globe, Zap, Clock, Target } from 'lucide-react';

const TippingPointsModal = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  const tippingPointsData = {
    triggered: 5,
    total: 16,
    atRisk: 6,
    safe: 5,
    currentWarming: "1.47°C",
    dangerZone: "1.5-2.0°C",
    
    tippingPoints: [
      {
        id: 1,
        name: "Arctic Sea Ice",
        icon: "🧊",
        status: "triggered",
        threshold: "1.0°C",
        currentState: "Rapidly declining",
        timeframe: "Decades",
        description: "Summer Arctic sea ice disappearing, creating feedback loops",
        consequences: ["Accelerated warming", "Weather disruption", "Sea level rise"],
        region: "Arctic",
        confidence: "High"
      },
      {
        id: 2,
        name: "Greenland Ice Sheet",
        icon: "❄️",
        status: "triggered", 
        threshold: "1.2°C",
        currentState: "Accelerating melt",
        timeframe: "Centuries", 
        description: "Complete loss would raise sea levels by 7 meters",
        consequences: ["7m sea level rise", "Gulf Stream disruption", "Global cooling"],
        region: "Greenland",
        confidence: "High"
      },
      {
        id: 3,
        name: "West Antarctic Ice Sheet",
        icon: "⛄",
        status: "triggered",
        threshold: "1.5°C",
        currentState: "Unstable collapse",
        timeframe: "Centuries",
        description: "Marine ice sheet instability causing irreversible collapse",
        consequences: ["3-4m sea level rise", "Coastal flooding", "Climate disruption"],
        region: "Antarctica",
        confidence: "Medium"
      },
      {
        id: 4,
        name: "Amazon Rainforest",
        icon: "🌳",
        status: "triggered",
        threshold: "3.5°C",
        currentState: "Severe dieback",
        timeframe: "Decades",
        description: "Dieback due to reduced rainfall and increased fires",
        consequences: ["Massive CO₂ release", "Biodiversity loss", "Regional drought"],
        region: "South America",
        confidence: "Medium"
      },
      {
        id: 5,
        name: "Permafrost Thaw",
        icon: "🧊",
        status: "triggered",
        threshold: "1.5°C",
        currentState: "Accelerating thaw",
        timeframe: "Decades",
        description: "Releasing methane and CO₂ from frozen organic matter",
        consequences: ["Methane emissions", "CO₂ release", "Infrastructure damage"],
        region: "Arctic",
        confidence: "High"
      },
      {
        id: 6,
        name: "Atlantic Circulation (AMOC)",
        icon: "🌊",
        status: "at-risk",
        threshold: "1.8°C",
        currentState: "Weakening",
        timeframe: "Decades",
        description: "Gulf Stream system slowing down dramatically",
        consequences: ["European cooling", "Sea level changes", "Weather disruption"],
        region: "North Atlantic",
        confidence: "Medium"
      },
      {
        id: 7,
        name: "Coral Reef Die-offs",
        icon: "🪸",
        status: "at-risk",
        threshold: "1.5°C",
        currentState: "Mass bleaching",
        timeframe: "Decades",
        description: "Widespread coral bleaching and ecosystem collapse",
        consequences: ["Marine biodiversity loss", "Fisheries collapse", "Tourism impacts"],
        region: "Tropical Oceans",
        confidence: "High"
      },
      {
        id: 8,
        name: "Boreal Forest Shifts",
        icon: "🌲",
        status: "at-risk",
        threshold: "2.0°C",
        currentState: "Stress increasing",
        timeframe: "Decades",
        description: "Northern forests shifting to grasslands",
        consequences: ["Carbon release", "Biodiversity loss", "Fire increase"],
        region: "Boreal Regions",
        confidence: "Medium"
      },
      {
        id: 9,
        name: "Mountain Glaciers",
        icon: "🏔️",
        status: "at-risk",
        threshold: "2.0°C",
        currentState: "Retreating",
        timeframe: "Decades",
        description: "Complete loss of most mountain glaciers worldwide",
        consequences: ["Water security threats", "Sea level contribution", "Ecosystem loss"],
        region: "Mountain Regions",
        confidence: "High"
      },
      {
        id: 10,
        name: "Sahel Vegetation",
        icon: "🌾",
        status: "at-risk",
        threshold: "2.5°C",
        currentState: "Degrading",
        timeframe: "Decades",
        description: "Transition to desert conditions",
        consequences: ["Desertification", "Food insecurity", "Migration"],
        region: "Africa",
        confidence: "Low"
      },
      {
        id: 11,
        name: "Indian Monsoon",
        icon: "🌧️",
        status: "at-risk",
        threshold: "3.0°C",
        currentState: "Changing patterns",
        timeframe: "Decades",
        description: "Monsoon system becoming more chaotic",
        consequences: ["Extreme weather", "Agricultural disruption", "Water stress"],
        region: "South Asia",
        confidence: "Low"
      },
      {
        id: 12,
        name: "East Antarctic Ice Sheet",
        icon: "🧊",
        status: "safe",
        threshold: "3.0°C",
        currentState: "Stable",
        timeframe: "Millennia",
        description: "Largest ice sheet, very slow to respond",
        consequences: ["50m+ sea level rise", "Global climate shift"],
        region: "Antarctica",
        confidence: "Low"
      },
      {
        id: 13,
        name: "Tibetan Plateau",
        icon: "🏔️",
        status: "safe",
        threshold: "3.5°C",
        currentState: "Warming",
        timeframe: "Centuries",
        description: "Third pole ice and permafrost changes",
        consequences: ["Water security", "Regional climate change"],
        region: "Asia",
        confidence: "Low"
      },
      {
        id: 14,
        name: "Tundra Vegetation",
        icon: "🌿",
        status: "safe",
        threshold: "4.0°C",
        currentState: "Changing",
        timeframe: "Decades",
        description: "Tundra converting to forest",
        consequences: ["Albedo changes", "Carbon cycling shifts"],
        region: "Arctic",
        confidence: "Medium"
      },
      {
        id: 15,
        name: "Marine Ice Cliffs",
        icon: "🧊",
        status: "safe",
        threshold: "4.0°C",
        currentState: "Stable",
        timeframe: "Centuries",
        description: "Antarctic ice cliff instability",
        consequences: ["Rapid ice loss", "Extreme sea level rise"],
        region: "Antarctica",
        confidence: "Low"
      },
      {
        id: 16,
        name: "Stratocumulus Clouds",
        icon: "☁️",
        status: "safe",
        threshold: "4.0°C+",
        currentState: "Stable",
        timeframe: "Unknown",
        description: "Marine cloud cover disruption",
        consequences: ["Rapid warming", "Climate acceleration"],
        region: "Oceans",
        confidence: "Low"
      }
    ],

    cascadeEffects: [
      {
        title: "Temperature Amplification",
        description: "Each tipping point can accelerate warming by 0.1-0.5°C",
        impact: "Reduces carbon budget by 15-25%"
      },
      {
        title: "Domino Effects", 
        description: "One tipping point can trigger others in cascade",
        impact: "Hothouse Earth scenario becomes likely"
      },
      {
        title: "Irreversibility",
        description: "Changes persist for decades to millennia",
        impact: "Future generations locked into consequences"
      }
    ],

    timelineRisk: {
      "1.5°C": { triggered: 5, atRisk: 3, safe: 8, year: "~2030" },
      "2.0°C": { triggered: 8, atRisk: 4, safe: 4, year: "~2050" },
      "3.0°C": { triggered: 12, atRisk: 3, safe: 1, year: "~2100" },
      "4.0°C+": { triggered: 15, atRisk: 1, safe: 0, year: ">2100" }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'triggered': return 'red';
      case 'at-risk': return 'orange'; 
      case 'safe': return 'green';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'triggered': return <AlertTriangle className="w-4 h-4" />;
      case 'at-risk': return <Clock className="w-4 h-4" />;
      case 'safe': return <Target className="w-4 h-4" />;
      default: return null;
    }
  };

  const TippingPointCard = ({ point }) => {
    const color = getStatusColor(point.status);
    
    return (
      <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
        isDarkMode 
          ? `bg-${color}-900/20 border-${color}-500/30 hover:bg-${color}-900/30` 
          : `bg-${color}-50/80 border-${color}-200/50 hover:bg-${color}-100/80`
      }`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{point.icon}</span>
            <h4 className="font-semibold text-sm">{point.name}</h4>
          </div>
          <div className={`flex items-center space-x-1 text-${color}-400`}>
            {getStatusIcon(point.status)}
            <span className="text-xs font-medium capitalize">{point.status}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="opacity-70">Threshold:</span>
            <span className="font-medium">{point.threshold}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Timeframe:</span>
            <span className="font-medium">{point.timeframe}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Region:</span>
            <span className="font-medium">{point.region}</span>
          </div>
        </div>
        
        <p className="text-xs opacity-80 mt-2 leading-relaxed">{point.description}</p>
        
        <div className="mt-3">
          <h5 className="text-xs font-semibold mb-1 opacity-90">Key Consequences:</h5>
          <div className="space-y-1">
            {point.consequences.slice(0, 2).map((consequence, index) => (
              <div key={index} className="flex items-center text-xs">
                <span className={`text-${color}-400 mr-1`}>•</span>
                <span className="opacity-80">{consequence}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const StatusOverview = () => (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <div className={`p-4 rounded-xl text-center ${
        isDarkMode ? 'bg-red-900/20 border border-red-500/30' : 'bg-red-50/80 border border-red-200/50'
      }`}>
        <div className="text-3xl font-bold text-red-400">{tippingPointsData.triggered}</div>
        <div className="text-sm opacity-80">Already Triggered</div>
        <div className="text-xs opacity-60 mt-1">Critical systems crossing thresholds</div>
      </div>
      
      <div className={`p-4 rounded-xl text-center ${
        isDarkMode ? 'bg-orange-900/20 border border-orange-500/30' : 'bg-orange-50/80 border border-orange-200/50'
      }`}>
        <div className="text-3xl font-bold text-orange-400">{tippingPointsData.atRisk}</div>
        <div className="text-sm opacity-80">At High Risk</div>
        <div className="text-xs opacity-60 mt-1">Approaching danger thresholds</div>
      </div>
      
      <div className={`p-4 rounded-xl text-center ${
        isDarkMode ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50/80 border border-green-200/50'
      }`}>
        <div className="text-3xl font-bold text-green-400">{tippingPointsData.safe}</div>
        <div className="text-sm opacity-80">Still Safe</div>
        <div className="text-xs opacity-60 mt-1">Beyond current warming levels</div>
      </div>
    </div>
  );

  const RiskTimeline = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <ThermometerSun className="w-5 h-5 mr-2" />
        Risk Timeline by Warming Level
      </h3>
      
      {Object.entries(tippingPointsData.timelineRisk).map(([temp, data]) => {
        const totalTriggered = data.triggered;
        const percentage = (totalTriggered / 16) * 100;
        
        return (
          <div key={temp} className={`p-4 rounded-lg border ${
            isDarkMode ? 'bg-gray-800/50 border-gray-600/30' : 'bg-gray-50/80 border-gray-200/50'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-lg">{temp}</span>
                <span className="text-sm opacity-70">warming ({data.year})</span>
              </div>
              <span className={`text-sm font-medium ${
                percentage > 75 ? 'text-red-400' : percentage > 50 ? 'text-orange-400' : 'text-yellow-400'
              }`}>
                {totalTriggered}/16 triggered
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  percentage > 75 ? 'bg-red-400' : percentage > 50 ? 'bg-orange-400' : 'bg-yellow-400'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs mt-2 opacity-70">
              <span>{data.triggered} triggered</span>
              <span>{data.atRisk} at risk</span>
              <span>{data.safe} safe</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className={`max-w-7xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700/50 text-white' 
          : 'bg-gradient-to-br from-white/95 to-gray-50/95 border-gray-200/50 text-gray-800'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">⚡</span>
            <div>
              <h2 className="text-2xl font-bold">Climate Tipping Points</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-semibold text-red-400">
                  {tippingPointsData.triggered} of {tippingPointsData.total}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Critical
                </span>
                <span className="text-sm opacity-70">• {tippingPointsData.currentWarming} current warming</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Explanation */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50/80 border-blue-200/50'
          }`}>
            <div className="flex items-start space-x-2">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">What are Climate Tipping Points?</h3>
                <p className="text-sm leading-relaxed">
                  Climate tipping points are critical thresholds where small changes in global temperature can push Earth's climate system 
                  into irreversible changes. Once crossed, these systems can't return to their previous state for decades, centuries, or even millennia. 
                  Currently, {tippingPointsData.triggered} out of {tippingPointsData.total} major tipping points have been triggered.
                </p>
              </div>
            </div>
          </div>

          {/* Status Overview */}
          <StatusOverview />

          {/* Risk Timeline */}
          <RiskTimeline />

          {/* Cascade Effects */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-purple-900/20 border-purple-500/30' : 'bg-purple-50/80 border-purple-200/50'
          }`}>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Cascade Effects
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {tippingPointsData.cascadeEffects.map((effect, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold text-purple-400">{effect.title}</h4>
                  <p className="text-sm opacity-80">{effect.description}</p>
                  <div className="text-xs font-medium text-purple-300">{effect.impact}</div>
                </div>
              ))}
            </div>
          </div>

          {/* All Tipping Points Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              All 16 Climate Tipping Points
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tippingPointsData.tippingPoints.map((point) => (
                <TippingPointCard key={point.id} point={point} />
              ))}
            </div>
          </div>

          {/* Urgency Message */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50/80 border-red-200/50'
          }`}>
            <h3 className="text-lg font-semibold mb-2 text-red-400 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              The Urgency of Now
            </h3>
            <p className="text-sm leading-relaxed">
              With {tippingPointsData.triggered} tipping points already triggered and {tippingPointsData.atRisk} more at high risk, 
              we're in a race against time. Every fraction of a degree matters. Staying below 1.5°C warming could prevent 
              triggering additional cascading tipping points that would make climate chaos unstoppable.
            </p>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-gray-200/20">
            <div className="flex justify-center">
              <button
                onClick={() => window.open('https://www.un.org/en/actnow', '_blank')}
                className={`px-8 py-3 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                🚨 Act Now to Prevent More Tipping Points
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TippingPointsModal;