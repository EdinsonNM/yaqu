export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  category: string;
  rating: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
