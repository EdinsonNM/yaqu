import UnauthenticatedLayout from "../unauthenticated-layout";
import LoginForm from "./login-form";

function Login() {
  return (
    <UnauthenticatedLayout>
      <div className="w-full h-full flex justify-center items-center p-8">
        {/* Card para pantallas medianas y grandes con imagen y formulario */}
        <div className="hidden md:flex bg-white dark:bg-base-100 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex-col md:flex-row">
          <div className="md:w-1/2 relative md:h-auto p-4">
            <div className="w-full h-full overflow-hidden rounded-2xl">
              <img
                src="/bg.png"
                alt="Background"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="md:w-1/2 bg-white dark:bg-base-100 flex justify-center items-center p-8">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </div>

        {/* Card para dispositivos móviles solo con formulario */}
        <div className="md:hidden bg-white dark:bg-base-100 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-white dark:bg-base-100 flex justify-center items-center p-6">
            <div className="w-full">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </UnauthenticatedLayout>
  );
}

export default Login;
