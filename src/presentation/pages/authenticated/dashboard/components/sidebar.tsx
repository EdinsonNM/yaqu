import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/ui/logo";
import { Users, GraduationCap, BookOpen, LogOut, User } from "lucide-react";
import { useLogout } from "@infra/authentication/use.logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@presentation/utils/hooks/use-auth";

const sidebarItems = [
  {
    title: "Configuración",
    items: [
      {
        name: "Restaurantes",
        icon: Users,
        path: "/dashboard/restaurantes/listado",
      },
    ],
  },
  {
    title: "Administración",
    items: [
      {
        name: "Usuarios",
        icon: Users,
        path: "/dashboard/usuarios/listado",
      },
      {
        name: "Mi restaurante",
        icon: GraduationCap,
        path: "/dashboard/mi-restaurante",
      },
    ],
  },
  {
    title: "Pedidos",
    items: [
      {
        name: "Listado de Pedidos",
        icon: Users,
        path: "/dashboard/pedidos/listado",
      },
    ],
  },
  {
    title: "Reportes",
    items: [
      {
        name: "Listado de Reportes",
        icon: BookOpen,
        path: "/dashboard/reportes/listado",
      },
    ],
  },
];

export function SidebarMenu() {
  const { mutate } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await mutate(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  };
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 py-6 bg-orange-100">
        <div className="px-3 py-2 flex items-center justify-center">
          <img src={"./logo.png"} alt="Logo" className="w-30" />
        </div>

        <div className="space-y-4">
          {sidebarItems.map((group, idx) => (
            <div key={idx} className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {group.title}
              </h2>
              <div className="space-y-1">
                {group.items.map((item, itemIdx) => (
                  <NavLink
                    key={itemIdx}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium",
                        "transition-all hover:bg-muted/50 hover:text-foreground",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      )
                    }
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Perfil de usuario en la parte inferior */}
      <div className="border-t mt-auto p-4 bg-sidebar-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.avatarUrl}
                alt={user?.name || "Usuario"}
              />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name || "Usuario"}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                {user?.email || "usuario@ejemplo.com"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full p-2 hover:bg-muted/50 text-muted-foreground"
            title="Cerrar Sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
