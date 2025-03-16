
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/sales';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card key={product.id} className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <Badge className="mt-1" variant="outline">
              {product.category}
            </Badge>
          </div>
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onAddToCart(product.id)} 
          className="w-full gap-2"
          variant="default"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
