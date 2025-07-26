class APIService {
  constructor() {
    this.baseURLs = {
      co2: import.meta.env.VITE_CO2_API_URL,
      temperature: import.meta.env.VITE_TEMPERATURE_API_URL,
      seaIce: import.meta.env.VITE_SEA_ICE_API_URL,
      renewable: import.meta.env.VITE_RENEWABLE_API_URL
    };
    
    this.cache = new Map();
    this.cacheDuration = parseInt(import.meta.env.VITE_CACHE_DURATION) || 600000; // 10 minutes
  }

  async fetchWithCache(url, cacheKey) {
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${cacheKey}:`, error);
      
      // Return cached data if available, even if expired
      if (cached) {
        console.warn(`Using expired cache for ${cacheKey}`);
        return cached.data;
      }
      
      throw error;
    }
  }

  async getCO2Data() {
    // Mock implementation - replace with actual NOAA API call
    return {
      current: 427.2,
      trend: 'increasing',
      lastUpdate: new Date().toISOString()
    };
  }

  async getTemperatureData() {
    // Mock implementation - replace with actual NASA GISS API call
    return {
      anomaly: 1.47,
      trend: 'increasing',
      lastUpdate: new Date().toISOString()
    };
  }

  async getSeaIceData() {
    // Mock implementation - replace with actual NSIDC API call
    return {
      extent: 87.4,
      trend: 'decreasing',
      lastUpdate: new Date().toISOString()
    };
  }

  async getRenewableData() {
    // Mock implementation - replace with actual IEA API call
    return {
      percentage: 33.1,
      trend: 'increasing',
      lastUpdate: new Date().toISOString()
    };
  }

  async getAllEnvironmentalData() {
    try {
      const [co2, temperature, seaIce, renewable] = await Promise.allSettled([
        this.getCO2Data(),
        this.getTemperatureData(),
        this.getSeaIceData(),
        this.getRenewableData()
      ]);

      return {
        co2: co2.status === 'fulfilled' ? co2.value.current : 427.2,
        temperature: temperature.status === 'fulfilled' ? temperature.value.anomaly : 1.47,
        arcticIce: seaIce.status === 'fulfilled' ? seaIce.value.extent : 87.4,
        renewableEnergy: renewable.status === 'fulfilled' ? renewable.value.percentage : 33.1,
        // Fallback data for other metrics
        deforestation: 18200,
        oceanPlastic: 11.5,
        seaLevel: 3.4,
        biodiversity: 68,
        lastUpdate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching environmental data:', error);
      
      // Return fallback data
      return {
        co2: 427.2,
        temperature: 1.47,
        arcticIce: 87.4,
        renewableEnergy: 33.1,
        deforestation: 18200,
        oceanPlastic: 11.5,
        seaLevel: 3.4,
        biodiversity: 68,
        lastUpdate: new Date().toISOString(),
        error: 'Using fallback data due to API error'
      };
    }
  }
}

export default new APIService();