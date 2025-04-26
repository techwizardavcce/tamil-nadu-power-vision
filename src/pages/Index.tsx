
import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, BarChart3, Wind } from 'lucide-react';
import { toast } from 'sonner';

import NavSidebar from '../components/NavSidebar';
import StatsCard from '../components/StatsCard';
import ConsumptionChart from '../components/ConsumptionChart';
import ConsumptionTable from '../components/ConsumptionTable';
import EnergyMixChart from '../components/EnergyMixChart';
import ForecastParameters from '../components/ForecastParameters';
import OptimizationCard from '../components/OptimizationCard';

import { getCombinedConsumptionData } from '../services/forecastService';
import { getEnergyMixData, getOptimizationScenarios } from '../services/optimizationService';

const Index = () => {
  // State
  const [loading, setLoading] = useState(true);
  const [consumptionData, setConsumptionData] = useState<any>({ combined: [] });
  const [energyMix, setEnergyMix] = useState<any[]>([]);
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  
  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [consumptionResult, energyMixResult, scenariosResult] = await Promise.all([
          getCombinedConsumptionData(30, 7),
          getEnergyMixData(),
          getOptimizationScenarios()
        ]);
        
        // Update state
        setConsumptionData(consumptionResult);
        setEnergyMix(energyMixResult);
        setScenarios(scenariosResult);
        setSelectedScenario(scenariosResult[0].id);
        
        toast.success('Dashboard data loaded successfully');
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Calculate current consumption from the latest data point
  const currentConsumption = consumptionData.combined.length > 0 
    ? consumptionData.combined[consumptionData.combined.length - 1].consumption 
    : 0;
  
  // Calculate stats
  const peakConsumption = consumptionData.combined.length > 0
    ? Math.max(...consumptionData.combined.map((d: any) => d.consumption))
    : 0;
    
  // Calculate renewable percentage
  const renewablePercentage = energyMix.length > 0
    ? energyMix.filter(item => ['Solar', 'Wind', 'Hydro'].includes(item.name))
        .reduce((sum, item) => sum + item.value, 0)
    : 0;
    
  // Handle forecast parameter updates
  const handleForecastUpdate = (params: any) => {
    console.log('Updating forecast with parameters:', params);
    // In a real app, this would trigger an API call to update the forecast
  };
  
  // Handle scenario selection
  const handleScenarioSelect = (id: number) => {
    setSelectedScenario(id);
    toast.info(`Selected optimization scenario: ${scenarios.find(s => s.id === id)?.name}`);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <NavSidebar />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-power-dark">Tamil Nadu Power Vision</h1>
            <p className="text-muted-foreground">
              Real-time electricity consumption monitoring and forecasting
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-power-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading dashboard data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatsCard 
                  title="Current Consumption" 
                  value={`${(currentConsumption / 1000).toFixed(2)} GW`} 
                  description="Live power demand" 
                  trend={{ value: 3.2, positive: true }}
                  icon={<Zap size={20} />}
                />
                <StatsCard 
                  title="Peak Load" 
                  value={`${(peakConsumption / 1000).toFixed(2)} GW`} 
                  description="Highest in 30 days" 
                  icon={<TrendingUp size={20} />}
                />
                <StatsCard 
                  title="Renewable Energy" 
                  value={`${renewablePercentage}%`} 
                  description="Of total generation" 
                  trend={{ value: 5.8, positive: true }}
                  icon={<Wind size={20} />}
                />
                <StatsCard 
                  title="Cost of Power" 
                  value="₹8.75/kWh" 
                  description="Average procurement" 
                  trend={{ value: 2.1, positive: false }}
                  icon={<BarChart3 size={20} />}
                />
              </div>
              
              {/* Main content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <ConsumptionChart data={consumptionData.combined} />
                </div>
                <div>
                  <EnergyMixChart data={energyMix} />
                </div>
              </div>
              
              {/* Data table and forecast parameters */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <ConsumptionTable data={consumptionData.combined} />
                </div>
                <div>
                  <ForecastParameters onUpdate={handleForecastUpdate} />
                </div>
              </div>
              
              {/* Optimization scenarios */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Optimization Scenarios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {scenarios.map((scenario) => (
                    <OptimizationCard 
                      key={scenario.id} 
                      scenario={scenario} 
                      isSelected={scenario.id === selectedScenario}
                      onSelect={handleScenarioSelect}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
