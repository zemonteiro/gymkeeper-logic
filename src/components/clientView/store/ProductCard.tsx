
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/sales';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
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
          <Button onClick={() => onAddToCart(product.id)} className="w-full">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
