
import { useState, useEffect } from 'react';
import { Product, Sale, SaleItem } from '@/types/sales';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Sample initial products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Protein Shake',
    price: 5.99,
    category: 'supplement',
    description: 'Delicious protein shake with 25g of protein',
    stockQuantity: 50,
    taxRate: 0.1
  },
  {
    id: '2',
    name: 'Gym Towel',
    price: 12.99,
    category: 'merchandise',
    description: 'High-quality gym towel with gym logo',
    stockQuantity: 30,
    taxRate: 0.1
  },
  {
    id: '3',
    name: 'Padlock',
    price: 8.99,
    category: 'merchandise',
    description: 'Secure padlock for lockers',
    stockQuantity: 20,
    taxRate: 0.1
  },
  {
    id: '4',
    name: 'Towel Rental',
    price: 2.99,
    category: 'rental',
    description: 'Rent a clean towel for your workout',
    stockQuantity: 100,
    taxRate: 0.1
  },
  {
    id: '5',
    name: 'Energy Drink',
    price: 3.99,
    category: 'food',
    description: 'Sugar-free energy drink',
    stockQuantity: 40,
    taxRate: 0.1
  },
  {
    id: '6',
    name: 'Gym Water Bottle',
    price: 15.99,
    category: 'merchandise',
    description: '24oz stainless steel water bottle with gym logo',
    stockQuantity: 25,
    taxRate: 0.1
  },
  {
    id: '7',
    name: 'Personal Training (1 hr)',
    price: 65.00,
    category: 'service',
    description: '1-hour personal training session',
    taxRate: 0.1
  }
];

// Generate some sample sales history
const generateSampleSales = (): Sale[] => {
  const sales: Sale[] = [];
  const today = new Date();
  
  const paymentMethods = ['cash', 'card', 'member'];
  const members = ['John Smith', 'Sarah Johnson', 'Mike Williams', 'Emily Davis', null];
  
  // Generate 20 random sales over the past 30 days
  for (let i = 0; i < 20; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 12) + 8); // Between 8am and 8pm
    
    const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 items
    const items: SaleItem[] = [];
    
    // Add random items to the sale
    for (let j = 0; j < itemCount; j++) {
      const product = initialProducts[Math.floor(Math.random() * initialProducts.length)];
      const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 quantity
      
      items.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        taxRate: product.taxRate
      });
    }
    
    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create the sale
    sales.push({
      id: uuidv4(),
      date: date.toISOString(),
      items: items,
      totalAmount: totalAmount,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      memberName: members[Math.floor(Math.random() * members.length)]
    });
  }
  
  // Sort by date (newest first)
  return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const useSalesManagement = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem('gym_products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  
  const [salesHistory, setSalesHistory] = useState<Sale[]>(() => {
    const storedSales = localStorage.getItem('gym_sales');
    return storedSales ? JSON.parse(storedSales) : generateSampleSales();
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('gym_products', JSON.stringify(products));
  }, [products]);
  
  useEffect(() => {
    localStorage.setItem('gym_sales', JSON.stringify(salesHistory));
  }, [salesHistory]);
  
  // Calculate total revenue
  const totalRevenue = salesHistory.reduce((sum, sale) => sum + sale.totalAmount, 0);
  
  // Calculate revenue by category
  const revenueByCategory = salesHistory.reduce((categories: Record<string, number>, sale) => {
    sale.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const category = product.category;
        categories[category] = (categories[category] || 0) + (item.price * item.quantity);
      }
    });
    return categories;
  }, {});
  
  // Calculate revenue by product
  const revenueByProduct = salesHistory.reduce((productRevenue: Record<string, { name: string; amount: number }>, sale) => {
    sale.items.forEach(item => {
      if (!productRevenue[item.productId]) {
        productRevenue[item.productId] = {
          name: item.productName,
          amount: 0
        };
      }
      productRevenue[item.productId].amount += (item.price * item.quantity);
    });
    return productRevenue;
  }, {});
  
  // Add a new product
  const addProduct = (product: Omit<Product, 'id'>) => {
    setIsLoading(true);
    
    try {
      const newProduct: Product = {
        ...product,
        id: uuidv4()
      };
      
      setProducts([...products, newProduct]);
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update an existing product
  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setIsLoading(true);
    
    try {
      setProducts(products.map(product => 
        product.id === id ? { ...product, ...updatedFields } : product
      ));
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a product
  const deleteProduct = (id: string) => {
    setIsLoading(true);
    
    try {
      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add a new sale
  const addSale = (items: SaleItem[], paymentMethod: string, memberName?: string) => {
    setIsLoading(true);
    
    try {
      const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const newSale: Sale = {
        id: uuidv4(),
        date: new Date().toISOString(),
        items,
        totalAmount,
        paymentMethod,
        memberName
      };
      
      setSalesHistory([newSale, ...salesHistory]);
      
      // Update stock quantities for products
      const updatedProducts = [...products];
      items.forEach(item => {
        const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
        if (productIndex !== -1 && updatedProducts[productIndex].stockQuantity !== undefined) {
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            stockQuantity: (updatedProducts[productIndex].stockQuantity || 0) - item.quantity
          };
        }
      });
      
      setProducts(updatedProducts);
      toast.success('Sale completed successfully');
    } catch (error) {
      console.error('Error adding sale:', error);
      toast.error('Failed to complete sale');
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    products,
    salesHistory,
    isLoading,
    totalRevenue,
    revenueByCategory,
    revenueByProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    addSale
  };
};
