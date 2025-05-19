import { MenuItem } from "@domain/menu_item/models/menu-item.model";
import * as yup from "yup";

export const menuItemSchema = yup.object<Partial<MenuItem>>({
  name: yup
    .string()
    .required("El nombre del plato es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),

  description: yup
    .string()
    .transform((value) => (value === null ? undefined : value))
    .nullable()
    .default("")
    .max(500, "La descripción no puede exceder los 500 caracteres"),

  price: yup
    .number()
    .required("El precio es obligatorio")
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser un valor positivo")
    .test(
      "max-decimals",
      "El precio no puede tener más de 2 decimales",
      (value) => {
        if (!value) return true;
        const decimalPart = (value.toString().split(".")[1] || "").length;
        return decimalPart <= 2;
      }
    ),

  available: yup.boolean().default(true),

  menuId: yup.string().required("El ID del menú es obligatorio"),
});
