
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface ForecastParametersProps {
  onUpdate?: (params: any) => void;
}

const ForecastParameters: React.FC<ForecastParametersProps> = ({ onUpdate }) => {
  const [params, setParams] = useState({
    forecastDays: 7,
    includeWeather: true,
    confidenceInterval: 80,
    forecastModel: 'lstm',
    seasonality: 'weekly',
  });
  
  const handleChange = (name: string, value: any) => {
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Forecast parameters updated');
    if (onUpdate) {
      onUpdate(params);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast Parameters</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forecastDays">Forecast Horizon (days)</Label>
            <Input 
              id="forecastDays"
              type="number"
              min={1}
              max={30}
              value={params.forecastDays}
              onChange={(e) => handleChange('forecastDays', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model">Forecast Model</Label>
            <Select 
              value={params.forecastModel}
              onValueChange={(value) => handleChange('forecastModel', value)}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arima">ARIMA</SelectItem>
                <SelectItem value="lstm">LSTM</SelectItem>
                <SelectItem value="prophet">Prophet</SelectItem>
                <SelectItem value="ensemble">Ensemble</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seasonality">Seasonality Pattern</Label>
            <Select 
              value={params.seasonality}
              onValueChange={(value) => handleChange('seasonality', value)}
            >
              <SelectTrigger id="seasonality">
                <SelectValue placeholder="Select seasonality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confidence">Confidence Interval ({params.confidenceInterval}%)</Label>
            <Slider
              id="confidence"
              min={50}
              max={95}
              step={5}
              value={[params.confidenceInterval]}
              onValueChange={(value) => handleChange('confidenceInterval', value[0])}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="weather" 
              checked={params.includeWeather}
              onCheckedChange={(checked) => handleChange('includeWeather', Boolean(checked))}
            />
            <Label htmlFor="weather">Include weather data</Label>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">
            Update Forecast
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ForecastParameters;
