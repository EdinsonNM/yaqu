import { object, string } from "yup";

export const loginSchema = () =>
  object({
    username: string().email().required("schema.required"),
    password: string().required("schema.required"),
  });
