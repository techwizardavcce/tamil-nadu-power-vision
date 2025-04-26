
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ConsumptionTableProps {
  data: any[];
  title?: string;
}

const ConsumptionTable: React.FC<ConsumptionTableProps> = ({ 
  data, 
  title = "Consumption Data" 
}) => {
  // Take only the most recent entries to avoid overcrowding
  const displayData = data.slice(-10);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Consumption (MW)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.consumption.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.predicted 
                      ? 'bg-power-green/10 text-power-green' 
                      : 'bg-power-blue/10 text-power-blue'
                  }`}>
                    {item.predicted ? 'Predicted' : 'Actual'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ConsumptionTable;
