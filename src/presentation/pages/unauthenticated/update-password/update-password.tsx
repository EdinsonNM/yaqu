import { useForm } from "react-hook-form";
import { TextInput, Button } from "flowbite-react";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Logo } from "@/components/ui/logo";
import supabase from "@/core/supabase-client";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirme su contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

type FormData = {
  password: string;
  confirmPassword: string;
};

function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Ha ocurrido un error al actualizar la contraseña");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-md shadow">
        <div className="flex justify-center mb-6">
          <Logo width={100} className="h-12" />
        </div>
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
          Actualizar Contraseña
        </h1>

        {success ? (
          <div className="space-y-4">
            <p className="text-center text-green-600 dark:text-green-400">
              Contraseña actualizada exitosamente. Redirigiendo al inicio de sesión...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-4 text-red-600 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-200">
                {error}
              </div>
            )}

            <div>
              <TextInput
                {...register("password")}
                type="password"
                placeholder="Nueva contraseña"
                icon={KeyRound}
                color={errors.password ? "failure" : "gray"}
                helperText={errors.password?.message}
              />
            </div>

            <div>
              <TextInput
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirmar contraseña"
                icon={KeyRound}
                color={errors.confirmPassword ? "failure" : "gray"}
                helperText={errors.confirmPassword?.message}
              />
            </div>

            <Button
              type="submit"
              gradientDuoTone="cyanToBlue"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdatePassword;