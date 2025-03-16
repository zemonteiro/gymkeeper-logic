
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, Calendar, ArrowUpDown } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Sale } from '@/types/sales';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface SalesHistoryProps {
  salesHistory: Sale[];
  isLoading: boolean;
}

const SalesHistory = ({ salesHistory, isLoading }: SalesHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const handleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredSales = salesHistory
    .filter(sale => {
      // Search by member name or transaction ID
      const matchesSearch = 
        !searchTerm || 
        (sale.memberName && sale.memberName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by date range
      const saleDate = new Date(sale.date);
      const afterStartDate = !startDate || saleDate >= new Date(startDate);
      const beforeEndDate = !endDate || saleDate <= new Date(endDate);
      
      return matchesSearch && afterStartDate && beforeEndDate;
    })
    .sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortDirection === 'asc' 
          ? a.totalAmount - b.totalAmount 
          : b.totalAmount - a.totalAmount;
      }
    });
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-subtle">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="search-sales">Search Transactions</Label>
            <div className="relative mt-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="search-sales"
                placeholder="Search by member or transaction ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('date')} 
                    className="flex items-center"
                  >
                    <Calendar className="mr-1 h-4 w-4" />
                    Date & Time
                    {sortField === 'date' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('amount')} 
                    className="flex items-center ml-auto"
                  >
                    Amount
                    {sortField === 'amount' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No sales found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSales.map(sale => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id.substring(0, 8)}...</TableCell>
                    <TableCell>{format(new Date(sale.date), 'MMM d, yyyy h:mm a')}</TableCell>
                    <TableCell>{sale.memberName || 'Guest'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {sale.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>{sale.items.reduce((sum, item) => sum + item.quantity, 0)} items</TableCell>
                    <TableCell className="text-right font-bold">${sale.totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-gym-muted text-right">
          Showing {filteredSales.length} of {salesHistory.length} transactions
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
