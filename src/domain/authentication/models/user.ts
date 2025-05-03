import { Serializable, jsonName, jsonProperty } from "ts-serializable";


export class User extends Serializable{
    @jsonProperty(String)
    id?: string;

    @jsonProperty(String)
    email?: string;

    @jsonProperty(String)
    password?: string; // Opcional y solo usado para creación/actualización

    confirmPassword?: string; // Opcional y solo usado para creación

    @jsonName("full_name")
    @jsonProperty(String)
    fullName?: string;

    @jsonName("created_at")
    @jsonProperty(String)
    createdAt?: string;

    @jsonName("updated_at")
    @jsonProperty(String)
    updatedAt?: string;
    
    @jsonProperty([String])
    roles?: string[];
  
  }
  
  // También puedes agregar tipos auxiliares si los necesitas
  export type CreateUserDTO = Omit<User, 'id' | 'created_at' | 'updated_at'>;
  
  export type UpdateUserDTO = Partial<CreateUserDTO>;
  
  export type UserProfile = Pick<User, 'fullName' | 'email'>;