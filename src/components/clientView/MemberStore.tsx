
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
import { useSalesManagement } from '@/hooks/useSalesManagement';
import { SaleItem } from '@/types/sales';
import { toast } from 'sonner';

const MemberStore = () => {
  const { products, addSale } = useSalesManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<SaleItem[]>([]);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        taxRate: product.taxRate
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
      toast.error('Your cart is empty');
      return;
    }
    
    // In a real app, you would integrate with a payment processor here
    addSale(cart, 'member', 'John Doe'); // Hardcoded member name for demo
    setCart([]);
    toast.success('Purchase completed successfully! Your account has been charged.');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gym Store</h2>
        
        {cart.length > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
            <ShoppingCart size={14} />
            {cart.reduce((total, item) => total + item.quantity, 0)} items
          </Badge>
        )}
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <Badge className="mt-1" variant="outline">
                      {product.category}
                    </Badge>
                  </div>
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <Button onClick={() => addToCart(product.id)} className="w-full">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {cart.length > 0 && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Your Cart</h3>
              <Button variant="ghost" size="sm" onClick={() => setCart([])}>
                <X size={16} className="mr-1" /> Clear
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map(item => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500" 
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <X size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">
                    Total:
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ${getTotalAmount().toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="mt-6 flex justify-end">
              <Button size="lg" onClick={handleCheckout}>
                <ShoppingCart className="mr-2" />
                Check Out (${getTotalAmount().toFixed(2)})
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MemberStore;
