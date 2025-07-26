import React from 'react';
import { X, Clock, TrendingDown, AlertTriangle, Target, Globe, Zap, Calendar } from 'lucide-react';

const CarbonBudgetModal = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  const carbonBudgetData = {
    remaining: "~300 Gt CO₂",
    timeLeft: "~6 years",
    currentEmissions: "42 Gt CO₂/year",
    parisTarget: "1.5°C limit",
    budgetUsed: "83%",
    startingBudget: "~1,800 Gt CO₂",
    usedSince2000: "~1,500 Gt CO₂",
    yearlyBudget: "22.8 Gt CO₂",
    reductionNeeded: "7.6% annually",
    
    keyFacts: [
      "Global carbon budget represents total CO₂ emissions consistent with limiting warming to 1.5°C",
      "At current emission rates, budget will be exhausted by 2030",
      "Budget assumes 50% probability of staying below 1.5°C",
      "Does not include non-CO₂ greenhouse gases like methane",
      "Updated based on latest IPCC Assessment Report 6"
    ],
    
    timeline: [
      { year: "2000", budget: 1800, used: 0, remaining: 1800 },
      { year: "2010", budget: 1800, used: 400, remaining: 1400 },
      { year: "2020", budget: 1800, used: 1200, remaining: 600 },
      { year: "2025", budget: 1800, used: 1500, remaining: 300 },
      { year: "2030", budget: 1800, used: 1800, remaining: 0 }
    ],
    
    scenarios: [
      {
        name: "Current Trajectory",
        description: "If emissions continue at current rate",
        budgetExhausted: "2030",
        likelihood: "Budget exceeded",
        color: "red"
      },
      {
        name: "Paris Pledges",
        description: "If all countries meet current NDCs",
        budgetExhausted: "2032",
        likelihood: "Still exceeds budget",
        color: "orange"
      },
      {
        name: "Required Path",
        description: "7.6% annual emission reductions",
        budgetExhausted: "Never",
        likelihood: "Stays within budget",
        color: "green"
      }
    ],
    
    sectors: [
      { name: "Energy", percentage: 73, emissions: "30.6 Gt CO₂" },
      { name: "Agriculture", percentage: 18, emissions: "7.6 Gt CO₂" },
      { name: "Industrial Processes", percentage: 5, emissions: "2.1 Gt CO₂" },
      { name: "Waste", percentage: 4, emissions: "1.7 Gt CO₂" }
    ],
    
    solutions: [
      {
        icon: "🌱",
        title: "Renewable Energy Transition",
        potential: "50% of required reductions",
        description: "Massive scale-up of solar, wind, and other clean energy"
      },
      {
        icon: "🏭",
        title: "Industrial Decarbonization",
        potential: "20% of required reductions", 
        description: "Clean hydrogen, electric furnaces, carbon capture"
      },
      {
        icon: "🚗",
        title: "Transport Electrification",
        potential: "15% of required reductions",
        description: "Electric vehicles, public transport, sustainable fuels"
      },
      {
        icon: "🌳",
        title: "Nature-Based Solutions",
        potential: "15% of required reductions",
        description: "Forest protection, reforestation, carbon sequestration"
      }
    ]
  };

  const BudgetChart = () => {
    const maxBudget = 1800;
    const currentUsed = 1500;
    const remaining = 300;
    
    return (
      <div className="w-full h-32 relative">
        <div className="flex items-end h-full space-x-2">
          {carbonBudgetData.timeline.map((point, index) => {
            const usedHeight = (point.used / maxBudget) * 100;
            const remainingHeight = (point.remaining / maxBudget) * 100;
            
            return (
              <div key={point.year} className="flex-1 flex flex-col items-center">
                <div className="w-full h-24 flex flex-col-reverse border rounded-t">
                  <div 
                    className="bg-red-400 transition-all duration-1000"
                    style={{ height: `${usedHeight}%` }}
                  />
                  <div 
                    className="bg-green-400 transition-all duration-1000"
                    style={{ height: `${remainingHeight}%` }}
                  />
                </div>
                <div className="text-xs mt-1 font-medium">{point.year}</div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-4 mt-3 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded mr-1" />
            <span>Remaining Budget</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded mr-1" />
            <span>Used Budget</span>
          </div>
        </div>
      </div>
    );
  };

  const ScenarioCard = ({ scenario }) => (
    <div className={`p-4 rounded-lg border ${
      isDarkMode 
        ? `bg-${scenario.color}-900/20 border-${scenario.color}-500/30` 
        : `bg-${scenario.color}-50/80 border-${scenario.color}-200/50`
    }`}>
      <h4 className={`font-semibold text-${scenario.color}-400 mb-2`}>
        {scenario.name}
      </h4>
      <p className="text-sm opacity-80 mb-2">{scenario.description}</p>
      <div className="text-xs">
        <div className="flex justify-between">
          <span>Budget Exhausted:</span>
          <span className="font-medium">{scenario.budgetExhausted}</span>
        </div>
        <div className={`text-${scenario.color}-400 font-medium mt-1`}>
          {scenario.likelihood}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className={`max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700/50 text-white' 
          : 'bg-gradient-to-br from-white/95 to-gray-50/95 border-gray-200/50 text-gray-800'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">⏰</span>
            <div>
              <h2 className="text-2xl font-bold">Global Carbon Budget</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-semibold text-red-400">
                  {carbonBudgetData.remaining}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Critical
                </span>
                <span className="text-sm opacity-70">• {carbonBudgetData.timeLeft} at current rate</span>
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
                <h3 className="font-semibold text-blue-400 mb-2">What is the Carbon Budget?</h3>
                <p className="text-sm leading-relaxed">
                  The global carbon budget represents the total amount of CO₂ that can be emitted while limiting global warming to 1.5°C above pre-industrial levels. 
                  At current emission rates of {carbonBudgetData.currentEmissions}, we have approximately {carbonBudgetData.timeLeft} before this budget is exhausted.
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl text-center ${
              isDarkMode ? 'bg-red-900/20 border border-red-500/30' : 'bg-red-50/80 border border-red-200/50'
            }`}>
              <div className="text-2xl font-bold text-red-400">{carbonBudgetData.budgetUsed}</div>
              <div className="text-sm opacity-80">Budget Used</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${
              isDarkMode ? 'bg-orange-900/20 border border-orange-500/30' : 'bg-orange-50/80 border border-orange-200/50'
            }`}>
              <div className="text-2xl font-bold text-orange-400">{carbonBudgetData.currentEmissions}</div>
              <div className="text-sm opacity-80">Annual Emissions</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${
              isDarkMode ? 'bg-yellow-900/20 border border-yellow-500/30' : 'bg-yellow-50/80 border border-yellow-200/50'
            }`}>
              <div className="text-2xl font-bold text-yellow-400">{carbonBudgetData.yearlyBudget}</div>
              <div className="text-sm opacity-80">Sustainable Rate</div>
            </div>
            <div className={`p-4 rounded-xl text-center ${
              isDarkMode ? 'bg-purple-900/20 border border-purple-500/30' : 'bg-purple-50/80 border border-purple-200/50'
            }`}>
              <div className="text-2xl font-bold text-purple-400">{carbonBudgetData.reductionNeeded}</div>
              <div className="text-sm opacity-80">Required Reduction</div>
            </div>
          </div>

          {/* Carbon Budget Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Carbon Budget Timeline (2000-2030)
            </h3>
            <BudgetChart />
          </div>

          {/* Scenarios */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2" />
              Emission Scenarios
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {carbonBudgetData.scenarios.map((scenario, index) => (
                <ScenarioCard key={index} scenario={scenario} />
              ))}
            </div>
          </div>

          {/* Key Facts */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-gray-900/20 border-gray-500/30' : 'bg-gray-50/80 border-gray-200/50'
          }`}>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Key Facts
            </h3>
            <ul className="space-y-2">
              {carbonBudgetData.keyFacts.map((fact, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emission Sources */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Global Emission Sources (2024)
              </h3>
              <div className="space-y-3">
                {carbonBudgetData.sectors.map((sector, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{sector.name}</span>
                      <span className="font-medium">{sector.emissions}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${sector.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Solution Pathways
              </h3>
              <div className="space-y-3">
                {carbonBudgetData.solutions.map((solution, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50/80 border border-green-200/50'
                  }`}>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{solution.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-sm">{solution.title}</h4>
                          <span className="text-xs text-green-400 font-medium">{solution.potential}</span>
                        </div>
                        <p className="text-xs opacity-80">{solution.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-gray-200/20">
            <div className="flex justify-center">
              <button
                onClick={() => window.open('https://www.un.org/en/actnow', '_blank')}
                className={`px-8 py-3 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                🎯 Take Climate Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonBudgetModal;