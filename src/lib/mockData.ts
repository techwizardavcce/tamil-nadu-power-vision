
// Simulated electricity consumption data for Tamil Nadu
export const generateHistoricalData = (days = 30) => {
  const data = [];
  const now = new Date();
  
  // Generate consumption data for the last 'days' days
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Base consumption in MW
    let consumption = 15000 + Math.random() * 3000;
    
    // Add weekly patterns (weekends tend to have lower consumption)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      consumption *= 0.85; // 15% lower on weekends
    }
    
    // Add daily patterns (peak hours)
    const hour = date.getHours();
    if (hour >= 9 && hour <= 12) {
      consumption *= 1.2; // Morning peak
    } else if (hour >= 18 && hour <= 21) {
      consumption *= 1.3; // Evening peak
    } else if (hour >= 0 && hour <= 5) {
      consumption *= 0.7; // Night low
    }
    
    data.push({
      timestamp: date.toISOString(),
      consumption: Math.round(consumption),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  }
  
  return data;
};

export const generateForecastData = (days = 7, baseData: any[] = []) => {
  const data = [];
  const now = new Date();
  const lastValue = baseData.length > 0 
    ? baseData[baseData.length - 1].consumption 
    : 16000;
  
  // Generate forecast data for the next 'days' days
  for (let i = 1; i <= days; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    // Base consumption with some continuity from the last historical value
    let consumption = lastValue * (0.95 + Math.random() * 0.1);
    
    // Add weekly patterns (weekends tend to have lower consumption)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      consumption *= 0.85; // 15% lower on weekends
    }
    
    // Add some random variation
    consumption += (Math.random() - 0.5) * 1000;
    
    data.push({
      timestamp: date.toISOString(),
      consumption: Math.round(consumption),
      date: date.toLocaleDateString(),
      time: '12:00', // For forecast data we just use a default time
      predicted: true
    });
  }
  
  return data;
};

// Generate energy source mix data
export const generateEnergyMixData = () => {
  return [
    { name: 'Coal', value: 45, color: '#6c757d' },
    { name: 'Hydro', value: 15, color: '#0d6efd' },
    { name: 'Solar', value: 20, color: '#ffc107' },
    { name: 'Wind', value: 12, color: '#20c997' },
    { name: 'Nuclear', value: 8, color: '#6610f2' }
  ];
};

// Generate optimization scenarios
export const generateOptimizationScenarios = () => {
  return [
    {
      id: 1,
      name: 'Current Mix',
      cost: 8.75,
      renewable: 32,
      carbon: 650,
      description: 'Current energy procurement strategy'
    },
    {
      id: 2,
      name: 'Renewable Focus',
      cost: 9.12,
      renewable: 48,
      carbon: 450,
      description: 'Increase renewable energy procurement to 48%'
    },
    {
      id: 3,
      name: 'Cost Optimized',
      cost: 8.45,
      renewable: 30,
      carbon: 670,
      description: 'Optimize for lowest cost procurement'
    },
    {
      id: 4,
      name: 'Balanced',
      cost: 8.62,
      renewable: 40,
      carbon: 520,
      description: 'Balance cost and renewable integration'
    }
  ];
};

// Optimization parameters
export const optimizationParameters = {
  demandForecast: 18500, // MW
  transmissionLoss: 4.2, // %
  maxRenewable: 50, // %
  costConstraint: 9.0, // Rs/kWh
  carbonTarget: 500 // g/kWh
};

// Districts in Tamil Nadu
export const districts = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Thoothukudi', 'Thanjavur', 'Dindigul', 'Kanchipuram',
  'Vellore', 'Erode', 'Theni', 'Namakkal', 'Pudukkottai'
];

// District-wise consumption
export const generateDistrictData = () => {
  return districts.map(district => ({
    name: district,
    consumption: Math.round(1000 + Math.random() * 4000),
    growth: Math.round((Math.random() * 10 - 3) * 10) / 10, // -3% to +7%
    renewable: Math.round(Math.random() * 35)
  }));
};
