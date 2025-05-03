import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es requerido"),
});

export default schema;
