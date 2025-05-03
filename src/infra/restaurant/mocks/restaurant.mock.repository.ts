import { injectable } from "tsyringe";
import { RestaurantRepository } from "../../../domain/restaurant/repositories/restaurant.repository";
import { Restaurant } from "../../../domain/restaurant/models/restaurant.model";
import { CreateRestaurantDTO } from "../../../domain/restaurant/dtos/create-restaurant.dto";
import { UpdateRestaurantDTO } from "../../../domain/restaurant/dtos/update-restaurant.dto";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class RestaurantMockRepository implements RestaurantRepository {
  private restaurants: Restaurant[] = [
    new Restaurant({
      id: "1",
      name: "Restaurante Ejemplo",
      description: "Un restaurante de ejemplo",
      address: "Calle Principal 123",
      phone: "123-456-7890",
      email: "ejemplo@restaurante.com",
      logoUrl: "https://example.com/logo.png",
      createdAt: new Date(),
    }),
  ];

  async getAll(): Promise<Restaurant[]> {
    return [...this.restaurants];
  }

  async getById(id: string): Promise<Restaurant | null> {
    const restaurant = this.restaurants.find((r) => r.id === id);
    return restaurant ? new Restaurant(restaurant) : null;
  }

  async create(data: CreateRestaurantDTO): Promise<Restaurant> {
    const newRestaurant = new Restaurant({
      id: uuidv4(),
      name: data.name,
      description: data.description,
      address: data.address,
      phone: data.phone,
      email: data.email,
      logoUrl: data.logoUrl,
      createdAt: new Date(),
    });

    this.restaurants.push(newRestaurant);
    return new Restaurant(newRestaurant);
  }

  async update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant> {
    const index = this.restaurants.findIndex((r) => r.id === id);

    if (index === -1) {
      throw new Error("Restaurante no encontrado");
    }

    const updatedRestaurant = new Restaurant({
      ...this.restaurants[index],
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.address !== undefined && { address: data.address }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.logoUrl !== undefined && { logoUrl: data.logoUrl }),
    });

    this.restaurants[index] = updatedRestaurant;
    return new Restaurant(updatedRestaurant);
  }

  async delete(id: string): Promise<void> {
    const index = this.restaurants.findIndex((r) => r.id === id);

    if (index !== -1) {
      this.restaurants.splice(index, 1);
    }
  }
}
