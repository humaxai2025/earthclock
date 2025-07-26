import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';

export const useEnvironmentalData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const environmentalData = await apiService.getAllEnvironmentalData();
      
      setData(environmentalData);
      setLastUpdate(new Date());
      
      if (environmentalData.error) {
        setError(environmentalData.error);
      }
    } catch (err) {
      setError('Failed to fetch environmental data');
      console.error('Environmental data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    // Update every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refetch: fetchData
  };
};