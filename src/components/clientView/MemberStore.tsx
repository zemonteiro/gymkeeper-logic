
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, ShoppingCart } from 'lucide-react';
import { useSalesManagement } from '@/hooks/useSalesManagement';
import { SaleItem } from '@/types/sales';
import { toast } from 'sonner';
import ProductCard from './store/ProductCard';
import Cart from './store/Cart';

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
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
      
      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={() => setCart([])}
        getTotalAmount={getTotalAmount}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default MemberStore;
