
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { AlertCircle, Plus, Minus, DollarSign, CreditCard, Trash2 } from 'lucide-react';
import { Product, SaleItem } from '@/types/sales';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PointOfSaleProps {
  products: Product[];
  addSale: (items: SaleItem[], paymentMethod: string, memberName?: string) => void;
  isLoading: boolean;
}

const PointOfSale = ({ products, addSale, isLoading }: PointOfSaleProps) => {
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [memberName, setMemberName] = useState('');
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
    
    toast.success(`Added ${product.name} to cart`);
  };
  
  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };
  
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    
    addSale(cart, paymentMethod, memberName || undefined);
    setCart([]);
    setMemberName('');
    toast.success('Sale completed successfully');
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <div className="mb-6">
            <Label htmlFor="search-products">Search Products</Label>
            <Input
              id="search-products"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <Badge variant="outline" className="mt-1 mb-2">
                        {product.category}
                      </Badge>
                    </div>
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <Plus size={16} className="mr-1" /> Add
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-8 text-center text-gym-muted">
                <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                <p>No products found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <div className="bg-white p-6 rounded-lg shadow-subtle sticky top-4">
          <h2 className="text-xl font-bold mb-4">Current Sale</h2>
          
          {cart.length === 0 ? (
            <div className="py-8 text-center text-gym-muted">
              <p>Cart is empty</p>
              <p className="text-sm mt-2">Add products by clicking on them</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map(item => (
                    <TableRow key={item.productId}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>${getTotalAmount().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="member-name">Member Name (Optional)</Label>
                  <Input 
                    id="member-name" 
                    value={memberName} 
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Enter member name..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select defaultValue="cash" onValueChange={setPaymentMethod}>
                    <SelectTrigger id="payment-method" className="mt-1">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="member">Charge to Member Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleCheckout}
                  disabled={isLoading || cart.length === 0}
                >
                  {paymentMethod === 'cash' ? (
                    <DollarSign className="mr-2" />
                  ) : (
                    <CreditCard className="mr-2" />
                  )}
                  Complete Sale (${getTotalAmount().toFixed(2)})
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;
