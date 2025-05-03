import { Navigate } from "react-router-dom";
import useAuthStore from "@presentation/store/auth-store";
import { RoleName } from "@domain/authentication/enums/role.enum";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: RoleName[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [RoleName.SUPER_ADMIN],
}) => {
  const { userSession } = useAuthStore();

  if (!userSession || !userSession.roles) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = userSession.roles.some((userRole: RoleName) =>
    allowedRoles.includes(userRole)
  );

  if (!hasAccess) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};
