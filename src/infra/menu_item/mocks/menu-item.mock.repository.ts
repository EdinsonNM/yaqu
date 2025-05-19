import { injectable } from "tsyringe";
import { MenuItemRepository } from "../../../domain/menu_item/repositories/menu-item.repository";
import { MenuItem } from "../../../domain/menu_item/models/menu-item.model";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class MenuItemMockRepository implements MenuItemRepository {
  private items: MenuItem[] = [
    new MenuItem({
      id: uuidv4(),
      menuId: uuidv4(),
      name: "Hamburguesa Clásica",
      description: "Deliciosa hamburguesa con carne, lechuga, tomate y queso",
      price: 25.5,
      imageUrl: "https://example.com/hamburguesa.jpg",
      available: true,
      preparationTime: 15,
      isVegetarian: false,
      spicyLevel: 0,
      createdAt: new Date(),
    }),
    new MenuItem({
      id: uuidv4(),
      menuId: uuidv4(),
      name: "Ensalada César",
      description:
        "Ensalada fresca con pollo, lechuga, queso parmesano y croutones",
      price: 18.9,
      imageUrl: "https://example.com/ensalada.jpg",
      available: true,
      preparationTime: 10,
      isVegetarian: false,
      spicyLevel: 0,
      createdAt: new Date(),
    }),
    new MenuItem({
      id: uuidv4(),
      menuId: uuidv4(),
      name: "Pizza Vegetariana",
      description: "Pizza con champiñones, pimientos, cebolla y aceitunas",
      price: 32.5,
      imageUrl: "https://example.com/pizza.jpg",
      available: true,
      preparationTime: 20,
      isVegetarian: true,
      spicyLevel: 0,
      createdAt: new Date(),
    }),
  ];

  async getAll(): Promise<MenuItem[]> {
    return Promise.resolve([...this.items]);
  }

  async getAllByMenuId(menuId: string): Promise<MenuItem[]> {
    return Promise.resolve(this.items.filter((item) => item.menuId === menuId));
  }

  async getById(id: string): Promise<MenuItem | null> {
    const item = this.items.find((item) => item.id === id);
    return Promise.resolve(item || null);
  }

  async create(data: Partial<MenuItem>): Promise<MenuItem> {
    const newItem = new MenuItem({
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
    });

    this.items.push(newItem);
    return Promise.resolve(newItem);
  }

  async update(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Ítem de menú con ID ${id} no encontrado`);
    }

    const updatedItem = new MenuItem({
      ...this.items[index],
      ...data,
    });

    this.items[index] = updatedItem;
    return Promise.resolve(updatedItem);
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Ítem de menú con ID ${id} no encontrado`);
    }

    this.items.splice(index, 1);
    return Promise.resolve();
  }

  async updateAvailability(id: string, available: boolean): Promise<MenuItem> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Ítem de menú con ID ${id} no encontrado`);
    }

    const updatedItem = new MenuItem({
      ...this.items[index],
      available,
    });

    this.items[index] = updatedItem;
    return Promise.resolve(updatedItem);
  }
}
