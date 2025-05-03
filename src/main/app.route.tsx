import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "@presentation/components/molecules/protected-route/protected-route";
import { AuthProvider } from "@presentation/utils/contexts/auth/auth.context";
import { Loading } from "@presentation/components/atoms/loading/loading";
import { ForbiddenPage } from "@presentation/components/templates/forbidden/forbidden.page";
import { RoleName } from "@domain/authentication/enums/role.enum";

const Login = lazy(
  () => import("@presentation/pages/unauthenticated/login/login")
);
const Dashboard = lazy(
  () => import("@presentation/pages/authenticated/dashboard/dashboard")
);
const ResetPassword = lazy(
  () =>
    import("@presentation/pages/unauthenticated/reset-password/reset-password")
);
const UpdatePassword = lazy(
  () =>
    import(
      "@presentation/pages/unauthenticated/update-password/update-password"
    )
);

export const AppRoute = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute allowedRoles={[RoleName.SUPER_ADMIN]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
};
