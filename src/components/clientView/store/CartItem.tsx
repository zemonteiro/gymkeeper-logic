
import React from 'react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { X, Plus, Minus } from 'lucide-react';
import { SaleItem } from '@/types/sales';

interface CartItemProps {
  item: SaleItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <TableRow>
      <TableCell>{item.productName}</TableCell>
      <TableCell>${item.price.toFixed(2)}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
          >
            <Minus size={14} />
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
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
          onClick={() => onRemove(item.productId)}
        >
          <X size={14} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
