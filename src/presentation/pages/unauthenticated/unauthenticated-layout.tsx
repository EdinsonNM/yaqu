import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function UnauthenticatedLayout({ children }: Props) {
  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundColor: "#f0f4f8" }}
    >
      {/* Imagen con recorte diagonal solo para pantallas medianas y grandes */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden hidden md:block"
        style={{ clipPath: "polygon(0 0, 75% 0, 35% 100%, 0 100%)" }}
      >
        <img
          src="/bg2.png"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Imagen sin recorte para dispositivos móviles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden md:hidden">
        <img
          src="/bg.png"
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <main className="flex-1 flex justify-center h-full w-full items-center overflow-hidden relative z-10">
        {children}
      </main>
    </div>
  );
}
