
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ConsumptionChartProps {
  data: any[];
  title?: string;
}

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ data, title = "Electricity Consumption" }) => {
  // Split data into historical and forecast parts
  const historicalData = data.filter(item => !item.predicted);
  const forecastData = data.filter(item => item.predicted);
  
  // Combine data for display purposes
  const combinedData = [...historicalData, ...forecastData];
  
  // Format date for tooltip and axis
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };
  
  // Format tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const isPredicted = dataPoint.predicted;
      
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-medium">{dataPoint.date}</p>
          <p className="text-sm">
            <span className="font-medium">Consumption:</span> {dataPoint.consumption.toLocaleString()} MW
          </p>
          {isPredicted && (
            <p className="text-xs text-muted-foreground mt-1">Forecasted value</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={combinedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatDate}
                minTickGap={50}
              />
              <YAxis 
                tickFormatter={(value) => `${value / 1000}k`}
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="#0062cc" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={false}
                data={historicalData}
                name="Historical"
              />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="#28a745" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                data={forecastData}
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;
