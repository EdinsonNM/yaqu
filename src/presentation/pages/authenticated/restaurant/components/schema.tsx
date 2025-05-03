import * as yup from "yup";
export const restaurantSchema = (isNew: boolean) => {
  return yup.object().shape<any>({
    name: yup.string().required("El nombre es requerido"),
    description: yup.string().required("La descripción es requerida"),
    email: yup
      .string()
      .email("El correo electrónico no es válido")
      .required("El correo electrónico es requerido"),
    address: yup.string().required("La dirección es requerida"),
    phone: yup.string().required("El teléfono es requerido"),
    ...(!isNew && {
      id: yup.string().required("El ID es requerido"),
    }),
  });
};
