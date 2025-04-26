
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface OptimizationScenario {
  id: number;
  name: string;
  cost: number;
  renewable: number;
  carbon: number;
  description: string;
}

interface OptimizationCardProps {
  scenario: OptimizationScenario;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
}

const OptimizationCard: React.FC<OptimizationCardProps> = ({
  scenario,
  isSelected = false,
  onSelect
}) => {
  return (
    <Card className={`${isSelected ? 'border-primary border-2' : ''}`}>
      <CardHeader>
        <CardTitle className="text-lg">{scenario.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Cost</span>
            <span className="font-medium">₹{scenario.cost}/kWh</span>
          </div>
          <Progress value={100 - ((scenario.cost - 8) / 2) * 100} className="h-1" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Renewable %</span>
            <span className="font-medium">{scenario.renewable}%</span>
          </div>
          <Progress value={scenario.renewable} className="h-1" />
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Carbon Intensity</span>
            <span className="font-medium">{scenario.carbon} g/kWh</span>
          </div>
          <Progress value={100 - (scenario.carbon / 1000) * 100} className="h-1" />
        </div>
        
        <p className="text-sm text-muted-foreground">{scenario.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant={isSelected ? "default" : "outline"}
          className="w-full"
          onClick={() => onSelect && onSelect(scenario.id)}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OptimizationCard;
