export interface Product {
  id: number;
  name: string;
  size: number;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
  products: Product[];
}
