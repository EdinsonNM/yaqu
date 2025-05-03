import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@presentation/design/atoms/button/button";
import { TextInput } from "flowbite-react";
import { HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import HelperError from "@presentation/design/atoms/helper-error/helper-error";
import { useEffect, useState } from "react";
import { useLogin } from "@infra/authentication/use-login";
import { useAuth } from "@presentation/utils/hooks/use-auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "@presentation/store/auth-store";
import { UserSession } from "@domain/authentication/models/user-session";
import { loginSchema } from "./login.schema";
import { toast } from "react-toastify";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema()),
  });
  const { user } = useAuth();
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { setUserSession, userSession } = useAuthStore();
  const onTogglePassword = () => setShowPassword(!showPassword);
  // Helper function to determine the redirect path based on user roles
  const getRedirectPath = (session: UserSession) => {
    const redirectTo = new URLSearchParams(location.search).get("redirectTo");
    if (redirectTo) return redirectTo;
    /*
    // Check if user has teacher role but not admin role
    if (
      session.roles &&
      session.roles.includes(Role.teacher) &&
      !session.roles.includes(Role.admin)
    ) {
      return "/dashboard-teacher";
    }

    if (session.roles && session.roles.includes(Role.guardian)) {
      return "/dashboard-guardian";
    }
*/
    // Default redirect to dashboard
    return "/dashboard";
  };

  useEffect(() => {
    if (user && userSession) {
      const redirectPath = getRedirectPath(userSession);
      navigate(redirectPath);
    }
  }, [user, navigate, location, userSession]);

  const onSubmit = async (data: { username: string; password: string }) => {
    login(
      { email: data.username, password: data.password },
      {
        onSuccess: (session: UserSession) => {
          setUserSession(session);
          const redirectPath = getRedirectPath(session);
          navigate(redirectPath);
        },
        onError: () => {
          toast.error("Usuario o contraseña inválidos");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-2 relative">
        {/* Logo de Ridivi centrado */}
        <div className="flex flex-col items-center mt-1 md:mt-10 mb-8 relative">
          <img src="/carta_viva.png" alt="Ridivi Logo" className="h-36 mb-3" />

          <div className="text-center">
            <p className="text-xl font-bold text-gray-600">
              Le damos la bienvenida
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Identificación
          </label>
          <TextInput
            data-test="username"
            id="username"
            type="text"
            icon={HiUser}
            placeholder="Ingrese su identificación"
            {...register("username")}
            color={errors.username ? "failure" : "gray"}
            helperText={<HelperError error={errors.username} />}
            className="w-full"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <TextInput
            data-test="password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingrese su contraseña"
            {...register("password")}
            color={errors.password ? "failure" : "gray"}
            helperText={<HelperError error={errors.password} />}
            className="w-full"
            addon={
              showPassword ? (
                <HiEye onClick={onTogglePassword} className="cursor-pointer" />
              ) : (
                <HiEyeOff
                  onClick={onTogglePassword}
                  className="cursor-pointer"
                />
              )
            }
          />
        </div>

        <div className="mb-4">
          <Button
            type="submit"
            isProcessing={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Ingresar
          </Button>
        </div>

        <div className="text-center mb-2">
          <Link
            to={"forgot-password"}
            className="text-sm text-blue-600 hover:underline"
          >
            Olvidé mi contraseña
          </Link>
        </div>

        <div className="flex justify-center space-x-5 mt-6">
          <a href="#" className="text-green-500 hover:text-green-600">
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <FaInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-600">
            <FaFacebook className="h-5 w-5" />
          </a>
          <a href="#" className="text-blue-700 hover:text-blue-800">
            <FaLinkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </form>
  );
}
