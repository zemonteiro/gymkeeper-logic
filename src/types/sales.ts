
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stockQuantity?: number;
  taxRate: number;
}

export interface SaleItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  taxRate?: number;
}

export interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: string;
  memberName?: string | null;
}
