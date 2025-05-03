import { useNavigate } from "react-router-dom";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLogout } from "@/infra/authentication/use.logout";

export const ForbiddenPage = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-destructive/10 rounded-full">
            <Ban className="h-12 w-12 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-destructive">
              Acceso Denegado
            </h1>
            <p className="text-muted-foreground">
              No tienes los permisos necesarios para acceder a esta página.
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full sm:w-auto"
          >
            Cerrar Sesión
          </Button>
        </div>
      </Card>
    </div>
  );
};
