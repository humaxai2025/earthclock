import React from 'react';

const EarthVisualization = ({ isDarkMode, urgencyLevel = "critical" }) => {
  // Define color schemes based on urgency level
  const getEarthColors = (urgency, isDark) => {
    switch(urgency) {
      case 'safe':
        return {
          outerGlow: isDark ? 'from-blue-400/20 via-cyan-300/10' : 'from-emerald-400/20 via-blue-300/10',
          auroraRing1: 'rgba(34, 197, 94, 0.3), transparent, rgba(59, 130, 246, 0.3)',
          auroraRing2: 'rgba(168, 85, 247, 0.2), transparent, rgba(236, 72, 153, 0.2)',
          auroraRing3: 'rgba(34, 211, 238, 0.25)',
          mainEarth: isDark 
            ? 'radial-gradient(circle at 30% 30%, #60a5fa, #10b981, #0891b2, #065f46)'
            : 'radial-gradient(circle at 30% 30%, #34d399, #3b82f6, #0d9488, #047857)',
          orbitalRing: 'border-emerald-400/20',
          floatingParticles: isDark ? 'bg-cyan-300/60' : 'bg-emerald-400/60',
          shadow: '0 0 30px rgba(16, 185, 129, 0.4)'
        };
      case 'warning':
        return {
          outerGlow: isDark ? 'from-yellow-400/20 via-orange-300/10' : 'from-yellow-400/20 via-orange-300/10',
          auroraRing1: 'rgba(251, 191, 36, 0.3), transparent, rgba(249, 115, 22, 0.3)',
          auroraRing2: 'rgba(245, 158, 11, 0.2), transparent, rgba(251, 146, 60, 0.2)',
          auroraRing3: 'rgba(252, 211, 77, 0.25)',
          mainEarth: isDark 
            ? 'radial-gradient(circle at 30% 30%, #f59e0b, #ea580c, #dc2626, #7c2d12)'
            : 'radial-gradient(circle at 30% 30%, #fbbf24, #f97316, #dc2626, #92400e)',
          orbitalRing: 'border-yellow-400/20',
          floatingParticles: isDark ? 'bg-yellow-300/60' : 'bg-orange-400/60',
          shadow: '0 0 30px rgba(251, 191, 36, 0.4)'
        };
      case 'critical':
      default:
        return {
          outerGlow: isDark ? 'from-red-400/20 via-orange-300/10' : 'from-red-400/20 via-orange-300/10',
          auroraRing1: 'rgba(239, 68, 68, 0.3), transparent, rgba(249, 115, 22, 0.3)',
          auroraRing2: 'rgba(245, 101, 101, 0.2), transparent, rgba(251, 146, 60, 0.2)',
          auroraRing3: 'rgba(252, 165, 165, 0.25)',
          mainEarth: isDark 
            ? 'radial-gradient(circle at 30% 30%, #ef4444, #dc2626, #b91c1c, #7f1d1d)'
            : 'radial-gradient(circle at 30% 30%, #f87171, #ef4444, #dc2626, #991b1b)',
          orbitalRing: 'border-red-400/20',
          floatingParticles: isDark ? 'bg-red-300/60' : 'bg-red-400/60',
          shadow: '0 0 30px rgba(239, 68, 68, 0.4)'
        };
    }
  };

  const colors = getEarthColors(urgencyLevel, isDarkMode);

  return (
    <div className={`p-6 rounded-3xl backdrop-blur-xl shadow-2xl border transition-all duration-700 hover:scale-[1.02] group flex-1 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-white/5 to-white/10 border-white/20 text-white' 
        : 'bg-gradient-to-br from-white/70 to-white/90 border-white/50 text-gray-800'
    }`}>
      <div className="flex flex-col items-center justify-center h-full">
        {/* Enhanced Earth with Multiple Visual Effects */}
        <div className="relative w-40 h-40 group-hover:scale-110 transition-transform duration-500">
          
          {/* Outer Space Glow */}
          <div className={`absolute inset-0 rounded-full bg-gradient-radial ${colors.outerGlow} to-transparent animate-pulse`} 
               style={{transform: 'scale(1.8)', animationDuration: '4s'}} />
          
          {/* Aurora-like Atmospheric Effects */}
          <div className="absolute inset-0 rounded-full aurora-ring-1" style={{background: `conic-gradient(from 0deg, transparent, ${colors.auroraRing1}, transparent)`}} />
          <div className="absolute inset-1 rounded-full aurora-ring-2" style={{background: `conic-gradient(from 45deg, transparent, ${colors.auroraRing2}, transparent)`}} />
          <div className="absolute inset-2 rounded-full aurora-ring-3" style={{background: `conic-gradient(from 90deg, transparent, ${colors.auroraRing3}, transparent)`}} />
          
          {/* Subtle Orbital Ring */}
          <div className={`absolute inset-0 rounded-full border ${colors.orbitalRing} simple-pulse-ring`} />
          
          {/* Main Earth Sphere with Enhanced Gradients */}
          <div className={`absolute inset-6 rounded-full soft-earth-pulse earth-shadow`} style={{
            animation: 'spin 120s linear infinite',
            background: colors.mainEarth,
            boxShadow: `inset -8px -8px 20px rgba(0, 0, 0, 0.3), inset 8px 8px 20px rgba(255, 255, 255, 0.1), ${colors.shadow}`
          }}>
            
            {/* Ocean Reflections */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/40 via-transparent to-blue-500/30 ocean-shimmer" />
            
            {/* Realistic Continents */}
            <div className="absolute inset-1 rounded-full overflow-hidden">
              {/* North America */}
              <div className="absolute top-3 left-4 w-4 h-5 bg-green-600/90 continent-shape-1 shadow-lg" />
              
              {/* South America */}
              <div className="absolute top-8 left-5 w-2 h-6 bg-green-700/90 continent-shape-2 shadow-md" />
              
              {/* Africa */}
              <div className="absolute top-4 right-6 w-3 h-7 bg-yellow-600/80 continent-shape-3 shadow-md" />
              
              {/* Europe/Asia */}
              <div className="absolute top-2 right-4 w-6 h-4 bg-green-600/85 continent-shape-4 shadow-lg" />
              
              {/* Australia */}
              <div className="absolute bottom-4 right-3 w-3 h-2 bg-orange-600/80 continent-shape-5 shadow-sm" />
              
              {/* Ice Caps */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-white/90 rounded-full ice-cap-north" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-white/85 rounded-full ice-cap-south" />
            </div>
            
            {/* Atmospheric Layer */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/20 via-transparent to-cyan-300/15 atmosphere-glow" />
            
            {/* Day/Night Terminator Line */}
            <div className="absolute inset-0 rounded-full day-night-cycle" />
            
            {/* Surface Highlight */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white/30 surface-highlight" />
          </div>
          
          {/* Floating Particles Around Earth */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${colors.floatingParticles} floating-particle`}
                style={{
                  left: `${20 + Math.cos(i * Math.PI / 4) * 60 + 50}%`,
                  top: `${20 + Math.sin(i * Math.PI / 4) * 60 + 50}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.3}s`
                }}
              />
            ))}
          </div>
          
          {/* Subtle Energy Field */}
          <div className="absolute inset-0 rounded-full energy-field" />
        </div>
      </div>
      
      {/* Enhanced CSS for Earth Effects */}
      <style>{`
        .aurora-ring-1 {
          animation: spin 20s linear infinite;
        }
        
        .aurora-ring-2 {
          animation: spin 25s linear infinite reverse;
        }
        
        .aurora-ring-3 {
          animation: spin 30s linear infinite;
        }
        
        .earth-shadow {
          box-shadow: 
            inset -8px -8px 20px rgba(0, 0, 0, 0.3),
            inset 8px 8px 20px rgba(255, 255, 255, 0.1);
        }
        
        .ocean-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .continent-shape-1 {
          border-radius: 60% 40% 70% 30%;
          transform: rotate(15deg);
          animation: continentBreath 4s ease-in-out infinite;
        }
        
        .continent-shape-2 {
          border-radius: 30% 70% 40% 60%;
          transform: rotate(-10deg);
          animation: continentBreath 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .continent-shape-3 {
          border-radius: 40% 60% 50% 50%;
          transform: rotate(5deg);
          animation: continentBreath 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .continent-shape-4 {
          border-radius: 70% 30% 60% 40%;
          transform: rotate(-5deg);
          animation: continentBreath 4s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .continent-shape-5 {
          border-radius: 50% 50% 80% 20%;
          animation: continentBreath 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .ice-cap-north {
          animation: iceMelt 6s ease-in-out infinite;
        }
        
        .ice-cap-south {
          animation: iceMelt 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .atmosphere-glow {
          animation: atmosphereFlow 5s ease-in-out infinite;
        }
        
        .day-night-cycle {
          background: linear-gradient(45deg, transparent 50%, rgba(0, 0, 0, 0.3) 70%);
          animation: dayNight 8s ease-in-out infinite;
        }
        
        .surface-highlight {
          animation: surfaceGlint 3s ease-in-out infinite;
        }
        
        .floating-particle {
          animation: floatAround 4s ease-in-out infinite;
        }
        
        .energy-field {
          background: radial-gradient(circle, transparent 60%, rgba(16, 185, 129, 0.1) 80%, transparent 100%);
          animation: energyPulse 2s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; transform: translateX(0); }
          50% { opacity: 0.6; transform: translateX(2px); }
        }
        
        @keyframes continentBreath {
          0%, 100% { transform: scale(1) rotate(var(--rotation, 0deg)); }
          50% { transform: scale(1.05) rotate(var(--rotation, 0deg)); }
        }
        
        @keyframes iceMelt {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        
        @keyframes atmosphereFlow {
          0%, 100% { opacity: 0.2; }
          33% { opacity: 0.4; }
          66% { opacity: 0.3; }
        }
        
        @keyframes dayNight {
          0%, 100% { transform: rotate(0deg); opacity: 0.2; }
          50% { transform: rotate(180deg); opacity: 0.4; }
        }
        
        @keyframes surfaceGlint {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes floatAround {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(2px, -2px) scale(1.1); opacity: 0.8; }
          50% { transform: translate(-1px, -3px) scale(1); opacity: 1; }
          75% { transform: translate(-2px, 1px) scale(0.9); opacity: 0.7; }
        }
        
        @keyframes energyPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default EarthVisualization;