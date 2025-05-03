import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getRoleLabel, RoleName } from "@domain/authentication/enums/role.enum";
import useAuthStore from "@presentation/store/auth-store";
import { ChevronDown } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const MenuRole = () => {
  const [currentRole, setCurrentRole] = useState<RoleName | null>(null);
  const navigate = useNavigate();
  const { userSession } = useAuthStore();
  const navigateToDashboard = (role: RoleName) => {
    setCurrentRole(role);
    navigate("/dashboard" + role);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 sm:gap-2 h-8 sm:h-10 px-2 sm:px-3"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline">
            {getRoleLabel(currentRole || RoleName.GUEST)}
          </span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {userSession?.roles?.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => navigateToDashboard(role)}
            className={`py-2 ${currentRole === role ? "bg-muted" : ""}`}
          >
            {getRoleLabel(role)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
