import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

// Import all components
import Header from './components/Header';
import TimeDisplay from './components/TimeDisplay';
import EarthVisualization from './components/EarthVisualization';
import ClimateUrgencyMeter from './components/ClimateUrgencyMeter';
import EnvironmentalDataGrid from './components/EnvironmentalDataGrid';
import ClimateIntelligence from './components/ClimateIntelligence';
import EcoTip from './components/EcoTip';
import ActionCards from './components/ActionCards';
import ActionButtons from './components/ActionButtons';
import ShareModal from './components/ShareModal';
import MetricModal from './components/MetricModal';
import CarbonBudgetModal from './components/CarbonBudgetModal';
import TippingPointsModal from './components/TippingPointsModal';
import PersonalCarbonCalculator from './components/PersonalCarbonCalculator';

// Import AI Wisdom Service
import GeminiWisdomService from './services/GeminiWisdomService';

function App() {
  // State management
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [shareContext, setShareContext] = useState(null); // Track if sharing from metric or general
  const [showCarbonBudgetModal, setShowCarbonBudgetModal] = useState(false);
  const [showTippingPointsModal, setShowTippingPointsModal] = useState(false);

  // Updated environmental data - Latest July 2025 values
  const [environmentalData] = useState({
    co2: 430.2,                    // May 2025 peak (ppm) - latest NOAA Mauna Loa
    temperature: 1.47,             // 2024 global anomaly (°C above pre-industrial) - NASA GISS
    arcticIce: 84.5,              // 2025 record low maximum (%) - NSIDC Satellites
    renewableEnergy: 32.0,         // 2024 global electricity generation (%) - IEA Global Review
    deforestation: 82000,          // 2024 daily forest loss (hectares/day) - Global Forest Watch
    oceanPlastic: 11.0,            // Annual input to oceans (million tons/year) - latest studies
    seaLevel: 4.3,                 // Current annual rise rate (mm/year) - NASA satellite altimetry
    biodiversity: 27,              // Remaining from 1970 baseline (% - inverted from 73% decline) - WWF Living Planet Index
    
    // Additional metrics for dashboard
    co2Change: 3.7,                // Annual CO₂ increase (ppm/year)
    renewableGrowth: 6,            // Annual renewable growth (%)
    iceDeclineRate: 13,            // Arctic ice decline per decade (%)
    carbonBudget: 300,             // Remaining carbon budget for 1.5°C (Gt CO₂)
    tippingPoints: 5,              // Climate tipping points triggered out of 16
    
    // Status indicators
    parisAgreement: 'Behind',      // Paris Agreement progress
    renewableStatus: 'On track',   // Renewable energy progress  
    forestProtection: 'Slow',      // Forest protection progress
    
    // Key facts
    keyFacts: [
      '2024 warmest year on record',
      '2025 Arctic ice at lowest maximum in 47 years', 
      'Renewables supplied 32% of electricity in 2024',
      'Wildlife populations down 73% since 1970',
      'CO₂ first time above 430 ppm in May 2025'
    ],
    
    // Data sources
    dataSources: [
      'NOAA Mauna Loa Observatory',
      'NASA GISS Temperature Analysis', 
      'NSIDC Arctic Sea Ice Data',
      'IEA Global Energy Review 2025',
      'WWF Living Planet Index 2024'
    ],
    
    lastUpdate: new Date().toISOString(),
    dataMonth: 'July 2025'
  });

  // Eco tips - now powered by AI
  const [dailyTip, setDailyTip] = useState("🌍 Loading Earth wisdom...");
  const [isLoadingTip, setIsLoadingTip] = useState(false);

  // Effects for UI animations and AI-powered tips
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const hour = new Date().getHours();
    setIsDarkMode(hour < 7 || hour > 19);

    const pulseTimer = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
    }, 5000);

    // Initialize AI wisdom tips
    initializeAITips();

    // Set up tip rotation every 8 seconds
    const tipTimer = setInterval(() => {
      rotateToNextTip();
    }, 8000);

    // Expose debug functions globally for easy testing (development only)
    if (import.meta.env.DEV) {
      window.showAIStats = showAIStats;
      window.debugAI = debugAI;
      window.refreshAITips = handleRefreshAITips;
    }

    return () => {
      clearInterval(timer);
      clearInterval(pulseTimer);
      clearInterval(tipTimer);
    };
  }, []);

  // Initialize AI tips on mount and get first tip
  const initializeAITips = async () => {
    try {
      setIsLoadingTip(true);
      const firstTip = await GeminiWisdomService.getCurrentTip(environmentalData);
      setDailyTip(firstTip);
      
      // Log AI service stats for debugging
      const stats = GeminiWisdomService.getStats();
      console.log('🤖 AI Wisdom Service initialized:', stats);
      
    } catch (error) {
      console.error('Failed to initialize AI tips:', error);
      setDailyTip("🌱 Every small action creates ripples of positive change");
    } finally {
      setIsLoadingTip(false);
    }
  };

  // Rotate to next AI-generated tip
  const rotateToNextTip = async () => {
    try {
      const nextTip = await GeminiWisdomService.getCurrentTip(environmentalData);
      setDailyTip(nextTip);
    } catch (error) {
      console.error('Failed to get next AI tip:', error);
      // Keep current tip on error
    }
  };

  // Helper functions
  const getStatusColor = (value, type) => {
    switch(type) {
      case 'co2':
        return value > 425 ? 'text-red-400' : value > 415 ? 'text-yellow-400' : 'text-green-400';
      case 'temp':
        return value > 1.5 ? 'text-red-400' : value > 1.0 ? 'text-yellow-400' : 'text-green-400';
      case 'ice':
        return value < 85 ? 'text-red-400' : value < 90 ? 'text-yellow-400' : 'text-green-400';
      case 'renewable':
        return value > 30 ? 'text-green-400' : value > 20 ? 'text-yellow-400' : 'text-red-400';
      case 'biodiversity':
        return value < 30 ? 'text-red-400' : value < 50 ? 'text-yellow-400' : 'text-green-400';
      default:
        return 'text-blue-400';
    }
  };

  const getStatusIcon = (type, value) => {
    switch(type) {
      case 'co2':
        return value > 425 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
      case 'renewable':
        return value > 30 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  // Event handlers
  const handleShareImpact = () => {
    setShareContext('general');
    setShowShareModal(true);
  };

  const handleMetricShare = (metricType) => {
    setShareContext({ type: 'metric', metricType });
    setShowShareModal(true);
  };

  const handleClimateAction = () => window.open('https://www.un.org/en/actnow', '_blank');
  
  const handleMetricClick = (metricType) => {
    setSelectedMetric(metricType);
    setShowMetricModal(true);
  };

  const closeMetricModal = () => {
    setShowMetricModal(false);
    setSelectedMetric(null);
  };

  const handleCarbonBudgetClick = () => {
    setShowCarbonBudgetModal(true);
  };

  const closeCarbonBudgetModal = () => {
    setShowCarbonBudgetModal(false);
  };

  const handleTippingPointsClick = () => {
    setShowTippingPointsModal(true);
  };

  const closeTippingPointsModal = () => {
    setShowTippingPointsModal(false);
  };

  // AI Wisdom debug functions (useful for testing)
  const handleRefreshAITips = async () => {
    try {
      setIsLoadingTip(true);
      const refreshedTip = await GeminiWisdomService.forceRefresh(environmentalData);
      setDailyTip(refreshedTip);
      
      const stats = GeminiWisdomService.getStats();
      console.log('🔄 AI Tips refreshed:', stats);
    } catch (error) {
      console.error('Failed to refresh AI tips:', error);
    } finally {
      setIsLoadingTip(false);
    }
  };

  // Debug: Show AI service stats (only in development)
  const showAIStats = () => {
    const stats = GeminiWisdomService.getStats();
    console.table(stats);
    alert(`AI Wisdom Stats:\n\nMode: ${stats.mode}\nTotal Tips: ${stats.totalTips}\nCurrent Index: ${stats.currentIndex}\nLast Fetch: ${stats.lastFetchDate}\nUsing AI: ${stats.isUsingAI ? 'Yes' : 'No'}\nHas API Key: ${stats.hasApiKey ? 'Yes' : 'No'}\nEmergency Mode: ${stats.isUsingEmergencyMode ? 'Yes' : 'No'}\n\nSample Tips:\n${stats.tipsSample?.join('\n') || 'None'}`);
  };

  // Debug: Test AI API directly
  const debugAI = async () => {
    console.log('🔍 Testing AI API directly...');
    const result = await GeminiWisdomService.debugAPI(environmentalData);
    console.log('🔍 Debug result:', result);
    
    if (result.success) {
      alert(`AI Debug Success!\n\nGenerated ${result.tipCount} tips\n\nFirst tip: ${result.parsedTips[0] || 'None'}\n\nCheck console for full details.`);
    } else {
      alert(`AI Debug Failed:\n\n${result.error}\n\nCheck console for details.`);
    }
  };

  const shareToSocial = (platform, customMessage = null) => {
    let message;
    
    if (shareContext?.type === 'metric') {
      // Generate metric-specific message
      const metricType = shareContext.metricType;
      const metricData = {
        co2: { title: "CO₂ Level", value: `${environmentalData.co2} ppm`, status: "Critical" },
        temp: { title: "Global Temperature", value: `+${environmentalData.temperature}°C`, status: "Critical" },
        ice: { title: "Arctic Ice Coverage", value: `${environmentalData.arcticIce}%`, status: "Critical" },
        renewable: { title: "Clean Energy", value: `${environmentalData.renewableEnergy}%`, status: "On Track" },
        deforestation: { title: "Daily Forest Loss", value: `${(environmentalData.deforestation/1000).toFixed(0)}k hectares`, status: "Critical" },
        oceanPlastic: { title: "Ocean Plastic", value: `${environmentalData.oceanPlastic}M tons/year`, status: "Critical" },
        seaLevel: { title: "Sea Level Rise", value: `+${environmentalData.seaLevel} mm/year`, status: "Accelerating" },
        biodiversity: { title: "Wildlife Population", value: `${environmentalData.biodiversity}% remaining`, status: "Critical Decline" }
      };
      
      const metric = metricData[metricType];
      if (metric) {
        message = `🌍 ${metric.title}: ${metric.value} - Status: ${metric.status}. Every metric tells our planet's story. Track real-time environmental data with EarthClock! 🌱`;
      }
    }
    
    if (!message) {
      // Default general message
      message = customMessage || `🌍 EarthClock Update: CO₂ hits ${environmentalData.co2}ppm (first time >430!), Temperature +${environmentalData.temperature}°C, Arctic ice at record low ${environmentalData.arcticIce}%. But renewables growing ${environmentalData.renewableGrowth}%/year! Time to act! 🌱`;
    }
    
    const url = window.location.href;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent('EarthClock - Planet Health Dashboard')}&summary=${encodeURIComponent(message)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    let message;
    
    if (shareContext?.type === 'metric') {
      const metricType = shareContext.metricType;
      const metricData = {
        co2: { title: "Atmospheric CO₂ Concentration", value: `${environmentalData.co2} ppm`, description: "Carbon dioxide concentration in Earth's atmosphere, the primary driver of human-caused climate change." },
        temp: { title: "Global Temperature Anomaly", value: `+${environmentalData.temperature}°C`, description: "How much warmer Earth is compared to pre-industrial average (1850-1900)." },
        ice: { title: "Arctic Sea Ice Coverage", value: `${environmentalData.arcticIce}%`, description: "Percentage of Arctic Ocean covered by sea ice, critical for reflecting sunlight and regulating global climate." },
        renewable: { title: "Clean Energy Generation", value: `${environmentalData.renewableEnergy}%`, description: "Percentage of global electricity generated from renewable sources like solar, wind, hydro, and geothermal." },
        deforestation: { title: "Daily Forest Loss", value: `${(environmentalData.deforestation/1000).toFixed(0)}k hectares`, description: "Hectares of forest lost daily worldwide. Forests are crucial for carbon storage and biodiversity." },
        oceanPlastic: { title: "Ocean Plastic Pollution", value: `${environmentalData.oceanPlastic}M tons/year`, description: "Annual plastic waste entering oceans, creating massive garbage patches and harming marine life." },
        seaLevel: { title: "Sea Level Rise Rate", value: `+${environmentalData.seaLevel} mm/year`, description: "Annual rate of global mean sea level rise, threatening coastal communities worldwide." },
        biodiversity: { title: "Wildlife Population Index", value: `${environmentalData.biodiversity}% remaining`, description: "Percentage of wildlife populations remaining since 1970, representing average change across monitored species." }
      };
      
      const metric = metricData[metricType];
      if (metric) {
        message = `🌍 EarthClock Environmental Metric:\n\n📊 ${metric.title}\n• Current Value: ${metric.value}\n• Description: ${metric.description}\n\nData from ${environmentalData.dataMonth}\nEvery action counts for our planet! 🌱\n\nTrack real-time environmental data: ${window.location.href}`;
      }
    }
    
    if (!message) {
      message = `🌍 EarthClock Environmental Update (${environmentalData.dataMonth}):\n\n📊 PLANET VITAL SIGNS:\n• CO₂ Level: ${environmentalData.co2} ppm (+${environmentalData.co2Change}/year)\n• Global Temperature: +${environmentalData.temperature}°C above pre-industrial\n• Arctic Ice Coverage: ${environmentalData.arcticIce}% (-${environmentalData.iceDeclineRate}%/decade)\n• Clean Energy: ${environmentalData.renewableEnergy}% (+${environmentalData.renewableGrowth}%/year)\n• Ocean Plastic Input: ${environmentalData.oceanPlastic}M tons/year\n• Sea Level Rise: ${environmentalData.seaLevel} mm/year\n• Wildlife Populations: ${environmentalData.biodiversity}% remaining since 1970\n\n🎯 CLIMATE PROGRESS:\n• Paris Agreement: ${environmentalData.parisAgreement}\n• Renewable Energy: ${environmentalData.renewableStatus}\n• Forest Protection: ${environmentalData.forestProtection}\n• Carbon Budget Remaining: ~${environmentalData.carbonBudget} Gt CO₂\n• Climate Tipping Points: ${environmentalData.tippingPoints}/16 triggered\n\n🔑 KEY FACTS:\n${environmentalData.keyFacts.map(fact => `• ${fact}`).join('\n')}\n\nEvery action counts for our planet! 🌱\nData sources: NASA, NOAA, NSIDC, IEA, WWF`;
    }
    
    navigator.clipboard.writeText(message).then(() => {
      alert(shareContext?.type === 'metric' ? 'Metric data copied to clipboard!' : 'Environmental data copied to clipboard!');
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-2000 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
    }`}>
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 animate-pulse ${
              isDarkMode ? 'bg-cyan-400' : 'bg-emerald-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500' : 'bg-green-400'
        } animate-pulse`} style={{animationDuration: '4s'}} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-purple-500' : 'bg-blue-400'
        } animate-pulse`} style={{animationDuration: '6s', animationDelay: '2s'}} />
        <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl ${
          isDarkMode ? 'bg-cyan-500' : 'bg-emerald-400'
        } animate-pulse`} style={{animationDuration: '5s', animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-6 h-screen flex flex-col">
        {/* Header */}
        <Header 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          pulseAnimation={pulseAnimation}
        />

        {/* Data Update Status Banner */}
        <div className={`mb-4 px-4 py-2 rounded-lg backdrop-blur-lg border transition-all duration-300 ${
          isDarkMode ? 'bg-blue-900/20 border-blue-500/30 text-blue-300' : 'bg-blue-100/50 border-blue-200/50 text-blue-700'
        }`}>
          <div className="flex items-center justify-center space-x-2 text-sm">
            
            <span className="font-medium">
              📊 Environmental data from {environmentalData.dataMonth}
            </span>
            
            
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Left Column */}
          <div className="lg:col-span-1 flex flex-col space-y-4">
            <TimeDisplay 
              currentTime={currentTime}
              pulseAnimation={pulseAnimation}
              isDarkMode={isDarkMode}
            />
            <EarthVisualization isDarkMode={isDarkMode} />
            <ClimateUrgencyMeter isDarkMode={isDarkMode} />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-1">
            <EnvironmentalDataGrid 
              environmentalData={environmentalData}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              isDarkMode={isDarkMode}
              loading={false}
              onMetricClick={handleMetricClick}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <ClimateIntelligence 
              isDarkMode={isDarkMode}
              environmentalData={environmentalData}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 space-y-4">
          <EcoTip 
            dailyTip={dailyTip} 
            isDarkMode={isDarkMode} 
            isLoading={isLoadingTip}
          />
          <ActionCards 
            isDarkMode={isDarkMode} 
            onCarbonBudgetClick={handleCarbonBudgetClick}
            onTippingPointsClick={handleTippingPointsClick}
          />
          <ActionButtons 
            handleClimateAction={handleClimateAction}
            handleShareImpact={handleShareImpact}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      {/* Modals */}
      <ShareModal 
        showShareModal={showShareModal}
        setShowShareModal={(show) => {
          setShowShareModal(show);
          if (!show) setShareContext(null); // Reset share context when modal closes
        }}
        shareToSocial={shareToSocial}
        copyToClipboard={copyToClipboard}
        isDarkMode={isDarkMode}
        environmentalData={environmentalData}
      />
      
      <MetricModal
        isOpen={showMetricModal}
        onClose={closeMetricModal}
        metricType={selectedMetric}
        isDarkMode={isDarkMode}
        shareToSocial={handleMetricShare}
      />

      <CarbonBudgetModal
        isOpen={showCarbonBudgetModal}
        onClose={closeCarbonBudgetModal}
        isDarkMode={isDarkMode}
      />

      <TippingPointsModal
        isOpen={showTippingPointsModal}
        onClose={closeTippingPointsModal}
        isDarkMode={isDarkMode}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slide-in-from-bottom-8 {
          from { 
            transform: translateY(2rem);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes simplePulseRing {
          0% { 
            transform: scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: scale(1.2); 
            opacity: 0.3; 
          }
          100% { 
            transform: scale(1.4); 
            opacity: 0; 
          }
        }
        
        @keyframes softEarthPulse {
          0% { 
            transform: scale(1); 
            filter: brightness(1); 
          }
          50% { 
            transform: scale(1.03); 
            filter: brightness(1.1); 
          }
          100% { 
            transform: scale(1); 
            filter: brightness(1); 
          }
        }
        
        @keyframes slideIn {
          from { width: 0%; }
          to { width: var(--final-width, 100%); }
        }
        
        .simple-pulse-ring {
          animation: simplePulseRing 3s ease-out infinite;
        }
        
        .soft-earth-pulse {
          animation: softEarthPulse 4s ease-in-out infinite;
        }
        
        .animate-in {
          animation: slide-in-from-bottom-8 0.7s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;