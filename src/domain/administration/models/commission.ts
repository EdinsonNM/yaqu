export interface Commission {
  id: string;
  code: string;
  name: string;
  description?: string;
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contactPhone?: string;
  contactEmail?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}
