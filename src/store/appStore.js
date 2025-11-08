import { create } from 'zustand';

const useAppStore = create((set) => ({
  // UI state
  isDarkMode: false,
  pulseAnimation: false,
  currentTime: new Date(),

  // Modal state
  showShareModal: false,
  showMetricModal: false,
  showCarbonBudgetModal: false,
  showTippingPointsModal: false,
  selectedMetric: null,
  shareContext: null,

  // Actions
  setIsDarkMode: (mode) => set({ isDarkMode: mode }),
  setPulseAnimation: (pulse) => set({ pulseAnimation: pulse }),
  setCurrentTime: (time) => set({ currentTime: time }),

  // Modal actions
  setShowShareModal: (show) => set({ showShareModal: show }),
  setShowMetricModal: (show) => set({ showMetricModal: show }),
  setShowCarbonBudgetModal: (show) => set({ showCarbonBudgetModal: show }),
  setShowTippingPointsModal: (show) => set({ showTippingPointsModal: show }),
  setSelectedMetric: (metric) => set({ selectedMetric: metric }),
  setShareContext: (context) => set({ shareContext: context }),

  // Combined actions
  openMetricModal: (metricType) => set({ selectedMetric: metricType, showMetricModal: true }),
  closeMetricModal: () => set({ showMetricModal: false, selectedMetric: null }),

  openShareModal: (context) => set({ shareContext: context, showShareModal: true }),
  closeShareModal: () => set({ showShareModal: false, shareContext: null }),

  openCarbonBudgetModal: () => set({ showCarbonBudgetModal: true }),
  closeCarbonBudgetModal: () => set({ showCarbonBudgetModal: false }),

  openTippingPointsModal: () => set({ showTippingPointsModal: true }),
  closeTippingPointsModal: () => set({ showTippingPointsModal: false }),
}));

export default useAppStore;
