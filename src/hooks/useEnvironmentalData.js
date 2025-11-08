import { useQuery } from '@tanstack/react-query';
import apiService from '../services/apiService';

export const useEnvironmentalData = () => {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['environmentalData'],
    queryFn: async () => {
      const environmentalData = await apiService.getAllEnvironmentalData();
      return environmentalData;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 4 * 60 * 1000, // Data is fresh for 4 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    data,
    loading: isLoading,
    error: error?.message || null,
    lastUpdate: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
    refetch,
  };
};
