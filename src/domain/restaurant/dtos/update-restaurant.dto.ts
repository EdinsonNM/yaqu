export class UpdateRestaurantDTO {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;

  constructor(data: Partial<UpdateRestaurantDTO>) {
    this.name = data.name;
    this.description = data.description;
    this.address = data.address;
    this.phone = data.phone;
    this.email = data.email;
    this.logoUrl = data.logoUrl;
  }

  validate(): boolean {
    if (this.name !== undefined && this.name.trim() === "") {
      return false;
    }

    if (this.email !== undefined && !this.validateEmail(this.email)) {
      return false;
    }

    return true;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
