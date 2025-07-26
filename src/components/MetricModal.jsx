import React from 'react';
import { X, TrendingUp, TrendingDown, Info, Target, Users, Globe, AlertTriangle } from 'lucide-react';

const MetricModal = ({ isOpen, onClose, metricType, currentValue, isDarkMode, shareToSocial }) => {
  if (!isOpen || !metricType) return null;

  const getMetricData = (type) => {
    const metrics = {
      co2: {
        title: "Atmospheric CO₂ Concentration",
        icon: "🌬️",
        currentValue: "430.2 ppm",
        status: "Critical",
        statusColor: "red",
        explanation: "Carbon dioxide concentration in Earth's atmosphere, measured in parts per million (ppm). This is the primary driver of human-caused climate change.",
        historicalContext: {
          preindustrial: "280 ppm (1800s)",
          current: "430.2 ppm (May 2025)",
          change: "+53.6% increase",
          rate: "+3.7 ppm/year"
        },
        keyFacts: [
          "Highest levels in 3+ million years",
          "First time above 430 ppm in human history",
          "2024 had largest annual increase on record",
          "Took 200 years to reach this level"
        ],
        impacts: [
          "Rising global temperatures",
          "Ocean acidification", 
          "Extreme weather events",
          "Sea level rise acceleration"
        ],
        actions: [
          "Switch to renewable energy",
          "Improve energy efficiency",
          "Support carbon capture technology",
          "Choose sustainable transportation"
        ],
        chart: {
          historical: [280, 315, 350, 380, 410, 430],
          years: ["1800", "1960", "1990", "2010", "2020", "2025"],
          projection: [430, 440, 450, 460],
          projectionYears: ["2025", "2030", "2035", "2040"]
        }
      },
      temp: {
        title: "Global Temperature Anomaly",
        icon: "🌡️",
        currentValue: "+1.47°C",
        status: "Critical",
        statusColor: "red",
        explanation: "How much warmer Earth is compared to pre-industrial average (1850-1900). Each degree of warming has massive global impacts.",
        historicalContext: {
          baseline: "1850-1900 average",
          current: "+1.47°C (2024)",
          parisTarget: "1.5°C limit",
          trajectory: "~2.4°C by 2100"
        },
        keyFacts: [
          "2024 was warmest year on record",
          "Last decade: 10 warmest years ever",
          "Warming rate: 0.18°C per decade",
          "Arctic warming 3x faster than global average"
        ],
        impacts: [
          "More frequent heatwaves",
          "Intense hurricanes and storms",
          "Drought and flooding",
          "Ecosystem disruption"
        ],
        actions: [
          "Reduce fossil fuel consumption",
          "Support clean energy transition",
          "Improve building efficiency",
          "Choose climate-friendly foods"
        ],
        chart: {
          historical: [0, 0.4, 0.8, 1.1, 1.47],
          years: ["1880", "1940", "1980", "2000", "2024"],
          targets: [1.5, 2.0],
          targetLabels: ["Paris 1.5°C", "Paris 2.0°C"]
        }
      },
      ice: {
        title: "Arctic Sea Ice Coverage",
        icon: "🧊",
        currentValue: "84.5%",
        status: "Critical",
        statusColor: "red",
        explanation: "Percentage of Arctic Ocean covered by sea ice. Critical for reflecting sunlight and regulating global climate.",
        historicalContext: {
          baseline: "1981-2010 average",
          current: "84.5% (2025 maximum)",
          record: "Lowest maximum in 47 years",
          decline: "-13% per decade"
        },
        keyFacts: [
          "2025 winter maximum was record low",
          "Summer minimums declining rapidly",
          "18 lowest minimums in last 18 years",
          "Could be ice-free summers by 2050"
        ],
        impacts: [
          "Accelerated Arctic warming",
          "Sea level rise contribution",
          "Weather pattern disruption",
          "Marine ecosystem collapse"
        ],
        actions: [
          "Reduce greenhouse gas emissions",
          "Support Arctic protection policies",
          "Choose sustainable seafood",
          "Advocate for climate action"
        ],
        chart: {
          historical: [95, 92, 89, 86, 84.5],
          years: ["2000", "2005", "2010", "2015", "2025"],
          seasonal: [85, 78, 72, 78, 85],
          months: ["Jan", "Apr", "Jul", "Oct", "Dec"]
        }
      },
      renewable: {
        title: "Clean Energy Generation",
        icon: "⚡",
        currentValue: "32.0%",
        status: "On Track",
        statusColor: "green",
        explanation: "Percentage of global electricity generated from renewable sources like solar, wind, hydro, and geothermal.",
        historicalContext: {
          baseline: "11% (2010)",
          current: "32% (2024)",
          growth: "+6% annually",
          target: "60% by 2030"
        },
        keyFacts: [
          "Solar & wind cheapest energy sources",
          "700 GW renewable capacity added in 2024",
          "Renewables met 90% of electricity growth",
          "Creating millions of green jobs"
        ],
        impacts: [
          "Reduced carbon emissions",
          "Improved air quality",
          "Energy independence",
          "Economic growth"
        ],
        actions: [
          "Install solar panels",
          "Choose renewable energy plans",
          "Support clean energy policies",
          "Invest in renewable companies"
        ],
        chart: {
          historical: [11, 15, 20, 26, 32],
          years: ["2010", "2015", "2018", "2021", "2024"],
          breakdown: [14, 8, 7, 3],
          sources: ["Hydro", "Wind", "Solar", "Other"]
        }
      },
      deforestation: {
        title: "Daily Forest Loss",
        icon: "🌳",
        currentValue: "82,000 hectares",
        status: "Critical",
        statusColor: "red",
        explanation: "Hectares of forest lost daily worldwide. Forests are crucial for carbon storage, biodiversity, and climate regulation.",
        historicalContext: {
          current: "82,000 hectares/day (2024)",
          annual: "30 million hectares/year",
          comparison: "Size of Italy every year",
          driver: "70% from agriculture"
        },
        keyFacts: [
          "2024 had highest tree cover loss on record",
          "Amazon lost area size of Belgium",
          "Tropical forests hit hardest",
          "Fires drove record-breaking losses"
        ],
        impacts: [
          "Massive CO₂ emissions",
          "Biodiversity collapse",
          "Climate regulation loss",
          "Indigenous displacement"
        ],
        actions: [
          "Support forest conservation",
          "Choose sustainable products",
          "Reduce meat consumption",
          "Plant and protect trees"
        ],
        chart: {
          historical: [15, 18, 20, 25, 30],
          years: ["2015", "2018", "2020", "2022", "2024"],
          regions: [12, 8, 6, 4],
          regionNames: ["Amazon", "Congo", "Indonesia", "Other"]
        }
      },
      oceanPlastic: {
        title: "Ocean Plastic Pollution",
        icon: "🌊",
        currentValue: "11 million tons/year",
        status: "Critical",
        statusColor: "red",
        explanation: "Annual plastic waste entering oceans. Creates massive garbage patches and harms marine life through ingestion and entanglement.",
        historicalContext: {
          total: "75-199 million tons in oceans",
          annual: "11 million tons/year input",
          growth: "Increasing annually",
          source: "80% from land-based sources"
        },
        keyFacts: [
          "5.25 trillion pieces floating in oceans",
          "Great Pacific Garbage Patch size of Texas",
          "92% are microplastics",
          "By 2050: more plastic than fish by weight"
        ],
        impacts: [
          "Marine animal deaths",
          "Food chain contamination",
          "Microplastics in human bodies",
          "Tourism and fishing losses"
        ],
        actions: [
          "Reduce single-use plastics",
          "Support plastic alternatives",
          "Participate in beach cleanups",
          "Choose refillable products"
        ],
        chart: {
          historical: [8, 9, 10, 10.5, 11],
          years: ["2018", "2020", "2021", "2023", "2024"],
          sources: [70, 20, 10],
          sourceNames: ["Land", "Fishing", "Shipping"]
        }
      },
      seaLevel: {
        title: "Sea Level Rise Rate",
        icon: "🌊",
        currentValue: "4.3 mm/year",
        status: "Accelerating",
        statusColor: "red",
        explanation: "Annual rate of global mean sea level rise measured by satellite altimetry. Threatens coastal communities worldwide.",
        historicalContext: {
          historical: "1.4 mm/year (20th century)",
          current: "4.3 mm/year (2024)",
          acceleration: "Rate doubled since 1993",
          total: "111 mm rise since 1993"
        },
        keyFacts: [
          "Fastest rate in 3,000+ years",
          "Will rise 169mm more by 2050",
          "1 billion people at risk",
          "Thermal expansion + ice melt"
        ],
        impacts: [
          "Coastal flooding",
          "Saltwater intrusion",
          "Island nation threats",
          "Infrastructure damage"
        ],
        actions: [
          "Reduce emissions",
          "Support coastal protection",
          "Climate adaptation planning",
          "Sustainable coastal development"
        ],
        chart: {
          historical: [1.4, 2.1, 3.3, 4.3],
          years: ["1900", "1993", "2010", "2024"],
          components: [40, 35, 25],
          componentNames: ["Thermal", "Ice Sheets", "Glaciers"]
        }
      },
      biodiversity: {
        title: "Wildlife Population Index",
        icon: "🦋",
        currentValue: "27% remaining",
        status: "Critical Decline", 
        statusColor: "red",
        explanation: "Percentage of wildlife populations remaining since 1970. Represents average change across 34,000+ monitored vertebrate populations.",
        historicalContext: {
          baseline: "100% (1970)",
          current: "27% remaining (2024)",
          decline: "73% average decline",
          rate: "68% decline in 50 years"
        },
        keyFacts: [
          "Fastest mass extinction in 65 million years",
          "Freshwater species hit hardest (-84%)",
          "Latin America worst affected (-94%)",
          "Agriculture main driver (70%)"
        ],
        impacts: [
          "Ecosystem collapse",
          "Food security threats",
          "Disease emergence",
          "Economic losses"
        ],
        actions: [
          "Protect natural habitats",
          "Support conservation efforts",
          "Choose sustainable products",
          "Reduce environmental footprint"
        ],
        chart: {
          historical: [100, 85, 68, 45, 27],
          years: ["1970", "1985", "2000", "2015", "2024"],
          regions: [6, 18, 35, 41],
          regionNames: ["Europe", "N.America", "Asia", "L.America"]
        }
      }
    };
    return metrics[type] || {};
  };

  const metric = getMetricData(metricType);

  const MiniChart = ({ data, labels, type = "line" }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className={`w-full h-24 relative rounded-lg p-2 overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-800/80 to-gray-700/80' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
      }`}>
        <svg className="w-full h-full" viewBox="0 0 200 80">
          {type === "line" && (
            <polyline
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              points={data.map((value, index) => 
                `${(index / (data.length - 1)) * 180 + 10},${70 - ((value - min) / range) * 50}`
              ).join(' ')}
            />
          )}
          {type === "bar" && data.map((value, index) => (
            <rect
              key={index}
              x={index * (180 / data.length) + 10}
              y={70 - ((value - min) / range) * 50}
              width={180 / data.length - 2}
              height={((value - min) / range) * 50}
              fill="url(#barGradient)"
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <div className={`absolute bottom-0 left-0 right-0 flex justify-between text-xs px-2 ${
          isDarkMode ? 'text-gray-300 opacity-80' : 'text-gray-600 opacity-60'
        }`}>
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700/50 text-white' 
          : 'bg-gradient-to-br from-white/95 to-gray-50/95 border-gray-200/50 text-gray-800'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{metric.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{metric.title}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-lg font-semibold text-${metric.statusColor}-400`}>
                  {metric.currentValue}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  metric.statusColor === 'red' ? 'bg-red-100 text-red-800' :
                  metric.statusColor === 'green' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {metric.status}
                </span>
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
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">{metric.explanation}</p>
            </div>
          </div>

          {/* Historical Context & Chart */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Historical Context
              </h3>
              <div className="space-y-2">
                {Object.entries(metric.historicalContext).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize opacity-80">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Trend Analysis</h3>
              <MiniChart 
                data={metric.chart.historical} 
                labels={metric.chart.years}
                type="line"
              />
            </div>
          </div>

          {/* Key Facts & Impacts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Key Facts
              </h3>
              <ul className="space-y-2">
                {metric.keyFacts.map((fact, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Global Impacts
              </h3>
              <ul className="space-y-2">
                {metric.impacts.map((impact, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-red-400 mt-1">•</span>
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-green-900/20 border-green-500/30' : 'bg-green-50/80 border-green-200/50'
          }`}>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              What You Can Do
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {metric.actions.map((action, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Target className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Charts */}
          {metric.chart.breakdown && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Breakdown by Source</h3>
              <MiniChart 
                data={metric.chart.breakdown} 
                labels={metric.chart.sources || metric.chart.sourceNames}
                type="bar"
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-200/20">
            <div className="flex justify-center">
              <button
                onClick={() => window.open('https://www.un.org/en/actnow', '_blank')}
                className={`px-8 py-3 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                🎯 Take Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricModal;