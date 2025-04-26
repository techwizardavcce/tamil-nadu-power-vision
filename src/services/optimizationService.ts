
import { generateOptimizationScenarios, generateEnergyMixData } from '../lib/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get optimization scenarios
export const getOptimizationScenarios = async () => {
  // Simulate API call
  await delay(1000);
  return generateOptimizationScenarios();
};

// Get energy mix data
export const getEnergyMixData = async () => {
  // Simulate API call
  await delay(800);
  return generateEnergyMixData();
};

// Run optimization with parameters
export const runOptimization = async (params: any = {}) => {
  // Simulate API call with longer processing time
  await delay(2000);
  
  // Return scenarios with slight modifications based on params
  const baseScenarios = generateOptimizationScenarios();
  
  // Adjust scenarios based on parameters
  if (params.maxRenewable) {
    baseScenarios[1].renewable = Math.min(params.maxRenewable, baseScenarios[1].renewable + 5);
    baseScenarios[1].cost = baseScenarios[1].cost * (1 + Math.random() * 0.05);
    baseScenarios[1].carbon = baseScenarios[1].carbon * (0.9 - Math.random() * 0.05);
  }
  
  if (params.costConstraint) {
    baseScenarios[2].cost = Math.min(params.costConstraint, baseScenarios[2].cost - 0.2);
    baseScenarios[2].renewable = baseScenarios[2].renewable - Math.random() * 3;
    baseScenarios[2].carbon = baseScenarios[2].carbon + Math.random() * 30;
  }
  
  return baseScenarios;
};
