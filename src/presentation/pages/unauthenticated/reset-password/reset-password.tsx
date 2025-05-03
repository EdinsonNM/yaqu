import { useForm } from "react-hook-form";
import { TextInput, Button } from "flowbite-react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./reset-password.schema";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@presentation/utils/hooks/use-auth";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: { email: string }) => {
    try {
      await resetPassword(data.email);
      setSuccess(true);
    } catch (err) {
      // El error se manejará a través del formulario
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-md shadow">
        <div className="flex justify-center mb-6">
          <Logo width={100} className="h-12" />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
          Restablecer Contraseña
        </h1>

        {success ? (
          <div className="space-y-4">
            <p className="text-center text-green-600 dark:text-green-400">
              Se ha enviado un correo electrónico con las instrucciones para restablecer su contraseña.
            </p>
            <Button
              gradientDuoTone="cyanToBlue"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Volver al inicio de sesión
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <TextInput
                {...register("email")}
                type="email"
                placeholder="Correo electrónico"
                icon={Mail}
                color={errors.email ? "failure" : "gray"}
                helperText={errors.email?.message}
              />
            </div>

            <Button
              type="submit"
              gradientDuoTone="cyanToBlue"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar correo de recuperación"}
            </Button>

            <Button
              color="gray"
              className="w-full mt-2"
              onClick={() => navigate("/login")}
            >
              Volver al inicio de sesión
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;