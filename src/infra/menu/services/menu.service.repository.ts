import { injectable, inject } from "tsyringe";
import { SupabaseClient } from "@supabase/supabase-js";
import { MenuRepository } from "../../../domain/menu/repositories/menu.repository";
import { Menu } from "../../../domain/menu/models/menu.model";

@injectable()
export class MenuServiceRepository implements MenuRepository {
  private readonly tableName = "menus";

  constructor(
    @inject("SupabaseClient")
    private readonly supabase: SupabaseClient
  ) {}

  async getAll(restaurantId: string): Promise<Menu[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error al obtener menús: ${error.message}`);
    }

    return data.map((item) => new Menu().fromJSON(item));
  }

  async getById(id: string): Promise<Menu | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // No se encontró el menú
      }
      throw new Error(`Error al obtener menú: ${error.message}`);
    }

    return new Menu(data);
  }

  async create(data: Partial<Menu>): Promise<Menu> {
    const dataJson = new Menu(data).toJSON();
    const { data: createdData, error } = await this.supabase
      .from(this.tableName)
      .insert(dataJson)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear menú: ${error.message}`);
    }

    return new Menu(createdData);
  }

  async update(id: string, data: Partial<Menu>): Promise<Menu> {
    const dataJson = new Menu(data).toJSON();
    const { data: updatedData, error } = await this.supabase
      .from(this.tableName)
      .update(dataJson)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error al actualizar menú: ${error.message}`);
    }

    return new Menu(updatedData);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Error al eliminar menú: ${error.message}`);
    }
  }

  async toggleActive(id: string, active: boolean): Promise<Menu> {
    return this.update(id, { active });
  }

  async uploadMenuImage(id: string, file: File): Promise<Menu> {
    // Comprimir la imagen antes de subirla
    const compressedFile = await this.compressImage(file);

    const { data, error } = await this.supabase.storage
      .from("menus")
      .upload(id, compressedFile, { upsert: true });
    if (error) throw error;

    const { data: publicUrlData } = await this.supabase.storage
      .from("menus")
      .getPublicUrl(data.path);
    const imageUrl = publicUrlData?.publicUrl;
    if (!imageUrl) throw new Error("Error generating image URL");

    const { data: updatedData, error: updateError } = await this.supabase
      .from("menus")
      .update({ image_url: imageUrl })
      .eq("id", id)
      .single();
    if (updateError) throw new Error(updateError.message);

    return updatedData as Menu;
  }

  /**
   * Comprime una imagen para reducir su tamaño antes de subirla
   * @param file Archivo de imagen original
   * @param maxSizeKB Tamaño máximo en KB (por defecto 500KB)
   * @param maxWidth Ancho máximo en píxeles (por defecto 1200px)
   * @returns Archivo comprimido
   */
  private async compressImage(
    file: File,
    maxSizeKB: number = 500,
    maxWidth: number = 1200
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      // Si el archivo ya es menor que el tamaño máximo, devolverlo sin comprimir
      if (file.size / 1024 <= maxSizeKB) {
        return resolve(file);
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          // Calcular nuevas dimensiones manteniendo la proporción
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          // Crear canvas para la compresión
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            return reject(new Error("No se pudo crear el contexto del canvas"));
          }

          // Dibujar la imagen en el canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Comprimir y convertir a Blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return reject(new Error("Error al comprimir la imagen"));
              }

              // Crear nuevo archivo con el mismo nombre pero comprimido
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });

              resolve(compressedFile);
            },
            "image/jpeg",
            0.7 // Calidad de compresión (0.7 = 70%)
          );
        };
        img.onerror = () => {
          reject(new Error("Error al cargar la imagen"));
        };
      };
      reader.onerror = () => {
        reject(new Error("Error al leer el archivo"));
      };
    });
  }
}
