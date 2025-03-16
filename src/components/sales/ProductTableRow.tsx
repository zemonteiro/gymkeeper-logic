
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/sales';
import { PRODUCT_CATEGORIES } from './ProductForm';

interface ProductTableRowProps {
  product: Product;
  isEditing: boolean;
  editedProduct: Product | null;
  setEditedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  onStartEditing: (product: Product) => void;
  onCancelEditing: () => void;
  onSaveEdit: (id: string) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  isEditing,
  editedProduct,
  setEditedProduct,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onDeleteProduct
}) => {
  if (isEditing) {
    return (
      <TableRow>
        <TableCell>
          <Input
            value={editedProduct?.name}
            onChange={(e) => setEditedProduct({ 
              ...editedProduct!, 
              name: e.target.value 
            })}
          />
        </TableCell>
        <TableCell>
          <Select
            value={editedProduct?.category}
            onValueChange={(value) => setEditedProduct({ 
              ...editedProduct!, 
              category: value 
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <Input
            type="number"
            min="0"
            value={editedProduct?.stockQuantity}
            onChange={(e) => setEditedProduct({ 
              ...editedProduct!, 
              stockQuantity: parseInt(e.target.value) 
            })}
          />
        </TableCell>
        <TableCell className="text-right">
          <Input
            type="number"
            min="0"
            step="0.01"
            value={editedProduct?.price}
            onChange={(e) => setEditedProduct({ 
              ...editedProduct!, 
              price: parseFloat(e.target.value) 
            })}
            className="text-right"
          />
        </TableCell>
        <TableCell className="text-right">
          <Input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={editedProduct?.taxRate}
            onChange={(e) => setEditedProduct({ 
              ...editedProduct!, 
              taxRate: parseFloat(e.target.value) 
            })}
            className="text-right"
          />
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={onCancelEditing}
            >
              <X size={16} />
            </Button>
            <Button 
              size="sm" 
              onClick={() => onSaveEdit(product.id)}
            >
              <Save size={16} />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }
  
  return (
    <TableRow>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.category}
        </Badge>
      </TableCell>
      <TableCell>
        {product.stockQuantity !== undefined ? product.stockQuantity : 'N/A'}
      </TableCell>
      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
      <TableCell className="text-right">
        {(product.taxRate * 100).toFixed(0)}%
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onStartEditing(product)}
          >
            <Edit size={16} />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDeleteProduct(product.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
