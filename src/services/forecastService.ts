
import { generateHistoricalData, generateForecastData } from '../lib/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get historical consumption data
export const getHistoricalConsumption = async (days: number = 30) => {
  // Simulate API call
  await delay(800);
  return generateHistoricalData(days);
};

// Get forecasted consumption data
export const getForecastConsumption = async (days: number = 7, params: any = {}) => {
  // Simulate API call with parameters
  await delay(1000);
  
  // Get historical data to ensure continuity
  const historicalData = await getHistoricalConsumption(3);
  
  // Generate forecast based on historical data
  return generateForecastData(days, historicalData);
};

// Get combined historical and forecast data
export const getCombinedConsumptionData = async (historicalDays: number = 30, forecastDays: number = 7) => {
  const historical = await getHistoricalConsumption(historicalDays);
  const forecast = await getForecastConsumption(forecastDays, { historicalData: historical });
  
  return {
    historical,
    forecast,
    combined: [...historical, ...forecast]
  };
};
