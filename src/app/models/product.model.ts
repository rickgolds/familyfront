export interface Product {
  // setState(arg0: {bestSellers: any}): unknown;
  id: number;
  sizes: string[];
  tags: string[];
  name: string;
  colors: {
    id: number;
    name: string;
    code: string;
  }[];
  images: string[];
  image: string;
  audience: string[];
  categories: string[];
  description: string;
  rating: number;
  quantity: number | null;
  promotion: string;
  isNew: boolean;
  isTop: boolean;
  ratingCount: number;
  price: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  oldPrice: string;
  size: string;
  color: string;
}
