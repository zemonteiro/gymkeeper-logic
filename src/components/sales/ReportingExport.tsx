
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, FileDown, Calendar, Receipt } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Pie, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Sale } from '@/types/sales';
import { format, subDays, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { toast } from 'sonner';

interface ReportingExportProps {
  salesHistory: Sale[];
  totalRevenue: number;
  revenueByCategory: Record<string, number>;
  revenueByProduct: Record<string, { name: string; amount: number }>;
}

const ReportingExport = ({ 
  salesHistory, 
  totalRevenue, 
  revenueByCategory, 
  revenueByProduct 
}: ReportingExportProps) => {
  const [timeRange, setTimeRange] = useState('month');
  const [chartType, setChartType] = useState('bar');
  
  const timeRanges = {
    day: {
      label: 'Today',
      start: startOfDay(new Date()),
      end: endOfDay(new Date())
    },
    week: {
      label: 'This Week',
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date())
    },
    month: {
      label: 'This Month',
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date())
    },
    quarter: {
      label: 'Last 3 Months',
      start: startOfDay(subDays(new Date(), 90)),
      end: endOfDay(new Date())
    },
    year: {
      label: 'Last 12 Months',
      start: startOfDay(subDays(new Date(), 365)),
      end: endOfDay(new Date())
    }
  };
  
  const filteredSales = salesHistory.filter(sale => {
    const saleDate = new Date(sale.date);
    return (
      saleDate >= timeRanges[timeRange as keyof typeof timeRanges].start && 
      saleDate <= timeRanges[timeRange as keyof typeof timeRanges].end
    );
  });
  
  const filteredTotalRevenue = filteredSales.reduce((total, sale) => total + sale.totalAmount, 0);
  
  const prepareBarChartData = () => {
    const categoryData = Object.entries(revenueByCategory).map(([category, amount]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      amount: amount
    }));
    
    return categoryData.sort((a, b) => b.amount - a.amount);
  };
  
  const preparePieChartData = () => {
    const categoryData = Object.entries(revenueByCategory).map(([category, amount]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: amount
    }));
    
    return categoryData.sort((a, b) => b.value - a.value);
  };
  
  const prepareProductData = () => {
    return Object.values(revenueByProduct)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B66FF'];
  
  const handleExportCSV = () => {
    try {
      // Prepare CSV content
      const headers = ['Transaction ID', 'Date', 'Time', 'Member', 'Payment Method', 'Items', 'Total Amount', 'Tax Amount'];
      
      const csvRows = [
        headers.join(','),
        ...filteredSales.map(sale => {
          const date = new Date(sale.date);
          return [
            `"${sale.id}"`,
            `"${format(date, 'yyyy-MM-dd')}"`,
            `"${format(date, 'HH:mm:ss')}"`,
            `"${sale.memberName || 'Guest'}"`,
            `"${sale.paymentMethod}"`,
            sale.items.reduce((sum, item) => sum + item.quantity, 0),
            sale.totalAmount.toFixed(2),
            sale.items.reduce((sum, item) => {
              const taxAmount = item.price * item.quantity * (item.taxRate || 0.1);
              return sum + taxAmount;
            }, 0).toFixed(2)
          ].join(',');
        })
      ].join('\n');
      
      // Create a blob and download
      const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `sales_report_${timeRange}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Sales report exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export sales report');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
            <div className="text-sm text-gym-muted mt-1">All time</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Revenue ({timeRanges[timeRange as keyof typeof timeRanges].label})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${filteredTotalRevenue.toFixed(2)}</div>
            <div className="text-sm text-gym-muted mt-1">
              {timeRanges[timeRange as keyof typeof timeRanges].label}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{filteredSales.length}</div>
            <div className="text-sm text-gym-muted mt-1">
              {timeRanges[timeRange as keyof typeof timeRanges].label}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">Avg. Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${filteredSales.length > 0 
                ? (filteredTotalRevenue / filteredSales.length).toFixed(2) 
                : '0.00'}
            </div>
            <div className="text-sm text-gym-muted mt-1">
              {timeRanges[timeRange as keyof typeof timeRanges].label}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-subtle space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Sales Analytics</h2>
            <p className="text-gym-muted">View and export sales data for tax reporting</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <Label htmlFor="time-range" className="mb-2 block">Time Range</Label>
              <Select defaultValue="month" onValueChange={setTimeRange}>
                <SelectTrigger id="time-range" className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">Last 3 Months</SelectItem>
                  <SelectItem value="year">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="chart-type" className="mb-2 block">Chart Type</Label>
              <div className="flex">
                <Button 
                  variant={chartType === 'bar' ? 'default' : 'outline'} 
                  className="rounded-r-none"
                  onClick={() => setChartType('bar')}
                >
                  <BarChart size={16} />
                </Button>
                <Button 
                  variant={chartType === 'pie' ? 'default' : 'outline'} 
                  className="rounded-l-none"
                  onClick={() => setChartType('pie')}
                >
                  <PieChart size={16} />
                </Button>
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Export</Label>
              <Button variant="outline" onClick={handleExportCSV}>
                <FileDown size={16} className="mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80">
            <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
            
            {chartType === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={prepareBarChartData()}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Bar dataKey="amount" fill="#4f46e5" name="Revenue" />
                </RechartsBarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={preparePieChartData()}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {preparePieChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="h-80">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={prepareProductData()} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="amount" fill="#0ea5e9" name="Revenue" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingExport;
