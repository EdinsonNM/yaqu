import * as yup from "yup";

export const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("El nombre completo es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres"),
  email: yup
    .string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Debe confirmar la contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  roles: yup
    .array()
    .of(yup.string().oneOf(["admin", "docente", "apoderado"]))
    .min(1, "Debe seleccionar al menos un rol")
    .required("Los roles son requeridos"),
});
