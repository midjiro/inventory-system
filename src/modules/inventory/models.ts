export interface IItem {
  id?: string;
  product: string;
  category: string;
  sku: string;
  available: number;
  unitPrice: 'In stock' | 'Low stock' | 'Out of stock' | 'Discontinued';
  location: string;
  totalRevenue: number;
}
