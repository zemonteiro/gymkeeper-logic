
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatsCard from './ui/StatsCard';
import StatChart from './ui/StatChart';
import { Users, Calendar, TrendingUp, Clock, Download, RefreshCw } from 'lucide-react';

// Sample data
const membershipData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 132 },
  { name: 'Mar', value: 145 },
  { name: 'Apr', value: 162 },
  { name: 'May', value: 180 },
  { name: 'Jun', value: 190 },
  { name: 'Jul', value: 210 },
  { name: 'Aug', value: 218 },
  { name: 'Sep', value: 225 },
  { name: 'Oct', value: 232 },
  { name: 'Nov', value: 240 },
  { name: 'Dec', value: 248 },
];

const classAttendanceData = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 52 },
  { name: 'Wed', value: 49 },
  { name: 'Thu', value: 63 },
  { name: 'Fri', value: 58 },
  { name: 'Sat', value: 69 },
  { name: 'Sun', value: 32 },
];

const revenueData = [
  { name: 'Jan', value: 18500 },
  { name: 'Feb', value: 19200 },
  { name: 'Mar', value: 19800 },
  { name: 'Apr', value: 20500 },
  { name: 'May', value: 21200 },
  { name: 'Jun', value: 22000 },
  { name: 'Jul', value: 23200 },
  { name: 'Aug', value: 23800 },
  { name: 'Sep', value: 24000 },
  { name: 'Oct', value: 24300 },
  { name: 'Nov', value: 24500 },
  { name: 'Dec', value: 25200 },
];

const popularClassesData = [
  { name: 'Yoga', value: 28 },
  { name: 'HIIT', value: 22 },
  { name: 'Pilates', value: 15 },
  { name: 'Zumba', value: 12 },
  { name: 'Spin', value: 10 },
  { name: 'Other', value: 13 },
];

const membershipBreakdownData = [
  { name: 'Basic', value: 425 },
  { name: 'Standard', value: 532 },
  { name: 'Premium', value: 291 },
];

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('yearly');
  
  const handleRefreshData = () => {
    console.log('Refreshing statistics data...');
  };
  
  const handleExportData = () => {
    console.log('Exporting statistics data...');
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Statistics</h1>
          <p className="text-gym-muted">Gym performance metrics and analytics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" onClick={handleExportData}>
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Members" 
          value="1,248"
          icon={<Users />}
          trend={{ value: 12, isPositive: true }}
          delay={100}
        />
        <StatsCard 
          title="Classes per Week" 
          value="32"
          icon={<Calendar />}
          trend={{ value: 8, isPositive: true }}
          delay={200}
        />
        <StatsCard 
          title="Monthly Revenue" 
          value="$24,500"
          icon={<TrendingUp />}
          trend={{ value: 5, isPositive: true }}
          delay={300}
        />
        <StatsCard 
          title="Avg. Session Length" 
          value="63 min"
          icon={<Clock />}
          trend={{ value: 2, isPositive: false }}
          delay={400}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatChart
          title="Membership Growth"
          subtitle="Number of active members"
          data={membershipData}
          type="line"
          dataKey="value"
          delay={500}
        />
        
        <StatChart
          title="Revenue"
          subtitle="Monthly revenue in USD"
          data={revenueData}
          type="area"
          dataKey="value"
          delay={600}
          colors={['#00C087']}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatChart
          title="Weekly Class Attendance"
          subtitle="Average attendance per day"
          data={classAttendanceData}
          type="bar"
          dataKey="value"
          delay={700}
        />
        
        <StatChart
          title="Popular Classes"
          subtitle="Percentage of total bookings"
          data={popularClassesData}
          type="pie"
          dataKey="value"
          delay={800}
        />
        
        <StatChart
          title="Membership Breakdown"
          subtitle="Members by membership type"
          data={membershipBreakdownData}
          type="pie"
          dataKey="value"
          delay={900}
          colors={['#8E9196', '#0080FF', '#00C087']}
        />
      </div>
    </div>
  );
};

export default Statistics;
