
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ShoppingCart, X } from 'lucide-react';
import { SaleItem } from '@/types/sales';
import CartItem from './CartItem';

interface CartProps {
  cart: SaleItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  handleCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalAmount,
  handleCheckout
}) => {
  if (cart.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Your Cart</h3>
          <Button variant="ghost" size="sm" onClick={clearCart}>
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
              <CartItem
                key={item.productId}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={removeFromCart}
              />
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
  );
};

export default Cart;
