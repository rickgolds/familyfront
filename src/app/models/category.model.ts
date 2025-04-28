export interface Category {
  id: number;
  name: string;
  image: string;
  audience: string[];
}

export interface CategoriesResponse {
  categories: Category[];
}
