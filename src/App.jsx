import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

// Import core components
import Header from './components/Header';
import TimeDisplay from './components/TimeDisplay';
import EarthVisualization from './components/EarthVisualization';
import ClimateUrgencyMeter from './components/ClimateUrgencyMeter';
import CarbonCountdown from './components/CarbonCountdown';
import EnvironmentalDataGrid from './components/EnvironmentalDataGrid';
import ClimateIntelligence from './components/ClimateIntelligence';
import EcoTip from './components/EcoTip';
import ActionCards from './components/ActionCards';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';

// Lazy load modals for better performance
const ShareModal = lazy(() => import('./components/ShareModal'));
const MetricModal = lazy(() => import('./components/MetricModal'));
const CarbonBudgetModal = lazy(() => import('./components/CarbonBudgetModal'));
const TippingPointsModal = lazy(() => import('./components/TippingPointsModal'));
const PersonalCarbonCalculator = lazy(() => import('./components/PersonalCarbonCalculator'));

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

  // Updated environmental data - Latest November 2025 values
  const [environmentalData] = useState({
    co2: 426.8, // November 2025 average (ppm) - NOAA Mauna Loa (declined from May 2025 peak of 430.5)
    temperature: 1.47, // 2024 global anomaly (°C above pre-industrial 1850-1900) - NASA GISS
    arcticIce: 83.2, // 2025 record low maximum in March (%) - NSIDC (14.33M km² = lowest on record)
    renewableEnergy: 33.5, // 2025 global electricity generation (%) - IEA Renewable Energy Market Update
    deforestation: 78500, // 2025 daily forest loss (hectares/day) - Global Forest Watch
    oceanPlastic: 11.2, // Annual input to oceans (million tons/year) - 2025 studies
    seaLevel: 4.4, // Current annual rise rate (mm/year) - NASA satellite altimetry
    biodiversity: 26, // Remaining from 1970 baseline (% - inverted from 74% decline) - WWF Living Planet Index

    // Additional metrics for dashboard
    co2Change: 3.75, // Annual CO₂ increase (ppm/year) - largest increase on record in 2024
    renewableGrowth: 8.2, // Annual renewable growth (%) - accelerating in 2025
    iceDeclineRate: 13.2, // Arctic ice decline per decade (%)
    carbonBudget: 280, // Remaining carbon budget for 1.5°C (Gt CO₂) - declining rapidly
    tippingPoints: 5, // Climate tipping points triggered out of 16

    // Status indicators
    parisAgreement: 'Behind', // Paris Agreement progress
    renewableStatus: 'Accelerating', // Renewable energy progress
    forestProtection: 'Improving', // Forest protection showing slight improvement

    // Key facts
    keyFacts: [
      '2024 warmest year on record (+1.47°C above pre-industrial)',
      'Arctic ice March 2025 maximum lowest in 47-year satellite record',
      'September 2025 minimum tied for 10th lowest on record',
      'CO₂ reached 430.5 ppm peak in May 2025',
      'Renewables growth accelerating to 8.2% annually',
      'Wildlife populations down 74% since 1970',
      '2024 saw largest CO₂ increase on record (3.75 ppm)',
    ],

    // Data sources
    dataSources: [
      'NOAA Mauna Loa Observatory',
      'NASA GISS Temperature Analysis',
      'NSIDC Arctic Sea Ice Index v4',
      'IEA Renewable Energy Market Update 2025',
      'WWF Living Planet Index 2024',
      'Global Forest Watch 2025',
    ],

    lastUpdate: new Date().toISOString(),
    dataMonth: 'November 2025',
  });

  // Effects for UI animations
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const hour = new Date().getHours();
    setIsDarkMode(hour < 7 || hour > 19);

    const pulseTimer = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  // Helper functions
  const getStatusColor = (value, type) => {
    switch (type) {
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
    switch (type) {
      case 'co2':
        return value > 425 ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        );
      case 'renewable':
        return value > 30 ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        );
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

  const shareToSocial = (platform, customMessage = null) => {
    let message;

    if (shareContext?.type === 'metric') {
      // Generate metric-specific message
      const metricType = shareContext.metricType;
      const metricData = {
        co2: { title: 'CO₂ Level', value: `${environmentalData.co2} ppm`, status: 'Critical' },
        temp: {
          title: 'Global Temperature',
          value: `+${environmentalData.temperature}°C`,
          status: 'Critical',
        },
        ice: {
          title: 'Arctic Ice Coverage',
          value: `${environmentalData.arcticIce}%`,
          status: 'Critical',
        },
        renewable: {
          title: 'Clean Energy',
          value: `${environmentalData.renewableEnergy}%`,
          status: 'On Track',
        },
        deforestation: {
          title: 'Daily Forest Loss',
          value: `${(environmentalData.deforestation / 1000).toFixed(0)}k hectares`,
          status: 'Critical',
        },
        oceanPlastic: {
          title: 'Ocean Plastic',
          value: `${environmentalData.oceanPlastic}M tons/year`,
          status: 'Critical',
        },
        seaLevel: {
          title: 'Sea Level Rise',
          value: `+${environmentalData.seaLevel} mm/year`,
          status: 'Accelerating',
        },
        biodiversity: {
          title: 'Wildlife Population',
          value: `${environmentalData.biodiversity}% remaining`,
          status: 'Critical Decline',
        },
      };

      const metric = metricData[metricType];
      if (metric) {
        message = `🌍 ${metric.title}: ${metric.value} - Status: ${metric.status}. Every metric tells our planet's story. Track real-time environmental data with EarthClock! 🌱`;
      }
    }

    if (!message) {
      // Default general message
      message =
        customMessage ||
        `🌍 EarthClock Update: CO₂ hits ${environmentalData.co2}ppm (first time >430!), Temperature +${environmentalData.temperature}°C, Arctic ice at record low ${environmentalData.arcticIce}%. But renewables growing ${environmentalData.renewableGrowth}%/year! Time to act! 🌱`;
    }

    const url = window.location.href;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent('EarthClock - Planet Health Dashboard')}&summary=${encodeURIComponent(message)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`,
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    let message;

    if (shareContext?.type === 'metric') {
      const metricType = shareContext.metricType;
      const metricData = {
        co2: {
          title: 'Atmospheric CO₂ Concentration',
          value: `${environmentalData.co2} ppm`,
          description:
            "Carbon dioxide concentration in Earth's atmosphere, the primary driver of human-caused climate change.",
        },
        temp: {
          title: 'Global Temperature Anomaly',
          value: `+${environmentalData.temperature}°C`,
          description: 'How much warmer Earth is compared to pre-industrial average (1850-1900).',
        },
        ice: {
          title: 'Arctic Sea Ice Coverage',
          value: `${environmentalData.arcticIce}%`,
          description:
            'Percentage of Arctic Ocean covered by sea ice, critical for reflecting sunlight and regulating global climate.',
        },
        renewable: {
          title: 'Clean Energy Generation',
          value: `${environmentalData.renewableEnergy}%`,
          description:
            'Percentage of global electricity generated from renewable sources like solar, wind, hydro, and geothermal.',
        },
        deforestation: {
          title: 'Daily Forest Loss',
          value: `${(environmentalData.deforestation / 1000).toFixed(0)}k hectares`,
          description:
            'Hectares of forest lost daily worldwide. Forests are crucial for carbon storage and biodiversity.',
        },
        oceanPlastic: {
          title: 'Ocean Plastic Pollution',
          value: `${environmentalData.oceanPlastic}M tons/year`,
          description:
            'Annual plastic waste entering oceans, creating massive garbage patches and harming marine life.',
        },
        seaLevel: {
          title: 'Sea Level Rise Rate',
          value: `+${environmentalData.seaLevel} mm/year`,
          description:
            'Annual rate of global mean sea level rise, threatening coastal communities worldwide.',
        },
        biodiversity: {
          title: 'Wildlife Population Index',
          value: `${environmentalData.biodiversity}% remaining`,
          description:
            'Percentage of wildlife populations remaining since 1970, representing average change across monitored species.',
        },
      };

      const metric = metricData[metricType];
      if (metric) {
        message = `🌍 EarthClock Environmental Metric:\n\n📊 ${metric.title}\n• Current Value: ${metric.value}\n• Description: ${metric.description}\n\nData from ${environmentalData.dataMonth}\nEvery action counts for our planet! 🌱\n\nTrack real-time environmental data: ${window.location.href}`;
      }
    }

    if (!message) {
      message = `🌍 EarthClock Environmental Update (${environmentalData.dataMonth}):\n\n📊 PLANET VITAL SIGNS:\n• CO₂ Level: ${environmentalData.co2} ppm (+${environmentalData.co2Change}/year)\n• Global Temperature: +${environmentalData.temperature}°C above pre-industrial\n• Arctic Ice Coverage: ${environmentalData.arcticIce}% (-${environmentalData.iceDeclineRate}%/decade)\n• Clean Energy: ${environmentalData.renewableEnergy}% (+${environmentalData.renewableGrowth}%/year)\n• Ocean Plastic Input: ${environmentalData.oceanPlastic}M tons/year\n• Sea Level Rise: ${environmentalData.seaLevel} mm/year\n• Wildlife Populations: ${environmentalData.biodiversity}% remaining since 1970\n\n🎯 CLIMATE PROGRESS:\n• Paris Agreement: ${environmentalData.parisAgreement}\n• Renewable Energy: ${environmentalData.renewableStatus}\n• Forest Protection: ${environmentalData.forestProtection}\n• Carbon Budget Remaining: ~${environmentalData.carbonBudget} Gt CO₂\n• Climate Tipping Points: ${environmentalData.tippingPoints}/16 triggered\n\n🔑 KEY FACTS:\n${environmentalData.keyFacts.map((fact) => `• ${fact}`).join('\n')}\n\nEvery action counts for our planet! 🌱\nData sources: NASA, NOAA, NSIDC, IEA, WWF`;
    }

    navigator.clipboard.writeText(message).then(() => {
      alert(
        shareContext?.type === 'metric'
          ? 'Metric data copied to clipboard!'
          : 'Environmental data copied to clipboard!'
      );
    });
  };

  return (
    <div
      className={`min-h-screen transition-all duration-2000 relative overflow-hidden ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
      }`}
    >
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
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl ${
            isDarkMode ? 'bg-blue-500' : 'bg-green-400'
          } animate-pulse`}
          style={{ animationDuration: '4s' }}
        />
        <div
          className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl ${
            isDarkMode ? 'bg-purple-500' : 'bg-blue-400'
          } animate-pulse`}
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        />
        <div
          className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl ${
            isDarkMode ? 'bg-cyan-500' : 'bg-emerald-400'
          } animate-pulse`}
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-6 min-h-screen flex flex-col max-w-7xl">
        {/* Header */}
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          pulseAnimation={pulseAnimation}
        />

        {/* Data Update Status Banner */}
        <div
          className={`mb-3 sm:mb-4 px-3 sm:px-4 py-2 rounded-lg backdrop-blur-lg border transition-all duration-300 ${
            isDarkMode
              ? 'bg-blue-900/20 border-blue-500/30 text-blue-300'
              : 'bg-blue-100/50 border-blue-200/50 text-blue-700'
          }`}
        >
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
            <span className="font-medium text-center">
              📊 Environmental data from {environmentalData.dataMonth}
            </span>
          </div>
        </div>

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 flex-1 min-h-0">
          {/* Left Column - Time & Earth */}
          <div className="md:col-span-1 xl:col-span-1 flex flex-col space-y-3 sm:space-y-4">
            <TimeDisplay
              currentTime={currentTime}
              pulseAnimation={pulseAnimation}
              isDarkMode={isDarkMode}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
              <EarthVisualization isDarkMode={isDarkMode} urgencyLevel="critical" />
              <ClimateUrgencyMeter isDarkMode={isDarkMode} />
            </div>
            <CarbonCountdown isDarkMode={isDarkMode} />
          </div>

          {/* Center Column - Environmental Data */}
          <div className="md:col-span-1 xl:col-span-1">
            <EnvironmentalDataGrid
              environmentalData={environmentalData}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              isDarkMode={isDarkMode}
              loading={false}
              onMetricClick={handleMetricClick}
            />
          </div>

          {/* Right Column - Climate Intelligence */}
          <div className="md:col-span-2 xl:col-span-1">
            <ClimateIntelligence isDarkMode={isDarkMode} environmentalData={environmentalData} />
          </div>
        </div>

        {/* Bottom Section - Responsive Layout */}
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <EcoTip isDarkMode={isDarkMode} />
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

        {/* Footer */}
        <Footer isDarkMode={isDarkMode} />
      </div>

      {/* Modals - Lazy loaded with Suspense */}
      <Suspense fallback={null}>
        {showShareModal && (
          <ShareModal
            showShareModal={showShareModal}
            setShowShareModal={(show) => {
              setShowShareModal(show);
              if (!show) setShareContext(null);
            }}
            shareToSocial={shareToSocial}
            copyToClipboard={copyToClipboard}
            isDarkMode={isDarkMode}
            environmentalData={environmentalData}
          />
        )}

        {showMetricModal && (
          <MetricModal
            isOpen={showMetricModal}
            onClose={closeMetricModal}
            metricType={selectedMetric}
            isDarkMode={isDarkMode}
            shareToSocial={handleMetricShare}
          />
        )}

        {showCarbonBudgetModal && (
          <CarbonBudgetModal
            isOpen={showCarbonBudgetModal}
            onClose={closeCarbonBudgetModal}
            isDarkMode={isDarkMode}
          />
        )}

        {showTippingPointsModal && (
          <TippingPointsModal
            isOpen={showTippingPointsModal}
            onClose={closeTippingPointsModal}
            isDarkMode={isDarkMode}
          />
        )}
      </Suspense>

      {/* Vercel Analytics */}
      <Analytics />

      {/* CSS Animations - TODO: Move to animations.css */}
      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
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
          from {
            width: 0%;
          }
          to {
            width: var(--final-width, 100%);
          }
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
