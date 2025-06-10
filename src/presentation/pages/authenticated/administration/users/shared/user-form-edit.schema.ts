import * as yup from "yup";

export const editSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("El nombre completo es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres"),
  roles: yup
    .array()
    .of(yup.string().oneOf(["admin", "docente", "apoderado"]))
    .min(1, "Debe seleccionar al menos un rol")
    .required("Los roles son requeridos"),
});
